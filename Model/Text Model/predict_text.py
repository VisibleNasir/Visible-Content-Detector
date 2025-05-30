import pandas as pd
import numpy as np
import torch
import joblib
import re
import string
import nltk
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from catboost import CatBoostClassifier
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from scipy.special import softmax
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Ensure NLTK data is available
try:
    nltk.download('stopwords', quiet=True)
    nltk.download('punkt', quiet=True)
    nltk.download('punkt_tab', quiet=True)
    nltk.download('wordnet', quiet=True)
except Exception as e:
    print(f"Error downloading NLTK data: {e}")
    exit()

# Text preprocessing function
def clean_text(text):
    if not isinstance(text, str):
        return ""
    try:
        text = text.lower()
        text = re.sub(r"http\S+|www\S+|https\S+|@\w+|#\w+", "", text, flags=re.MULTILINE)
        text = re.sub(r'\d+', '', text)
        text = text.translate(str.maketrans('', '', string.punctuation))
        tokens = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word not in stop_words]
        return " ".join(tokens)
    except Exception as e:
        print(f"Error in clean_text: {e}")
        return ""

# Define paths to model files
MODEL_PATH = "harmful_text_roberta_model"
CATBOOST_MODEL_PATH = "harmful_text_catboost_model.cbm"
VECTORIZER_PATH = "tfidf_vectorizer.pkl"

# Load models and vectorizer
try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model directory '{MODEL_PATH}' does not exist.")
    if not os.path.exists(CATBOOST_MODEL_PATH):
        raise FileNotFoundError(f"CatBoost model '{CATBOOST_MODEL_PATH}' does not exist.")
    if not os.path.exists(VECTORIZER_PATH):
        raise FileNotFoundError(f"Vectorizer '{VECTORIZER_PATH}' does not exist.")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    roberta_model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
    catboost_model = CatBoostClassifier().load_model(CATBOOST_MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    print("Models and vectorizer loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    exit()

# Label names
label_names = ["no harmful", "harmful"]

# Prediction function
def predict_text(text):
    cleaned_text = clean_text(text)
    if not cleaned_text.strip():
        return {
            "result": "Error: Empty text after preprocessing.",
            "predicted_class": None,
            "confidence_scores": {},
            "error": "Empty text"
        }

    # RoBERTa prediction
    encodings = tokenizer(cleaned_text, truncation=True, padding=True, max_length=128, return_tensors="pt")
    with torch.no_grad():
        outputs = roberta_model(**encodings)
    roberta_probs = softmax(outputs.logits.cpu().numpy(), axis=1)

    # CatBoost prediction
    text_vec = vectorizer.transform([cleaned_text])
    catboost_probs = catboost_model.predict_proba(text_vec)

    # Ensemble weights
    roberta_weight = 0.6
    catboost_weight = 0.4
    ensemble_probs = roberta_weight * roberta_probs + catboost_weight * catboost_probs
    predicted_label = np.argmax(ensemble_probs, axis=1)[0]
    confidence = ensemble_probs[0][predicted_label]
    confidence_scores = {label_names[i]: float(ensemble_probs[0][i]) for i in range(len(label_names))}

    return {
        "result": f"{label_names[predicted_label].capitalize()} content detected (Confidence: {confidence:.2%})",
        "predicted_class": label_names[predicted_label],
        "confidence_scores": confidence_scores,
        "error": None
    }

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({
            "result": "Error: No text provided",
            "predicted_class": None,
            "confidence_scores": {},
            "error": "No text provided"
        }), 400
    result = predict_text(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)