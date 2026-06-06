import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";
const connectionString = process.env.DATABASE_URL;

if (isProduction && !connectionString) {
  throw new Error("DATABASE_URL is required in production.");
}

export const pool = new Pool({
  connectionString: connectionString ?? "postgres://localhost:5432/interview_tracker"
});
