from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import os


class StoryRequest(BaseModel):
    product: str = Field(..., description="Name/title of the craft product")
    craft_type: Optional[str] = Field(None, description="Type/category of craft, e.g., 'Banarasi Saree'")
    region: Optional[str] = Field(None, description="Region or origin, e.g., 'Varanasi, India'")
    materials: Optional[List[str]] = Field(None, description="List of materials used")
    technique: Optional[str] = Field(None, description="Crafting technique")
    language: Optional[str] = Field("en", description="ISO language code for story output")
    tone: Optional[str] = Field(
        "heritage",
        description="Desired tone, e.g., 'heritage', 'luxury', 'minimal', 'playful'",
    )
    length: Optional[str] = Field(
        "medium", description="'short' | 'medium' | 'long' for story length"
    )


class StoryResponse(BaseModel):
    story: str
    product: str
    heritage: Optional[str] = None
    technique: Optional[str] = None
    tags: List[str] = []
    model: str = "fallback"


app = FastAPI(title="Storytelling Service", version="0.1.0")

# CORS for local dev and simple deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _make_prompt(req: StoryRequest) -> str:
    bullets = []
    if req.craft_type:
        bullets.append(f"Craft Type: {req.craft_type}")
    if req.region:
        bullets.append(f"Region/Origin: {req.region}")
    if req.materials:
        bullets.append(f"Materials: {', '.join(req.materials)}")
    if req.technique:
        bullets.append(f"Technique: {req.technique}")

    length_hint = {
        "short": "~80-120 words",
        "medium": "~150-220 words",
        "long": "~300-400 words",
    }.get((req.length or "medium").lower(), "~150-220 words")

    return (
        "You are an expert cultural copywriter for handcrafted products.\n"
        f"Write a compelling heritage story for: {req.product}.\n"
        f"Audience: global buyers; Purpose: product listing and social captions.\n"
        f"Tone: {req.tone}. Length: {length_hint}. Language: {req.language}.\n"
        "Constraints: culturally respectful, factually plausible, avoid stereotypes, no overpromising.\n"
        "Structure: 1-2 short evocative paragraphs, end with a subtle emotional note.\n"
        + ("\nDetails:\n- " + "\n- ".join(bullets) if bullets else "")
    )


def _try_vertex_gemini(prompt: str) -> Optional[str]:
    """Attempt to call Vertex AI Gemini via google-cloud-aiplatform.
    Returns generated text on success, otherwise None.
    """
    project = os.getenv("GOOGLE_CLOUD_PROJECT")
    location = os.getenv("VERTEXAI_LOCATION", "us-central1")
    model_name = os.getenv("VERTEXAI_MODEL", "gemini-1.5-flash")

    if not project:
        return None

    try:
        # Import inside to avoid hard dependency at import time
        import vertexai  # type: ignore
        from vertexai.generative_models import GenerativeModel  # type: ignore

        vertexai.init(project=project, location=location)
        model = GenerativeModel(model_name)
        resp = model.generate_content(prompt)
        # Response may have .text or candidates
        text = getattr(resp, "text", None)
        if not text and hasattr(resp, "candidates") and resp.candidates:
            # Fallback extraction
            parts = getattr(resp.candidates[0], "content", None)
            if parts and getattr(parts, "parts", None):
                text = "".join(getattr(p, "text", "") for p in parts.parts)
        return text or None
    except Exception:
        return None


def _fallback_story(req: StoryRequest) -> str:
    base = (
        f"This {req.craft_type or 'handcrafted piece'} from {req.region or 'a storied artisan community'} "
        f"is shaped with {', '.join(req.materials or ['carefully sourced materials'])} using "
        f"{req.technique or 'time-honored techniques'}. "
        f"Every detail in {req.product} reflects generations of learned skill and quiet dedication—"
        "a living connection between maker and wearer, tradition and today."
    )
    return base


@app.post("/storytelling/generate", response_model=StoryResponse)
def generate_story(req: StoryRequest):
    prompt = _make_prompt(req)
    text = _try_vertex_gemini(prompt)

    if text:
        return StoryResponse(
            story=text.strip(),
            product=req.product,
            heritage=req.region,
            technique=req.technique,
            tags=[t for t in [req.craft_type, req.region, req.technique] if t],
            model=os.getenv("VERTEXAI_MODEL", "gemini-1.5-flash"),
        )

    # Fallback for local dev without GCP setup
    return StoryResponse(
        story=_fallback_story(req),
        product=req.product,
        heritage=req.region,
        technique=req.technique,
        tags=[t for t in [req.craft_type, req.region, req.technique] if t],
        model="fallback",
    )


@app.get("/health")
def health():
    return {"status": "ok"}

