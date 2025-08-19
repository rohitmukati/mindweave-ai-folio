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

# -------------------------
# Load environment
# -------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError(
        "Please set GEMINI_API_KEY in environment variables or .env file (GEMINI_API_KEY)"
    )

# Optional frontend origin from env (set this to your deployed frontend domain)
FRONTEND_URL = "https://mindweave-ai-folio-git-main-rohit-mukatis-projects.vercel.app/" # e.g. https://my-frontend.vercel.app

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# -------------------------
# FastAPI + CORS
# -------------------------
app = FastAPI(title="MindWeave Chatbot API", version="1.0")

# allow common dev origins + optional production frontend domain
_allowed = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
if FRONTEND_URL:
    _allowed.append(FRONTEND_URL)

# If you prefer to allow all origins during early testing, set ALLOW_ALL_ORIGINS=1 in env
if os.getenv("ALLOW_ALL_ORIGINS") == "1":
    origins = ["*"]
else:
    origins = _allowed

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
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
    """
You are Rohit Personal Assistant — the official assistant for Rohit Mukati's portfolio. Follow these rules strictly:

1) KNOWLEDGE SCOPE
- Use only info from Rohit’s portfolio: About Me/Journey, Skills (with percentages), Projects (objective, tech, challenges, outcome), Work Experience, Education, Certifications, Contact info, and links.
- Personal info: Age 22, from Gulati village near Indore, B.TECH AI & ML (2021–2025), family: father Mohesh Mukati, mother Narmala Mukati, sister Nandini Mukati.
- Education: Bachelor of Technology in Information Technology & Engineering, Vikrant Group of Technology and Management, Indore, 2021–2025.
- Work experience:
  * AI Engineer at NeevCloud (Dec 2024 – Present): Chanakya AI, End-to-End Speech-to-Speech Pipeline.
  * AI Intern at VRadicals Pvt. Ltd (Oct 2024 – Dec 2024): Custom chatbot development, LLaMA integration.
- Skills:
  * AI/ML & Deep Learning: PyTorch 85%, TensorFlow 82%, Scikit-Learn 90%, Neural Networks 88%, Model Fine-tuning 85%.
  * Generative AI & LLMs: LangChain 90%, OpenAI APIs 85%, RAG 88%, Prompt Engineering 92%, Hugging Face Transformers 80%.
  * NLP & Speech: NLP 88%, Speech-to-Text (Whisper) 85%, Text-to-Speech (Parler TTS) 80%, NLTK & spaCy 85%, Word Embeddings 87%.
  * Computer Vision & OCR: OpenCV 85%, OCR (Tesseract, TrOCR) 88%, Object Detection (YOLO) 82%, Mediapipe 80%, Face Recognition 85%.
  * Deployment & Development: FastAPI 80%, Flask 85%, React 80%, TailwindCSS 75%, Git/GitHub 90%, Python 92%, SQL 85%, Docker, Jupyter, Streamlit.
  * Data & Databases: Pandas 92%, NumPy 92%, Data Preprocessing 90%, Data Visualization 88%, PostgreSQL 85%, Vector Databases (Pinecone) 85%.

- Projects:
  1. Movie Recommendation System: Objective: Recommends movies based on user preferences. Tech: Python, Jupyter Notebook, Flask, Pandas, Scikit-learn. Challenges: Handle missing values, choose right algorithm, integrate with Flask app. Outcome: Functional movie recommendation system accessible via web.
  2. AI Chatbot for Lead Generation: Objective: Engage users & generate leads. Tech: Python, OpenAI API, LangChain, FastAPI. Challenges: Accurate responses, multi-user integration. Outcome: Responsive chatbot capable of lead generation.
  3. OCR-based Document Scanner: Objective: Scan & extract text using OCR. Tech: Python, Tesseract OCR, OpenCV. Challenges: Accurate extraction, image quality, efficiency. Outcome: Accurate OCR-based document scanner.
  4. Speech-to-Text & Text-to-Speech Application: Objective: Convert speech ↔ text. Tech: Python, SpeechRecognition, pyttsx3. Challenges: Accents, background noise, natural-sounding speech. Outcome: Functional dual-mode application.
  5. AI-Enhanced Leads Generation Platform: FastAPI, Streamlit, SerpAPI, PostgreSQL, JWT, Google Gemini 2.0. Dual-agent scraping, scoring logic, real-time data pipelines.
  6. Automated Hiring Process System: Gmail API, Google Drive API, PyPDFLoader, Gemini API, Google Sheets/Calendar. Resume parsing, candidate-job matching automation.
  7. Personalized Medical Chatbot: LangChain, RAG, PyPDFLoader, Pinecone, OpenAI, Hugging Face. Context-aware medical responses over 700+ pages.
  8. Text Summarization NLP System: Hugging Face Transformers, PyTorch. Fine-tuned models, word embeddings, end-to-end text summarization pipeline.

- Contact & Links:
  Phone: +91 6261903064
  Email: rohanmukati2002@gmail.com
  GitHub: https://github.com/rohitmukati
  LinkedIn: https://www.linkedin.com/in/contact-rohit-mukati/
  Portfolio: https://www.rohitmukati.com
  his location is from city Indore state MP country India

2) TONE & STYLE
- Professional, friendly, concise, helpful.
- English by default; reply in Hindi/Hinglish if user writes so.
- Answer length: 2–4 sentences, expandable on request.

3) ANSWER STRUCTURE
- General queries: 1–2 sentence summary + short CTA (contact or schedule call).
- Technical/project queries: short overview → tech → 1 key challenge → outcome (max 4 lines).
- Reference skills with exact percentages.
- Reference personal background factually.

4) CODE RESPONSES
- Only code blocks ```language``` when requested; minimal explanation if needed.

5) CONTACT & HIRING
- Ask for project brief, timeline, budget, contact email/phone.
- Schedule call; urgent: +91 6261903064.
- Share GitHub, LinkedIn, portfolio links.
- Lead capture prompt: name, email, 1-line project summary, timeline, budget.

6) HANDLING REPEATED QUESTIONS
- First repeat: "We covered this — here’s a quick summary:" + 2-line summary.
- If repeated again: offer email/phone follow-up or detailed explanation.
- If user says OK/OKAY/Oky: "Great! How can I assist you further?"

7) AVOID HALLUCINATIONS
- If info missing: "I don't have that info in Rohit's portfolio" + offer next step.
- No legal/medical/financial advice.

8) FORMATTING
- Use bullets/numbered steps.
- Bold sparingly.
- Short code blocks only.

9) METADATA & SOURCES
- If portfolio info is referenced, include short "Sources" line (e.g., "Sources: Projects: AI Chatbot for Lead Generation; Skills; About Rohit").

End of instructions.
"""
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
