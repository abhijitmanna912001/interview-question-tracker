export const difficulties = ["Easy", "Medium", "Hard"] as const;
export const statuses = ["Solved", "Revision Needed", "Unsolved"] as const;

export type Difficulty = (typeof difficulties)[number];
export type ProblemStatus = (typeof statuses)[number];

export interface Problem {
  id: number;
  title: string;
  platform: string;
  difficulty: Difficulty;
  topic: string;
  status: ProblemStatus;
  notes: string | null;
  created_at: string;
}

export interface CreateProblemInput {
  title: string;
  platform: string;
  difficulty: Difficulty;
  topic: string;
  status: ProblemStatus;
  notes?: string;
}

export interface ProblemFilters {
  search?: string;
  difficulty?: Difficulty;
  topic?: string;
}

