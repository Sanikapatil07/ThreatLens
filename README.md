# ThreatLens   
Hybrid AI-Powered Phishing Detection System

ThreatLens is a full-stack security application that detects phishing messages using a **hybrid approach combining rule-based logic and machine learning**, with clear explainability for every decision.

---

## Features

- Hybrid phishing detection (Rule-based + ML)
- NLP-based ML model (TF-IDF + Logistic Regression)
- Explainable AI output (model confidence + rule triggers)
- Phishing risk percentage with visual progress bar
- Persistent analysis history
- Clean, security-focused UI

---

## How It Works

1. User submits a message for analysis  
2. Backend applies rule-based phishing checks  
3. Message is sent to a Python ML microservice for probability scoring  
4. Hybrid risk score is calculated using ML confidence and rule severity  
5. UI displays final risk level, percentage, and explanation  

---

## Tech Stack

**Frontend**
- HTML, CSS, JavaScript

**Backend**
- Node.js, Express
- MongoDB Atlas

**Machine Learning**
- Python
- scikit-learn
- TF-IDF Vectorizer
- Logistic Regression

---

## Explainability

Each analysis includes:
- ML confidence score (%)
- Rule-based triggers (keywords detected)
- Final decision based on hybrid scoring logic

This ensures transparency instead of black-box predictions.

---

## Future Enhancements

- Browser extension for real-time email scanning
- Advanced explainability using SHAP
- Threat intelligence API integration

---

## Author

Sanika Patil  
Final Year B.Tech Student

 
