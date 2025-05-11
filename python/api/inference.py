# inference.py
import joblib
import re, string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import nltk

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

model = joblib.load("model/harmful_text_classifier.pkl")
vectorizer = joblib.load("model/vectorizer.pkl")

def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return " ".join(tokens)

def predict_text(text: str) -> str:
    cleaned = clean_text(text)
    vec = vectorizer.transform([cleaned])
    prediction = model.predict(vec)[0]
    return prediction
