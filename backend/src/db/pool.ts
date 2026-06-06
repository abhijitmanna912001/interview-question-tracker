import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL ?? "postgres://localhost:5432/interview_tracker";

export const pool = new Pool({
  connectionString
});
