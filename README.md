# ThreatLens
*Phishing Detection system*

ThreatLens is a full-stack web application that analyzes text messages for phishing risks using rule-based cybersecurity logic.  
It provides clear risk classification, human-readable explanations, and a clean dashboard to view analysis history.

---

## Features

-Analyze messages for phishing risk (High / Medium / Low)
-Rule-based detection logic
-History dashboard with severity indicators
-Clean, modern UI using custom color palette
-AI-ready architecture (mocked for development)
-MongoDB Atlas for persistent storage

---

## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript (Vanilla)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas

---

## How It Works

1. User enters a message in the Analyze tab  
2. Backend applies phishing detection rules  
3. Message is classified as High, Medium, or Low risk  
4. Result is stored in MongoDB  
5. History tab displays past analyses with visual indicators  

---

## 📸 Screenshots

### Analyze Message
![analyze](screenshots/analyze.png)

### History Dashboard
![history](screenshots/history.png)

---

## Design Decisions

- Used rule-based detection to ensure transparency and control
- Designed frontend with usability and calm UX in mind
- Implemented non-destructive history controls (Show More / Clear History)
- Kept AI integration optional to avoid unnecessary API costs

---

## Future Improvements

- User authentication
- Per-user analysis history
- Live AI-generated explanations
- Deployment to cloud platform

---

## Author

**Sanika Patil**  
Final-year B.Tech student | Software Engineering  
