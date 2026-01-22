import express from "express";
import Analysis from "../models/Analysis.js";
import { analyzeWithRules } from "../services/phishingRules.js";
import { getPhishingPercentage } from "../services/mlClient.js";
import { getRuleScore, getFinalRiskScore } from "../services/riskScoring.js";

const router = express.Router();

// POST - analyze message
router.post("/analyze", async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ Validate first
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 🔹 ML call
    let mlPercentage = null;
    try {
      mlPercentage = await getPhishingPercentage(message);
      console.log("ML phishing percentage:", mlPercentage);
    } catch (err) {
      console.error("ML service error:", err.message);
    }

    // 🔹 Rule-based analysis
    const analysis = analyzeWithRules(message);
    const ruleScore = getRuleScore(analysis.riskLevel);
    const finalRiskScore = getFinalRiskScore(mlPercentage, ruleScore);


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
      explanation: savedAnalysis.explanation,
      mlPercentage,
      finalRiskScore
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
// DELETE - clear all history
router.delete("/history", async (req, res) => {
  try {
    await Analysis.deleteMany({});
    res.json({ message: "History cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear history" });
  }
});


export default router;




