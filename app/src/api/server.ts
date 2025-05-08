"use server";
import { eq } from "drizzle-orm";
import { bankingInfo, members, shareTokens } from "../../drizzle/schema";
import { db } from "./db";


export type Member = typeof members.$inferSelect
export type BankingInfo = typeof bankingInfo.$inferSelect
export type ShareToken = typeof shareTokens.$inferSelect

export async function getMember(id: number) {
	const res = await db.select().from(members).where(eq(members.id, id))
	return res[0]
}
export async function getMembers(): Promise<Member[]> {
	return await db.select().from(members).orderBy(members.lastname)
}
export type NewMember = Omit<typeof members.$inferInsert,  "id" | "bankingId"> 
export type NewBanking = Omit<typeof bankingInfo.$inferInsert, "id">
export type NewShareToken = Omit<typeof shareTokens.$inferInsert, "">

export async function createMember(member: NewMember, banking: NewBanking) {
	return await db.transaction(async (tx) => {
		try {

			const res = await db.insert(bankingInfo).values(banking).returning()
			await db.insert(members).values({ bankingId: res[0].id, ...member})
		} catch (e) {
			console.log(member, banking)
			throw e
		}
	})
}


export async function updateMember(id: Member["id"], member: NewMember) {
	await db.update(members).set(member).where(eq(members.id, id))
}

export async function deleteMember(id: Member["id"]) {
	await db.transaction(async (tx) => {

		const member = await db.delete(members).where(eq(members.id, id)).returning();
		await db.delete(bankingInfo).where(eq(bankingInfo.id, member[0].bankingId))
	})
}

export async function getBanking(id: BankingInfo["id"]) {
	return (await db.select().from(bankingInfo).where(eq(bankingInfo.id, id)))[0]
}

export async function updateBanking(id: BankingInfo["id"], banking: NewBanking) {
	await db.update(bankingInfo).set(banking).where(eq(members.id, id))
}

export async function createShare(id: Member["id"], member: NewMember) {
	await db.update(members).set(member).where(eq(members.id, id))
}
