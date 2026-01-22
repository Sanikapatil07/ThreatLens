import pandas as pd
import string
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Load dataset
data = pd.read_csv(
    "../data/SMSSpamCollection",
    sep="\t",
    header=None,
    names=["label", "message"]
)

# Convert labels
data["label_num"] = data["label"].map({
    "ham": 0,
    "spam": 1
})

# Clean text
def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text

data["clean_message"] = data["message"].apply(clean_text)

# TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data["clean_message"])
y = data["label_num"]

# Train-test split
X_train, _, y_train, _ = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Save model and vectorizer
joblib.dump(model, "../model/phishing_model.pkl")
joblib.dump(vectorizer, "../model/tfidf_vectorizer.pkl")

print("Model and vectorizer saved successfully.")
