import pandas as pd
import numpy as np
import torch
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv("text_dataset.csv")

# Features and labels
X = df["text"]
y = df["label"].astype('category').cat.codes  # Convert labels to numeric
label_names = df["label"].astype('category').cat.categories

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Load BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=len(label_names))

# Tokenize data
def tokenize_data(texts, labels):
    encodings = tokenizer(texts.tolist(), truncation=True, padding=True, max_length=128)
    return {'input_ids': encodings['input_ids'], 'attention_mask': encodings['attention_mask'], 'labels': labels.tolist()}

train_dataset = tokenize_data(X_train, y_train)
test_dataset = tokenize_data(X_test, y_test)

# Convert to torch dataset
class TextDataset(torch.utils.data.Dataset):
    def __init__(self, encodings):
        self.encodings = encodings

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        return item

    def __len__(self):
        return len(self.encodings['labels'])

train_dataset = TextDataset(train_dataset)
test_dataset = TextDataset(test_dataset)

# Training arguments
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
)

# Train model
trainer.train()

# Evaluate
predictions = trainer.predict(test_dataset)
y_pred = np.argmax(predictions.predictions, axis=1)
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=label_names))

# Confusion matrix
conf_matrix = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(10, 8))
sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Oranges", xticklabels=label_names, yticklabels=label_names)
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.tight_layout()
plt.savefig("confusion_matrix_bert.png")
plt.close()

# Save model
model.save_pretrained("harmful_text_bert_model")
tokenizer.save_pretrained("harmful_text_bert_model")

print("BERT Model Trained and Saved Successfully!")