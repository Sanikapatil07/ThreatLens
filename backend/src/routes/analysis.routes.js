import express from "express";
import Analysis from "../models/Analysis.js";
import { analyzeWithRules } from "../services/phishingRules.js";

const router = express.Router();

// POST - analyze message
router.post("/analyze", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const analysis = analyzeWithRules(message);

    const explanation =
      analysis.matchedWords.length > 0
        ? `Suspicious keywords detected: ${analysis.matchedWords.join(", ")}`
        : "No suspicious patterns detected";

    const savedAnalysis = await Analysis.create({
      message,
      riskLevel: analysis.riskLevel,
      explanation
    });

    res.json({
      riskLevel: savedAnalysis.riskLevel,
      explanation: savedAnalysis.explanation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET - fetch history
router.get("/history", async (req, res) => {
  try {
    const analyses = await Analysis.find().sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analysis history" });
  }
});

export default router;



