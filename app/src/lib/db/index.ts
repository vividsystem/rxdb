"use server";
import { members } from "../../../drizzle/schema";
import { drizzle } from "drizzle-orm/node-postgres";
export const db = drizzle(process.env.DATABASE_URL);

export const Member = members.$inferSelect
