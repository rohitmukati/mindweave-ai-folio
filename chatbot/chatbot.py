# chatbot.py
"""
Simple FastAPI + Gemini chatbot (NO RAG).
- Uses google-genai client to call Gemini LLM (generate_content).
- Uses a system prompt (default in code). You can override per-request by sending {"system": "..."}.
- Minimal dependencies: google-genai, fastapi, python-dotenv, uvicorn
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import textwrap
import traceback

# -------------------------
# Load environment
# -------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Please set GEMINI_API_KEY in environment variables or .env file (GEMINI_API_KEY)")

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# -------------------------
# FastAPI + CORS
# -------------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Dev only; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Default system prompt (edit as you like)
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

End of instructions. Always prioritize accuracy, brevity, and clear next steps."""

)

# -------------------------
# Helper to call Gemini
# -------------------------
def call_gemini(system_prompt: str, user_message: str, thinking_budget: int = 0):
    """
    Call Gemini generate_content with given system prompt and user message.
    Returns string answer (best-effort fallback).
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
            config=cfg
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
# Accepts JSON: { "query": "...", "system": "...", "thinking_budget": 0 }
# -------------------------
@app.post("/chat")
async def chat(request: Request):
    try:
        body = await request.json()
    except Exception:
        return {"ok": False, "error": "Invalid JSON body."}

    query = (body.get("query") or "").strip()
    if not query:
        return {"ok": False, "error": "Please provide 'query' in the request body."}

    system_prompt = body.get("system") or DEFAULT_SYSTEM_PROMPT
    thinking_budget = int(body.get("thinking_budget", 0))

    try:
        answer = call_gemini(system_prompt, query, thinking_budget=thinking_budget)
        return {"ok": True, "source": "gemini", "answer": answer}
    except Exception as e:
        tb = traceback.format_exc()
        return {"ok": False, "error": str(e), "traceback": tb}

# -------------------------
# Run server (dev)
# -------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("chatbot:app", host="0.0.0.0", port=8000, reload=True)
