from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import re
import string
from nltk.corpus import stopwords
import nltk

nltk.download('stopwords')

# Load model and vectorizer
model = joblib.load("text_classifier_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

app = FastAPI()

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this to your frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Text input schema
class TextInput(BaseModel):
    text: str

# Text cleaning
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = " ".join([word for word in text.split() if word not in stopwords.words('english')])
    return text

# Endpoint
@app.post("/classify-text")
def classify(input: TextInput):
    cleaned = clean_text(input.text)
    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]
    return {"result": prediction}
