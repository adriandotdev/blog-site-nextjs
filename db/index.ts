import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env" }); // or .env.local

const client = postgres(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle({ client });
