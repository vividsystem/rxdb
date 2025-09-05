"use server";

import z from "zod";
import { memberIdSchema } from "~/lib/validation/member";
import { db } from "..";
import { bankingInfo } from "@/schema";
import { eq } from "drizzle-orm";
import { createBankingSchema, updateBankingSchema } from "~/lib/validation/banking";


export async function getBankingByMemberId(memberId: z.infer<typeof memberIdSchema>) {
	const banking = await db.select().from(bankingInfo).where(eq(bankingInfo.memberId, memberId))
	if(banking.length < 1) {
		return
	}


	return banking[0]
}

export async function createBanking(newBanking: z.infer<typeof createBankingSchema>) {

	const banking = await db.insert(bankingInfo).values(newBanking).returning()
	if(banking.length < 1) {
		return
	}


	return banking[0]
}

export async function updateBanking(memberId: z.infer<typeof memberIdSchema>, updated: z.infer<typeof updateBankingSchema>) {

	const banking = await db.update(bankingInfo).set(updated).where(eq(bankingInfo.memberId, memberId))
	if(banking.length < 1) {
		return
	}

	return banking[0]
}

export async function deleteBanking(memberId: z.infer<typeof memberIdSchema>) {
	const banking = await db.delete(bankingInfo).where(eq(bankingInfo.memberId, memberId))
	if(banking.length < 1) {
		return
	}

	return banking[0]
}
