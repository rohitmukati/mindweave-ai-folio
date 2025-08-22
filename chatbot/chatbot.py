# chatbot.py
"""
FastAPI + Gemini chatbot (NO RAG)
"""

import os
import textwrap
import traceback
from typing import Optional

from dotenv import load_dotenv
from fastapi import Body, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from google import genai
from google.genai import types

from prompts import prompt1 # noqa: F401 (import prompts module for system prompt)

prompt = prompt1

# -------------------------
# Load environment
# -------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError(
        "Please set GEMINI_API_KEY in environment variables or .env file (GEMINI_API_KEY)"
    )
    
client = genai.Client(api_key=GEMINI_API_KEY)

# Optional frontend origin from env (set this to your deployed frontend domain)
FRONTEND_URL = os.getenv("FRONTEND_URL", "").rstrip("/")  # no trailing slash

# --- Allowed origins ---
_allowed = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
if FRONTEND_URL:
    _allowed.append(FRONTEND_URL)

# --- Choose origins + credentials safely ---
if os.getenv("ALLOW_ALL_ORIGINS") == "1":
    origins = ["*"]
    allow_credentials = False     # VERY IMPORTANT when using "*"
else:
    origins = _allowed
    allow_credentials = True
    
# Create FastAPI app  ✅ (must exist before using add_middleware/mount)
app = FastAPI(title="MindWeave AI Portfolio Chatbot", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Optional static files (meta.json / favicon)
# -------------------------
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if os.path.isdir(STATIC_DIR):
    # mount at /static (safer than mounting at root)
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/meta.json")
def meta_json():
    """
    Return small metadata JSON for clients that request /meta.json.
    If ./static/meta.json exists it will be served; otherwise a simple JSON is returned.
    """
    fpath = os.path.join(STATIC_DIR, "meta.json")
    if os.path.exists(fpath):
        return FileResponse(fpath, media_type="application/json")
    return JSONResponse({"name": "MindWeave AI Portfolio", "version": "1.0"})


@app.get("/favicon.ico")
def favicon():
    fpath = os.path.join(STATIC_DIR, "favicon.ico")
    if os.path.exists(fpath):
        return FileResponse(fpath, media_type="image/x-icon")
    return JSONResponse({}, status_code=204)


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


# -------------------------
# Default system prompt (ONLY PROMPT USED)
# -------------------------
DEFAULT_SYSTEM_PROMPT = (
    prompt
    )  # keep only this default system prompt


# -------------------------
# Request model for Swagger + validation
# (NOTE: no `system` field — we always use DEFAULT_SYSTEM_PROMPT)
# -------------------------
class ChatRequest(BaseModel):
    query: str
    thinking_budget: Optional[int] = 0


# -------------------------
# Gemini helper
# -------------------------
def call_gemini(system_prompt: str, user_message: str, thinking_budget: int = 0):
    """
    Calls Gemini generate_content and returns a best-effort string answer.
    """
    prompt = textwrap.dedent(
        f"""
        System instructions:
        {system_prompt}

        User message:
        {user_message}
        """
    )

    cfg = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_budget=thinking_budget)
    )

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=cfg,
        )
    except Exception as e:
        raise RuntimeError(f"Gemini API call failed: {e}")

    try:
        return response.text
    except Exception:
        try:
            return response.candidates[0].content
        except Exception:
            return str(response)


# -------------------------
# API Endpoint: /chat
# -------------------------
@app.post(
    "/chat",
    summary="Chat",
    description="Send a user query; server always uses the default system prompt.",
)
async def chat(body: ChatRequest = Body(
    ...,
    example={
        "query": "Tell me about Rohit Mukati's AI projects.",
        "thinking_budget": 0
    }
)):
    query = (body.query or "").strip()
    if not query:
        return {"ok": False, "error": "Please provide 'query' in the request body."}

    # ALWAYS use the DEFAULT_SYSTEM_PROMPT (ignore any client-supplied system text)
    system_prompt = DEFAULT_SYSTEM_PROMPT
    thinking_budget = int(body.thinking_budget or 0)

    try:
        answer = call_gemini(system_prompt, query, thinking_budget=thinking_budget)
        return {"ok": True, "source": "gemini", "answer": answer}
    except Exception as e:
        tb = traceback.format_exc()
        return {"ok": False, "error": str(e), "traceback": tb}


@app.get("/")
def read_root():
    # Simple root: you can replace this with a redirect to /docs or an HTML test UI if you want.
    return {"message": "Welcome to MindWeave AI Portfolio 🚀"}


# -------------------------
# Run server (dev fallback)
# -------------------------
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))  # Render sets PORT in runtime
    uvicorn.run("chatbot:app", host="0.0.0.0", port=port, reload=False)
