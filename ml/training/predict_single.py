from predict_utils import predict_phishing_probability

message = "Urgent! Verify your bank account immediately to avoid suspension."

prob = predict_phishing_probability(message)

print("Message:", message)
print(f"Phishing probability: {prob * 100:.2f}%")

