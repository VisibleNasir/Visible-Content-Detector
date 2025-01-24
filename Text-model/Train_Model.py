import sys
import csv
import re
from collections import defaultdict
import json
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import LinearSVC
import numpy as np


# Function to load categories and keywords from CSV file
def load_categories(filepath):
    categories = defaultdict(list)
    try:
        with open(filepath, "r", encoding="utf-8") as file:
            reader = csv.reader(file)
            for row in reader:
                if len(row) >= 2:  # Ensure there are at least two columns (Category, Keyword)
                    category, keyword = row[0].strip(), row[1].strip().lower()
                    categories[category].append(keyword)
        return categories
    except FileNotFoundError:
        print(f"[!] Error: File '{filepath}' not found.")
        sys.exit(1)


# Function to prepare dataset for training
def prepare_training_data(categories):
    X = []
    y = []
    all_categories = list(categories.keys())

    for category, keywords in categories.items():
        for keyword in keywords:
            X.append(keyword)
            label_vector = [1 if category == cat else 0 for cat in all_categories]
            y.append(label_vector)

    return X, np.array(y), all_categories


# Train the model
def train_model(X, y):
    vectorizer = TfidfVectorizer()
    X_tfidf = vectorizer.fit_transform(X)

    # Using LinearSVC for multi-label classification
    classifier = OneVsRestClassifier(LinearSVC())
    classifier.fit(X_tfidf, y)

    return vectorizer, classifier


# Save the trained model and metadata
def save_model(vectorizer, classifier, categories, vectorizer_file="vectorizer.pkl", model_file="classifier.pkl", categories_file="categories.json"):
    joblib.dump(vectorizer, vectorizer_file)
    joblib.dump(classifier, model_file)

    with open(categories_file, "w", encoding="utf-8") as file:
        json.dump(categories, file)

    print("Model, vectorizer, and categories saved successfully.")


# Main function
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("[!] Usage: python train_category_model.py <category_csv_file>")
        sys.exit(1)

    category_file = sys.argv[1]

    # Load categories and keywords
    categories = load_categories(category_file)

    # Prepare training data
    X, y, all_categories = prepare_training_data(categories)

    # Train the model
    vectorizer, classifier = train_model(X, y)

    # Save the model
    save_model(vectorizer, classifier, all_categories)
