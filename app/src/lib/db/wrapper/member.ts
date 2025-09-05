"use server";

import { members } from "@/schema";
import z from "zod";
import { createMemberSchema, memberIdSchema, updateMemberSchema } from "~/lib/validation/member";
import { db } from "..";
import { eq } from "drizzle-orm";

export async function getVerifiedMembers() {
	const m = await db.select().from(members).where(eq(members.verified, true))
	return m
}

export async function getPendingMembers() {
	const pending = await db.select().from(members).where(eq(members.verified, false)).catch((e) => {
		throw e
	});

	return pending
}

export async function createMember(newMember: z.infer<typeof createMemberSchema>) {
	const member = await db.insert(members).values(newMember).returning()
	if(member.length < 1) {
		return
	}

	return member[0]
}

export async function getMember(memberId: z.infer<typeof memberIdSchema>) {
	const member = await db.select().from(members).where(eq(members.id, memberId))
	if(member.length < 1) {
		return
	}

	return member[0]
}

export async function updateMember(memberId: z.infer<typeof memberIdSchema>, updated: z.infer<typeof updateMemberSchema>) {
	const member = await db.update(members).set(updated).where(eq(members.id, memberId)).returning()

	if(member.length < 1) {
		return
	}

	return member[0]
}

export async function deleteMember(memberId: z.infer<typeof memberIdSchema>) {
	const member = await db.delete(members).where(eq(members.id, memberId))

	if(member.length < 1) {
		return
	}

	return member[0]
}
