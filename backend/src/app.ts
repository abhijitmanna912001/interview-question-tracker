import cors from "cors";
import express from "express";
import { healthCheck } from "./controllers/problemController.js";
import { problemRoutes } from "./routes/problemRoutes.js";

export const app = express();

const allowedOrigins =
  process.env.FRONTEND_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.length === 0) {
        callback(null, process.env.NODE_ENV !== "production");
        return;
      }

      callback(null, allowedOrigins.includes(origin));
    }
  })
);
app.use(express.json());

app.get("/api/health", healthCheck);
app.use("/api/problems", problemRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});
