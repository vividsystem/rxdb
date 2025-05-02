"use server";
import { members } from "../../drizzle/schema";
import { db } from "./db";


export async function getMembers() {
	return await db.select().from(members)
}

export async function addMember(member: typeof members.$inferInsert) {
	return await db.insert(members).values(member)
}
