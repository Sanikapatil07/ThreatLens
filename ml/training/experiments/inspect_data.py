import pandas as pd

data = pd.read_csv(
    "../data/SMSSpamCollection",
    sep="\t",
    header=None,
    names=["label", "message"]
)

print("Shape:", data.shape)
print("\nLabel counts:")
print(data["label"].value_counts())

print("\nFirst 5 rows:")
print(data.head())
