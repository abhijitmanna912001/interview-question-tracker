import {
  Problem,
  ProblemFilters,
  ProblemFormInput,
  ProblemsResponse,
  ProblemStatus
} from "../types/problem";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001/api";

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as { message?: string; errors?: string[] };
    return data.errors?.join(" ") || data.message || "Something went wrong.";
  } catch {
    return "Something went wrong.";
  }
};

export const fetchProblems = async (filters: ProblemFilters): Promise<ProblemsResponse> => {
  const params = new URLSearchParams();

  if (filters.search.trim()) params.set("search", filters.search.trim());
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.topic.trim()) params.set("topic", filters.topic.trim());

  const response = await fetch(`${API_URL}/problems?${params.toString()}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
};

export const createProblem = async (input: ProblemFormInput): Promise<Problem> => {
  const response = await fetch(`${API_URL}/problems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
};

export const updateProblemStatus = async (
  id: number,
  status: ProblemStatus
): Promise<Problem> => {
  const response = await fetch(`${API_URL}/problems/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
};

export const deleteProblem = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/problems/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
};

