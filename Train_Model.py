from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from joblib import dump
import pandas as pd

# Sample dataset
data = pd.DataFrame({
    "Text": ["I hate you", "Have a nice day", "You're worthless", "Enjoy your time"],
    "Label": ["Harmful", "Safe", "Harmful", "Safe"]
})

# Prepare data
texts = data["Text"]
labels = data["Label"].map({"Harmful": 1, "Safe": 0})

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(texts)

# Train Model
model = MultinomialNB()
model.fit(X, labels)

# Save Model and Vectorizer
dump(vectorizer, "tfidf_vectorizer.pkl")
dump(model, "harmful_content_model.pkl")
print("Model and vectorizer saved successfully!")
