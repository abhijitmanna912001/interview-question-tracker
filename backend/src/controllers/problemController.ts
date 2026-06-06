import { Request, Response } from "express";
import {
  checkDatabase,
  createProblem,
  deleteProblem,
  getProblems,
  updateProblemStatus
} from "../services/problemService.js";
import { Difficulty, ProblemFilters } from "../types/problem.js";
import { validateCreateProblem, validateStatus } from "../validators/problemValidators.js";

const parseId = (value: string): number | null => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export const healthCheck = async (_req: Request, res: Response) => {
  try {
    await checkDatabase();
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(500).json({ message: "API is running, but the database is unavailable." });
  }
};

export const listProblems = async (req: Request, res: Response) => {
  try {
    const filters: ProblemFilters = {
      search: typeof req.query.search === "string" ? req.query.search.trim() : undefined,
      difficulty:
        typeof req.query.difficulty === "string" && req.query.difficulty.trim()
          ? (req.query.difficulty as Difficulty)
          : undefined,
      topic: typeof req.query.topic === "string" ? req.query.topic.trim() : undefined
    };

    const result = await getProblems(filters);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Unable to load problems right now." });
  }
};

export const addProblem = async (req: Request, res: Response) => {
  const validation = validateCreateProblem(req.body);

  if (!validation.valid) {
    res.status(400).json({ message: "Problem details are invalid.", errors: validation.errors });
    return;
  }

  try {
    const problem = await createProblem(validation.data);
    res.status(201).json(problem);
  } catch {
    res.status(500).json({ message: "Unable to create the problem right now." });
  }
};

export const changeProblemStatus = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({ message: "Problem id is invalid." });
    return;
  }

  const validation = validateStatus(req.body);

  if (!validation.valid) {
    res.status(400).json({ message: "Status is invalid.", errors: validation.errors });
    return;
  }

  try {
    const problem = await updateProblemStatus(id, validation.data.status);

    if (!problem) {
      res.status(404).json({ message: "Problem not found." });
      return;
    }

    res.json(problem);
  } catch {
    res.status(500).json({ message: "Unable to update the status right now." });
  }
};

export const removeProblem = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({ message: "Problem id is invalid." });
    return;
  }

  try {
    const deleted = await deleteProblem(id);

    if (!deleted) {
      res.status(404).json({ message: "Problem not found." });
      return;
    }

    res.json({ message: "Problem deleted" });
  } catch {
    res.status(500).json({ message: "Unable to delete the problem right now." });
  }
};

