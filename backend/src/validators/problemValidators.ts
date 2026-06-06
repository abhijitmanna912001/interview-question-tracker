import { CreateProblemInput, difficulties, ProblemStatus, statuses } from "../types/problem.js";

type ValidationResult<T> =
  | { valid: true; data: T }
  | { valid: false; errors: string[] };

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const validateCreateProblem = (body: unknown): ValidationResult<CreateProblemInput> => {
  const errors: string[] = [];
  const input = body as Partial<CreateProblemInput>;

  if (!isNonEmptyString(input.title)) errors.push("Title is required.");
  if (!isNonEmptyString(input.platform)) errors.push("Platform is required.");
  if (!isNonEmptyString(input.topic)) errors.push("Topic is required.");
  if (!statuses.includes(input.status as ProblemStatus)) errors.push("Status is invalid.");
  if (!difficulties.includes(input.difficulty as CreateProblemInput["difficulty"])) {
    errors.push("Difficulty is invalid.");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      title: input.title!.trim(),
      platform: input.platform!.trim(),
      difficulty: input.difficulty!,
      topic: input.topic!.trim(),
      status: input.status!,
      notes: typeof input.notes === "string" ? input.notes.trim() : ""
    }
  };
};

export const validateStatus = (body: unknown): ValidationResult<{ status: ProblemStatus }> => {
  const input = body as { status?: ProblemStatus };

  if (!statuses.includes(input.status as ProblemStatus)) {
    return { valid: false, errors: ["Status is invalid."] };
  }

  return { valid: true, data: { status: input.status! } };
};

