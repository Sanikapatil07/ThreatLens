import pandas as pd
import string
from sklearn.feature_extraction.text import TfidfVectorizer

# Load data
data = pd.read_csv(
    "../data/SMSSpamCollection",
    sep="\t",
    header=None,
    names=["label", "message"]
)

# Clean text
def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text

data["clean_message"] = data["message"].apply(clean_text)

# TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data["clean_message"])

print("TF-IDF matrix shape:", X.shape)
