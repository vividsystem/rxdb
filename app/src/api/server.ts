"use server";
import { bankingInfo, members } from "../../drizzle/schema";
import { db } from "./db";


export type Member = typeof members.$inferSelect
export async function getMembers(): Promise<Member[]> {
	return await db.select().from(members).orderBy(members.lastname)
}
type NewMember = Omit<typeof members.$inferInsert,  "bankingId"> 
type NewBanking = typeof bankingInfo.$inferInsert 

export async function addMember(member: NewMember, banking: NewBanking) {
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
