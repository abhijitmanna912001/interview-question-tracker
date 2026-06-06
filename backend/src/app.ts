import cors from "cors";
import express from "express";
import { healthCheck } from "./controllers/problemController.js";
import { problemRoutes } from "./routes/problemRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", healthCheck);
app.use("/api/problems", problemRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

