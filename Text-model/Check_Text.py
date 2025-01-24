import sys
import json
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import re


# Function to clean and preprocess text
def clean_text(text):
    # Remove special characters and make it lowercase
    return re.sub(r'[^a-zA-Z\s]', '', text).lower()


# Load the trained model and metadata
def load_model(vectorizer_file="vectorizer.pkl", model_file="classifier.pkl", categories_file="categories.json"):
    vectorizer = joblib.load(vectorizer_file)
    classifier = joblib.load(model_file)

    with open(categories_file, "r", encoding="utf-8") as file:
        categories = json.load(file)

    return vectorizer, classifier, categories


# Predict categories for input text
def predict_categories(vectorizer, classifier, categories, text):
    clean_text_data = clean_text(text)
    X_tfidf = vectorizer.transform([clean_text_data])

    y_pred = classifier.predict(X_tfidf)[0]  # Returns an array directly
    matched_categories = [categories[i] for i, label in enumerate(y_pred) if label == 1]

    return matched_categories


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("[!] Usage: python use_category_model.py <input_text_file>")
        sys.exit(1)

    input_file = sys.argv[1]

    # Load the text from the input file
    try:
        with open(input_file, "r", encoding="utf-8") as file:
            input_text = file.read().strip()
    except FileNotFoundError:
        print(f"[!] Error: File '{input_file}' not found.")
        sys.exit(1)

    # Load model and metadata
    vectorizer_file = "vectorizer.pkl"
    model_file = "classifier.pkl"
    categories_file = "categories.json"
    vectorizer, classifier, categories = load_model(vectorizer_file, model_file, categories_file)

    # Predict and display results
    predicted_categories = predict_categories(vectorizer, classifier, categories, input_text)

    if predicted_categories:
        print(f"The text belongs to the following categories: {', '.join(predicted_categories)}")
    else:
        print("No categories detected.")
