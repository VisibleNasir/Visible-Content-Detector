import pandas as pd
import numpy as np
import re
import string
import nltk
import torch
import joblib
from transformers import (
    RobertaTokenizer,
    RobertaForSequenceClassification,
    Trainer,
    TrainingArguments,
    AutoTokenizer,
    AutoModelForSequenceClassification,
)
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
    precision_recall_curve,
    f1_score,
)
from sklearn.feature_extraction.text import TfidfVectorizer
from catboost import CatBoostClassifier
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nlpaug.augmenter.word import SynonymAug
from imblearn.over_sampling import SMOTE
from scipy.special import softmax
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Download required NLTK data
try:
    nltk.download('stopwords', quiet=True)
    nltk.download('punkt', quiet=True)
    nltk.download('punkt_tab', quiet=True)  # Explicitly download punkt_tab
    nltk.download('wordnet', quiet=True)
except Exception as e:
    print(f"Error downloading NLTK data: {e}")
    exit()

# Set random seed for reproducibility
np.random.seed(42)
torch.manual_seed(42)

# Load dataset
DATASET_PATH = "F:/Desktop/College 1/club/OnlineHarmfullContentDetection/Model/Text Model/harmful_text_dataset1.csv"
try:
    df = pd.read_csv(DATASET_PATH)
except FileNotFoundError:
    print(f"Error: '{DATASET_PATH}' not found. Please provide the correct dataset path.")
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

# Apply text cleaning
try:
    df["clean_text"] = df["text"].apply(clean_text)
    df = df[df["clean_text"].str.strip() != ""]
except Exception as e:
    print(f"Error during text preprocessing: {e}")
    exit()

# Data augmentation for minority classes
aug = SynonymAug(aug_p=0.3)
def augment_text(text, label, augment_ratio=1):
    augmented_texts = [text]
    augmented_labels = [label]
    for _ in range(augment_ratio):
        try:
            aug_text = aug.augment(text)[0]
            augmented_texts.append(aug_text)
            augmented_labels.append(label)
        except Exception as e:
            print(f"Error in augmentation: {e}")
    return augmented_texts, augmented_labels

# Apply augmentation
augmented_texts, augmented_labels = [], []
for label in df["label"].unique():
    class_data = df[df["label"] == label]
    augment_ratio = 2 if len(class_data) < len(df) / len(df["label"].unique()) else 0
    for _, row in class_data.iterrows():
        texts, labels = augment_text(row["clean_text"], row["label"], augment_ratio)
        augmented_texts.extend(texts)
        augmented_labels.extend(labels)

# Create augmented DataFrame
aug_df = pd.DataFrame({"clean_text": augmented_texts, "label": augmented_labels})
df = pd.concat([df, aug_df], ignore_index=True)

# Features and labels
X = df["clean_text"]
y = df["label"].astype('category').cat.codes
label_names = df["label"].astype('category').cat.categories

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# --- TF-IDF + CatBoost ---
vectorizer = TfidfVectorizer(max_features=15000, ngram_range=(1, 3), min_df=2)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Handle imbalanced data with SMOTE
smote = SMOTE(random_state=42, k_neighbors=3)
X_train_vec_smote, y_train_smote = smote.fit_resample(X_train_vec, y_train)

# Train CatBoost
catboost_model = CatBoostClassifier(
    iterations=1000,
    learning_rate=0.05,
    depth=8,
    eval_metric='MultiClass',
    random_seed=42,
    verbose=100,
    early_stopping_rounds=100,
)
catboost_model.fit(X_train_vec_smote, y_train_smote, eval_set=(X_test_vec, y_test))

# --- RoBERTa Model ---
model_name = "roberta-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
roberta_model = AutoModelForSequenceClassification.from_pretrained(
    model_name, num_labels=len(label_names)
)

# Tokenize data
def tokenize_data(texts, labels, max_length=128):
    encodings = tokenizer(
        texts.tolist(),
        truncation=True,
        padding=True,
        max_length=max_length,
        return_tensors="pt",
    )
    return {
        "input_ids": encodings["input_ids"],
        "attention_mask": encodings["attention_mask"],
        "labels": torch.tensor(labels.tolist()),
    }

train_dataset = tokenize_data(X_train, y_train)
test_dataset = tokenize_data(X_test, y_test)

# Convert to torch dataset
class TextDataset(torch.utils.data.Dataset):
    def __init__(self, encodings):
        self.encodings = encodings

    def __getitem__(self, idx):
        item = {key: val[idx] for key, val in self.encodings.items()}
        return item

    def __len__(self):
        return len(self.encodings["labels"])

train_dataset = TextDataset(train_dataset)
test_dataset = TextDataset(test_dataset)

# Training arguments
training_args = TrainingArguments(
    output_dir="./roberta_results",
    num_train_epochs=4,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./roberta_logs",
    logging_steps=50,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    fp16=torch.cuda.is_available(),
    gradient_accumulation_steps=2,
)

# Trainer
trainer = Trainer(
    model=roberta_model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    compute_metrics=lambda p: {
        "f1": f1_score(
            p.label_ids, np.argmax(p.predictions, axis=1), average="weighted"
        )
    },
)

# Train RoBERTa model
trainer.train()

# --- Ensemble Predictions ---
roberta_predictions = trainer.predict(test_dataset)
roberta_probs = softmax(roberta_predictions.predictions, axis=1)
catboost_probs = catboost_model.predict_proba(X_test_vec)

roberta_f1 = f1_score(y_test, np.argmax(roberta_probs, axis=1), average="weighted")
catboost_f1 = f1_score(y_test, np.argmax(catboost_probs, axis=1), average="weighted")
roberta_weight = roberta_f1 / (roberta_f1 + catboost_f1)
catboost_weight = catboost_f1 / (roberta_f1 + catboost_f1)

ensemble_probs = roberta_weight * roberta_probs + catboost_weight * catboost_probs
y_pred = np.argmax(ensemble_probs, axis=1)

# --- Evaluation ---
print("\nEnsemble Model Classification Report:")
print(classification_report(y_test, y_pred, target_names=label_names))

if len(label_names) == 2:
    ensemble_pred_proba = ensemble_probs[:, 1]
    roc_auc = roc_auc_score(y_test, ensemble_pred_proba)
    print(f"Ensemble ROC-AUC Score: {roc_auc:.4f}")
else:
    roc_auc = roc_auc_score(y_test, ensemble_probs, multi_class="ovr")
    print(f"Ensemble Multiclass ROC-AUC Score: {roc_auc:.4f}")

# Save models
MODEL_PATH = "harmful_text_roberta_model"
try:
    os.makedirs(MODEL_PATH, exist_ok=True)
    roberta_model.save_pretrained(MODEL_PATH)
    tokenizer.save_pretrained(MODEL_PATH)
    catboost_model.save_model("harmful_text_catboost_model.cbm")
    joblib.dump(vectorizer, "tfidf_vectorizer.pkl")
    print(f"Models saved successfully to {MODEL_PATH}, harmful_text_catboost_model.cbm, and tfidf_vectorizer.pkl")
except Exception as e:
    print(f"Error saving models: {e}")
    exit()

print("Ensemble Model Trained and Saved Successfully!")