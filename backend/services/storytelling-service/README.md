# Storytelling Service

FastAPI microservice that generates heritage-rich product stories using Google Cloud Vertex AI (Gemini). Falls back to a local deterministic generator when GCP is not configured.

## Run Locally

1. Install backend dependencies from the repo root:

```
cd ../../../
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r backend/requirements.txt
```

2. Start the service:

```
uvicorn backend.services.storytelling_service.main:app --reload --port 8009
```

3. Test:

```
curl -X POST http://localhost:8009/storytelling/generate \
  -H 'Content-Type: application/json' \
  -d '{
    "product": "Banarasi Silk Saree",
    "craft_type": "Silk Saree",
    "region": "Varanasi, India",
    "materials": ["Silk", "Gold Zari"],
    "technique": "Traditional Handloom",
    "tone": "heritage",
    "length": "medium",
    "language": "en"
  }'
```

If GCP is not set up locally, you will receive a sensible fallback story.

## Configure Google Cloud (Vertex AI)

- Set env vars for the service:

```
export GOOGLE_CLOUD_PROJECT=<your-project-id>
export VERTEXAI_LOCATION=us-central1
export VERTEXAI_MODEL=gemini-1.5-flash
# Optional if using a service account key locally:
export GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account.json
```

## Deploy (Cloud Run)

Use Cloud Run with a container or a simple build step. Ensure the service account bound to the Cloud Run service has Vertex AI access.

