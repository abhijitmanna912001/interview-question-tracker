import { Router } from "express";
import {
  addProblem,
  changeProblemStatus,
  listProblems,
  removeProblem
} from "../controllers/problemController.js";

export const problemRoutes = Router();

problemRoutes.get("/", listProblems);
problemRoutes.post("/", addProblem);
problemRoutes.patch("/:id/status", changeProblemStatus);
problemRoutes.delete("/:id", removeProblem);

