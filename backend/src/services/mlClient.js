import fetch from "node-fetch";

const ML_API_URL = "http://localhost:8000/predict";

export async function getPhishingPercentage(message) {
  const response = await fetch(ML_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error("Failed to get ML prediction");
  }

  const data = await response.json();
  return data.phishing_percentage;
}
