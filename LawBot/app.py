from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
import uvicorn
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader

load_dotenv()

app = FastAPI(title="LawBot API", version="1.0")

# ✅ Allow access from frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Environment & model setup
LLM_URL = os.getenv("LLM_URL")


# ✅ Create upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def root():
    return {"message": "LawBot API running successfully"}


@app.post("/chat")
async def chat(request: Request):
    """Handles chat prompts and returns Ai-generated replies."""
    try:
        data = await request.json()
        prompt = data.get("prompt", "").strip()
        if not prompt:
            return {"error": "Prompt is required."}
        print(f"Received prompt: {prompt}")
        # Define system role
        system_instructions = """
        You are **LegalBot** — an AI-powered legal assistant specialized **only in Indian Law and the Indian Constitution**.

        🇮🇳 **Core Identity:**
        - You are fully based on Indian legal principles, acts, and the Indian Constitution.
        - All your explanations, examples, and interpretations must relate **only to Indian law**.
        - Do not refer to or compare with foreign laws, courts, or legal systems (like US or UK laws).

        **Primary Role:**
        - Provide accurate, concise, and reliable information related to:
        - The Indian Constitution  
        - Fundamental Rights and Duties  
        - Indian Penal Code (IPC)  
        - Code of Criminal Procedure (CrPC)  
        - Civil and Criminal Laws  
        - Court Structure and Legal Procedures in India  
        - Legal rights of citizens  
        - Whenever relevant, refer to constitutional articles, Indian acts, or official legal terms.

        **Rules:**
        - Only answer questions that are related to *Indian law*, *the Constitution*, or *legal rights in India*.
        - If the user asks about anything unrelated (science, coding, foreign law, personal issues, politics, etc.), strictly reply:
        → "Sorry, I can only assist with Indian legal and constitutional queries."
        - Never generate personal opinions, predictions, or emotional responses.
        - Never make up laws or legal interpretations.
        - If unsure, say:
        → "I'm not completely certain about that. Please consult a qualified Indian lawyer or refer to the official legal text."

        **Personality:**
        - Speak like a calm, professional, and neutral legal researcher.
        - Maintain a respectful, clear, and formal tone — no slang or unnecessary emotion.
        - Use simple and understandable language, while keeping it legally sound and credible.
        - Provide structured, point-wise answers where suitable.
        """

        payload = {
            "contents": [
                {"role": "user", "parts": [{"text": system_instructions}]},
                {"role": "user", "parts": [{"text": prompt}]},
            ]
        }

        print(f"Sending payload to LLM: {payload}")

        response = requests.post(LLM_URL, json=payload)
        print(f"LLM response status: {response.status_code}")
        print(f"LLM response content: {response.text}")


        if response.status_code != 200:
            return

        result = response.json()
        reply = (
            result.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )

        return {"reply": reply}

    except Exception as e:
        return {"error": f"Internal server error: {str(e)}"}


@app.post("/upload")
async def upload_and_summarize(file: UploadFile = File(...)):
    """Uploads a PDF, extracts text, and summarizes it using Gemini."""
    try:
        # ✅ Step 1: Save uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        print(f"File uploaded successfully: {file.filename}")

        # ✅ Step 2: Extract PDF text
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        full_text = " ".join([page.page_content for page in pages])

        # Optional: Trim to avoid token limit
        if len(full_text) > 12000:
            full_text = full_text[:12000] + "..."

        # ✅ Step 3: Summarize
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": f"Summarize this legal PDF content clearly and concisely:\n\n{full_text}"
                        }
                    ],
                }
            ]
        }

        response = requests.post(LLM_URL, json=payload)

        if response.status_code != 200:
            return {"error": "summarization failed", "details": response.json()}

        result = response.json()
        summary = (
            result.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )

        # ✅ Step 4: Return the summary
        return {
            "message": f"File uploaded and summarized successfully: {file.filename}",
            "summary": summary,
        }

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)
