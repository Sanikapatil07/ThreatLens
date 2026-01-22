import joblib
import string
from pathlib import Path

# Get absolute path to model directory
BASE_DIR = Path(__file__).resolve().parents[1]  # ml/
MODEL_DIR = BASE_DIR / "model"

model = joblib.load(MODEL_DIR / "phishing_model.pkl")
vectorizer = joblib.load(MODEL_DIR / "tfidf_vectorizer.pkl")

def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text

def predict_phishing_probability(message: str) -> float:
    cleaned = clean_text(message)
    X = vectorizer.transform([cleaned])
    prob = model.predict_proba(X)[0][1]
    return prob

