import joblib
import re
import string
from nltk.corpus import stopwords
import nltk
nltk.download('stopwords')

# Load model and vectorizer
model = joblib.load("text_classifier_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Preprocessing function (same as training)
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)  # remove URLs
    text = text.translate(str.maketrans('', '', string.punctuation))  # remove punctuation
    text = " ".join([word for word in text.split() if word not in stopwords.words('english')])
    return text

# Classify function
def classify_text(text):
    cleaned = clean_text(text)
    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]
    return prediction

# CLI Loop
if __name__ == "__main__":
    print(" Harmful Content Detector | Text ")
    while True:
        text = input("\n Enter text to classify : ")
        if text.lower() == "exit":
            break
        result = classify_text(text)
        print(f"Predicted Category: {result}")
