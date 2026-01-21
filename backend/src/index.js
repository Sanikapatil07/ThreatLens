import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysis.routes.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analysisRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

connectDB();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

