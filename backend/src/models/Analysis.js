import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    riskLevel: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
