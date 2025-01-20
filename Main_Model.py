import re
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Preprocessing Function
def preprocess_text(text):
    text = re.sub(r"http\S+", "", text)  # Remove URLs
    text = re.sub(r"@\w+", "", text)    # Remove mentions
    text = re.sub(r"[^a-zA-Z\s]", "", text)  # Remove non-alphabetic characters
    text = text.lower().strip()        # Convert to lowercase and strip whitespace
    return text

# Load Pre-trained Model and Vectorizer
vectorizer = joblib.load("tfidf_vectorizer.pkl")  # Load your saved TF-IDF vectorizer
model = joblib.load("harmful_content_model.pkl")  # Load your trained model

# Function to Detect Harmful Text
def detect_harmful_text(text):
    processed_text = preprocess_text(text)
    text_vector = vectorizer.transform([processed_text])
    prediction = model.predict(text_vector)[0]
    confidence = model.predict_proba(text_vector)[0].max()
    return {"label": "harmful" if prediction == 1 else "safe", "confidence": confidence}

# Example Usage
if __name__ == "__main__":
    text = "Have a nice day"
    result = detect_harmful_text(text)
    print(f"Text Detection Result: {result}")
