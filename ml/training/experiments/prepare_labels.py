import pandas as pd

# Load dataset
data = pd.read_csv(
    "../data/SMSSpamCollection",
    sep="\t",
    header=None,
    names=["label", "message"]
)

# Convert labels to numbers
data["label_num"] = data["label"].map({
    "ham": 0,
    "spam": 1
})

# Check result
print(data[["label", "label_num"]].head())
print("\nLabel counts:")
print(data["label_num"].value_counts())
