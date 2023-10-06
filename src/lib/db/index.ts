import { neonConfig, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL env var not set");

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
