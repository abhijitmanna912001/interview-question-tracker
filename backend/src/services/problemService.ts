import { QueryResult } from "pg";
import { pool } from "../db/pool.js";
import { CreateProblemInput, Problem, ProblemFilters, ProblemStatus } from "../types/problem.js";

const mapProblem = (row: Problem): Problem => row;

export const getProblems = async (filters: ProblemFilters) => {
  const conditions: string[] = [];
  const values: string[] = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(`title ILIKE $${values.length}`);
  }

  if (filters.difficulty) {
    values.push(filters.difficulty);
    conditions.push(`difficulty = $${values.length}`);
  }

  if (filters.topic) {
    values.push(`%${filters.topic}%`);
    conditions.push(`topic ILIKE $${values.length}`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const problemsQuery = `
    SELECT id, title, platform, difficulty, topic, status, notes, created_at
    FROM problems
    ${whereClause}
    ORDER BY created_at DESC, id DESC
  `;

  const solvedQuery = "SELECT COUNT(*)::int AS count FROM problems WHERE status = 'Solved'";

  const [problemsResult, solvedResult]: [
    QueryResult<Problem>,
    QueryResult<{ count: number }>
  ] = await Promise.all([
    pool.query<Problem>(problemsQuery, values),
    pool.query<{ count: number }>(solvedQuery)
  ]);

  return {
    problems: problemsResult.rows.map(mapProblem),
    totalSolved: solvedResult.rows[0]?.count ?? 0
  };
};

export const createProblem = async (input: CreateProblemInput): Promise<Problem> => {
  const result = await pool.query<Problem>(
    `
      INSERT INTO problems (title, platform, difficulty, topic, status, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, title, platform, difficulty, topic, status, notes, created_at
    `,
    [input.title, input.platform, input.difficulty, input.topic, input.status, input.notes || null]
  );

  return result.rows[0];
};

export const updateProblemStatus = async (
  id: number,
  status: ProblemStatus
): Promise<Problem | null> => {
  const result = await pool.query<Problem>(
    `
      UPDATE problems
      SET status = $1
      WHERE id = $2
      RETURNING id, title, platform, difficulty, topic, status, notes, created_at
    `,
    [status, id]
  );

  return result.rows[0] ?? null;
};

export const deleteProblem = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM problems WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};

export const checkDatabase = async (): Promise<void> => {
  await pool.query("SELECT 1");
};

