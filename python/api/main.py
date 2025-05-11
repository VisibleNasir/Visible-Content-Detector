# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from api.inference import predict_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class TextRequest(BaseModel):
    text: str

@app.post("/predict-text")
def predict(request: TextRequest):
    result = predict_text(request.text)
    return {"result": f"{'Harmful' if result == 'harmful' else 'No harmful content found'}"}
