import pandas as pd
import numpy as np
import re
import string
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import nltk
from imblearn.over_sampling import SMOTE  # For handling imbalanced data

# Download required NLTK data
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

# Load dataset
try:
    df = pd.read_csv("harmful_text_dataset.csv")
except FileNotFoundError:
    print("Error: 'harmful_text_dataset.csv' not found. Please provide the correct dataset path.")
    exit()

# Text preprocessing function
def clean_text(text):
    if not isinstance(text, str):
        return ""
    # Convert to lowercase
    text = text.lower()
    # Remove URLs
    text = re.sub(r"http\S+|www\S+|https\S+", "", text, flags=re.MULTILINE)
    # Remove special characters and digits
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Tokenize
    tokens = word_tokenize(text)
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    # Join tokens back to string
    return " ".join(tokens)

# Apply text cleaning
df["clean_text"] = df["text"].apply(clean_text)

# Remove empty strings after cleaning
df = df[df["clean_text"].str.strip() != ""]

# Features and labels
X = df["clean_text"]
y = df["label"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Vectorization
vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 3), min_df=2)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Handle imbalanced data with SMOTE
smote = SMOTE(random_state=42)
X_train_vec, y_train = smote.fit_resample(X_train_vec, y_train)

# Model training
model = LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42)
model.fit(X_train_vec, y_train)

# Cross-validation
cv_scores = cross_val_score(model, X_train_vec, y_train, cv=5, scoring='f1_weighted')
print(f"Cross-Validation F1 Scores: {cv_scores}")
print(f"Average CV F1 Score: {cv_scores.mean():.4f} (±{cv_scores.std():.4f})")

# Evaluation
y_pred = model.predict(X_test_vec)
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# ROC-AUC Score (for binary classification)
if len(np.unique(y)) == 2:
    y_pred_proba = model.predict_proba(X_test_vec)[:, 1]
    roc_auc = roc_auc_score(y_test, y_pred_proba)
    print(f"ROC-AUC Score: {roc_auc:.4f}")

# Confusion matrix
conf_matrix = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(10, 8))
labels = sorted(np.unique(y))
sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Oranges", xticklabels=labels, yticklabels=labels)
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.tight_layout()
plt.savefig("confusion_matrix.png")
plt.close()

# Classification report heatmap
report = classification_report(y_test, y_pred, output_dict=True)
report_df = pd.DataFrame(report).transpose()
plt.figure(figsize=(10, 6))
sns.heatmap(report_df.iloc[:-3, :-1], annot=True, cmap="Blues")
plt.title("Classification Report Heatmap")
plt.tight_layout()
plt.savefig("classification_report_heatmap.png")
plt.close()

# Save model and vectorizer
joblib.dump(model, "harmful_text_classifier.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Model Trained and Saved Successfully!")