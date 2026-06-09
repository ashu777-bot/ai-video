import io
import time
import re
import tempfile
import os
import requests
import json
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled
from dotenv import load_dotenv

from google import genai

load_dotenv()

def load_powershell_env(path: str = ".env") -> None:
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            match = re.match(r"\s*\$env:([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*$", line)
            if match and match.group(1) not in os.environ:
                os.environ[match.group(1)] = match.group(2).strip().strip("\"'")

load_powershell_env()
if os.getenv("GEMINI_API_KEY") and not os.getenv("GOOGLE_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.environ["GEMINI_API_KEY"]


# ─────────────────────────────────────────────
#  PYDANTIC SCHEMAS
# ─────────────────────────────────────────────

class QuizRequest(BaseModel):
    summary_text: str

class AnswerOption(BaseModel):
    text: str
    rationale: str
    isCorrect: bool

class QuizQuestion(BaseModel):
    questionNumber: int
    question: str
    answerOptions: List[AnswerOption]
    hint: str

class QuizResponse(BaseModel):
    questions: List[QuizQuestion]


# ─────────────────────────────────────────────
#  APP INITIALIZATION
# ─────────────────────────────────────────────

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    client = genai.Client()
    print("Gemini client initialized successfully.")
except Exception as e:
    print(f"API Client Init Error: {e}")


# ─────────────────────────────────────────────
#  FALLBACK MODEL HELPER  (with retry + delay)
#  Model order: cheapest/fastest first, then
#  progressively more capable fallbacks.
#  gemini-1.5-x is fully shut down — do not use.
# ─────────────────────────────────────────────

def generate_with_fallback(contents, config=None):
    models = [
        "gemini-2.5-flash-lite",   # fastest, cheapest, free-tier quota separate
        "gemini-2.5-flash",        # primary workhorse
        "gemini-2.0-flash-lite",   # lighter 2.0 variant
        "gemini-2.0-flash",        # original 2.0 fallback
    ]
    last_err = None
    for model in models:
        for attempt in range(2):  # retry once per model before moving on
            try:
                print(f"Trying model: {model} (attempt {attempt + 1})")
                kwargs = {"model": model, "contents": contents}
                if config:
                    kwargs["config"] = config
                return client.models.generate_content(**kwargs)
            except Exception as e:
                err_str = str(e)
                if any(code in err_str for code in ["503", "429", "UNAVAILABLE", "EXHAUSTED"]):
                    wait = 40 if "429" in err_str else 5
                    print(f"{model} rate limited / unavailable, waiting {wait}s before retry...")
                    time.sleep(wait)
                    last_err = e
                    continue
                raise  # non-rate-limit error → raise immediately
        print(f"{model} exhausted all attempts, moving to next model...")
    raise last_err


# ─────────────────────────────────────────────
#  PLATFORM DETECTION
# ─────────────────────────────────────────────

YOUTUBE_PATTERNS = [
    "youtube.com/watch",
    "youtu.be/",
    "youtube.com/shorts",
    "youtube.com/live",
    "youtube.com/embed",
]

YTDLP_PLATFORMS = [
    "instagram.com", "instagr.am",
    "tiktok.com", "vm.tiktok.com",
    "twitter.com", "x.com", "t.co",
    "facebook.com", "fb.watch", "fb.com",
    "reddit.com", "v.redd.it",
    "vimeo.com",
    "dailymotion.com",
    "twitch.tv",
    "streamable.com",
    "rumble.com",
    "odysee.com", "lbry.tv",
    "bilibili.com",
    "linkedin.com",
    "pinterest.com",
    "snapchat.com",
    "triller.co",
    "likee.video",
    "kwai.com",
    "dubsmash.com",
    "ok.ru",
    "vk.com",
]

DIRECT_VIDEO_EXTENSIONS = [".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v", ".flv", ".wmv", ".3gp"]

MIME_MAP = {
    ".mp4": "video/mp4", ".mov": "video/quicktime", ".avi": "video/x-msvideo",
    ".mkv": "video/x-matroska", ".webm": "video/webm", ".m4v": "video/mp4",
    ".flv": "video/x-flv", ".wmv": "video/x-ms-wmv", ".3gp": "video/3gpp",
}


def detect_link_type(url: str) -> str:
    url_lower = url.lower().split("?")[0]

    if any(p in url.lower() for p in YOUTUBE_PATTERNS):
        return "youtube"

    if any(url_lower.endswith(ext) or f"{ext}?" in url.lower() for ext in DIRECT_VIDEO_EXTENSIONS):
        return "direct_video"

    if any(p in url.lower() for p in YTDLP_PLATFORMS):
        return "ytdlp_platform"

    return "try_ytdlp"


# ─────────────────────────────────────────────
#  HELPER: Extract YouTube video ID
# ─────────────────────────────────────────────

def extract_video_id(url: str) -> str:
    patterns = [
        r"youtu\.be/([^?&/]+)",
        r"youtube\.com/watch\?.*v=([^&]+)",
        r"youtube\.com/embed/([^?/]+)",
        r"youtube\.com/shorts/([^?/]+)",
        r"youtube\.com/live/([^?/]+)",
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    raise ValueError(f"Could not extract YouTube video ID from URL: {url}")


# ─────────────────────────────────────────────
#  HELPER: Download with yt-dlp → bytes
# ─────────────────────────────────────────────

def download_with_ytdlp(url: str, max_bytes: int = 200 * 1024 * 1024) -> bytes:
    try:
        import yt_dlp
    except ImportError:
        raise Exception(
            "yt-dlp is not installed. Install it with: pip install yt-dlp"
        )

    with tempfile.TemporaryDirectory() as tmpdir:
        output_template = os.path.join(tmpdir, "video.%(ext)s")
        ydl_opts = {
            "format": (
                "best[ext=mp4][height<=720]/"
                "best[ext=mp4]/"
                "bestvideo[height<=720]+bestaudio/best"
            ),
            "outtmpl": output_template,
            "quiet": True,
            "no_warnings": True,
            "merge_output_format": "mp4",
            "ignoreerrors": False,
            "socket_timeout": 60,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        files = [f for f in os.listdir(tmpdir) if not f.endswith(".part")]
        if not files:
            raise Exception(
                "yt-dlp finished but no output file was found. "
                "The platform may require authentication or the content is private/geo-restricted."
            )

        video_path = os.path.join(tmpdir, files[0])
        file_size = os.path.getsize(video_path)
        if file_size > max_bytes:
            raise Exception(
                f"Downloaded video is too large ({file_size / (1024*1024):.0f} MB). "
                f"Maximum allowed size is {max_bytes // (1024*1024)} MB."
            )

        with open(video_path, "rb") as f:
            return f.read()


# ─────────────────────────────────────────────
#  HELPER: Upload bytes to Gemini Files API → summary
# ─────────────────────────────────────────────

def upload_to_gemini_and_summarize(video_bytes: bytes, mime_type: str = "video/mp4") -> str:
    print(f"Uploading {len(video_bytes) / (1024*1024):.2f} MB to Gemini Files API...")
    video_file = client.files.upload(
        file=io.BytesIO(video_bytes),
        config={"mime_type": mime_type}
    )
    print(f"Upload complete. Waiting for Gemini to process: {video_file.name}")

    while video_file.state.name == "PROCESSING":
        time.sleep(4)
        video_file = client.files.get(name=video_file.name)

    if video_file.state.name == "FAILED":
        raise Exception("Gemini failed to process the video file.")

    print("File ready. Generating summary...")
    response = generate_with_fallback(
        contents=[
            video_file,
            "Analyze and summarize this video. Provide a beautifully formatted Markdown summary including: "
            "**Overview** (2-3 sentences), **Key Topics** (bullet points), **Main Takeaways** (bullet points), "
            "and a **Conclusion** paragraph."
        ]
    )
    client.files.delete(name=video_file.name)
    return response.text


# ─────────────────────────────────────────────
#  ENDPOINT 1: Local file upload
# ─────────────────────────────────────────────

@app.post("/api/summarize")
async def summarize_video_file(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        summary = upload_to_gemini_and_summarize(file_bytes, mime_type=file.content_type or "video/mp4")
        return {"summary": summary}
    except Exception as e:
        print(f"Error in /api/summarize: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────
#  ENDPOINT 2: Universal link summarization
# ─────────────────────────────────────────────

@app.post("/api/summarize-link")
async def summarize_video_link(url: str = Form(...)):
    url = url.strip()
    link_type = detect_link_type(url)
    print(f"Link type detected: '{link_type}' for URL: {url}")

    # ── YouTube ────────────────────────────────────────────────────────────
    if link_type == "youtube":
        try:
            video_id = extract_video_id(url)
            print(f"YouTube video ID: {video_id}")

            try:
                transcript_obj = YouTubeTranscriptApi.list_transcripts(video_id)
                try:
                    transcript = transcript_obj.find_manually_created_transcript(
                        ["en", "en-US", "en-GB", "hi", "te"]
                    )
                except NoTranscriptFound:
                    transcript = transcript_obj.find_generated_transcript(
                        ["en", "en-US", "en-GB", "hi", "te"]
                    )
                transcript_list = transcript.fetch()
                full_text = " ".join([item["text"] for item in transcript_list])
                print(f"Transcript fetched: {len(full_text)} characters")

                response = generate_with_fallback(
                    contents=[
                        f"Analyze and summarize this YouTube video transcript:\n\n{full_text}",
                        "Provide a beautifully formatted Markdown summary including: "
                        "**Overview** (2-3 sentences), **Key Topics** (bullet points), "
                        "**Main Takeaways** (bullet points), and a **Conclusion** paragraph."
                    ]
                )
                return {"summary": response.text}

            except Exception as transcript_err:
                print(f"Transcript unavailable ({transcript_err}). Falling back to yt-dlp download...")
                video_bytes = download_with_ytdlp(url)
                summary = upload_to_gemini_and_summarize(video_bytes, mime_type="video/mp4")
                return {"summary": summary}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    # ── Direct video file URL ───────────────────────────────────────────────
    elif link_type == "direct_video":
        try:
            print(f"Downloading direct video from: {url}")
            headers = {"User-Agent": "Mozilla/5.0 (compatible; VideoSummarizer/1.0)"}
            response = requests.get(url, headers=headers, timeout=120, stream=True)
            response.raise_for_status()

            MAX_BYTES = 200 * 1024 * 1024
            chunks, total = [], 0
            for chunk in response.iter_content(chunk_size=8192):
                chunks.append(chunk)
                total += len(chunk)
                if total > MAX_BYTES:
                    raise Exception("Video file too large (>200 MB). Please upload it directly instead.")
            video_bytes = b"".join(chunks)

            url_lower = url.lower()
            mime_type = "video/mp4"
            for ext, mt in MIME_MAP.items():
                if ext in url_lower:
                    mime_type = mt
                    break

            summary = upload_to_gemini_and_summarize(video_bytes, mime_type=mime_type)
            return {"summary": summary}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    # ── Known social platform OR unknown URL → yt-dlp ──────────────────────
    else:
        try:
            print(f"Downloading via yt-dlp from: {url}")
            video_bytes = download_with_ytdlp(url)
            summary = upload_to_gemini_and_summarize(video_bytes, mime_type="video/mp4")
            return {"summary": summary}
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=(
                    f"Could not download video from this URL.\n\n"
                    f"Error: {str(e)}\n\n"
                    "Tips:\n"
                    "• Private / login-required content cannot be downloaded automatically.\n"
                    "• Some platforms require you to be logged in – download the video manually "
                    "and use the 'Upload Local File' tab instead.\n"
                    "• Make sure yt-dlp is up to date: pip install -U yt-dlp"
                )
            )


# ─────────────────────────────────────────────
#  ENDPOINT 3: Generate Quiz
# ─────────────────────────────────────────────

@app.post("/api/generate-quiz")
async def generate_quiz(request: QuizRequest):
    if not request.summary_text.strip():
        raise HTTPException(status_code=400, detail="Summary text is required to generate a quiz.")

    try:
        print("Generating structured quiz from summary text...")
        prompt = (
            f"Based on the following video summary text, generate a 5-question multiple-choice quiz "
            f"to test the user's understanding of the topic. Each question must have exactly 4 dynamic option "
            f"objects including a structural rationale text and a correct boolean selector.\n\n"
            f"Video Summary Content:\n{request.summary_text}"
        )

        response = generate_with_fallback(
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": QuizResponse,
            }
        )

        return json.loads(response.text)

    except Exception as e:
        print(f"Error in /api/generate-quiz: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
