import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

if (process.env.DATABASE_URL.includes("[") || process.env.DATABASE_URL.includes("]")) {
  throw new Error("Replace the placeholder DATABASE_URL in .env with your Neon connection string");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
