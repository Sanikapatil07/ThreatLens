import pandas as pd
import string

# Load the dataset
data = pd.read_csv(
    "../data/SMSSpamCollection",
    sep="\t",
    header=None,
    names=["label", "message"]
)

# Simple text cleaning function
def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text

# Apply cleaning
data["clean_message"] = data["message"].apply(clean_text)

# Show result
print(data[["message", "clean_message"]].head())
