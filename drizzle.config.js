import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env file");
}

if (process.env.DATABASE_URL.includes("[") || process.env.DATABASE_URL.includes("]")) {
  throw new Error("Replace the placeholder DATABASE_URL in .env with your Neon connection string");
}

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
