import sys
from pathlib import Path
from flask import Flask, request, jsonify

# Add project root to Python path
ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.append(str(ROOT_DIR))

from ml.training.predict_utils import predict_phishing_probability

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Message is required"}), 400

    message = data["message"]
    probability = predict_phishing_probability(message)

    return jsonify({
        "phishing_percentage": round(probability * 100, 2)
    })

if __name__ == "__main__":
    print("Starting ML API...")
    app.run(port=8000, debug=True)
