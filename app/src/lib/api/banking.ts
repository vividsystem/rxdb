import z from "zod";
import { createBankingSchema, BankingInfo, bankingId, updateBankingSchema } from "../validation/banking";
import { memberId as memberIdSchema } from "../validation/member";
import { url } from "./helpers";
import { MEMBER_ROUTE } from "./members";
import { APIError } from "./errors";

const BANKING_ROUTE = "/api/banking"

export async function createBanking(banking: z.infer<typeof createBankingSchema>): Promise<BankingInfo> {
	const res = await fetch(url(BANKING_ROUTE), { 
		method: "POST", 
		headers: { 
			"Content-Type": "application/json"
		},
		body: JSON.stringify(banking) 
	})
	if(!res.ok) {
		throw await APIError.fromResponse(res) 
	}
	const body = await res.json()


	return body.banking as BankingInfo
}

export async function getBanking(id: z.infer<typeof bankingId>) {
	const res = await fetch(url(`${BANKING_ROUTE}/${id}`))
	if(!res.ok) {
		throw await APIError.fromResponse(res) 
	}
	const body = await res.json()

	return body.banking as BankingInfo

}


export async function updateBankingInformation(id: z.infer<typeof bankingId>, banking: z.infer<typeof updateBankingSchema>) {
	const res = await fetch(url(`${BANKING_ROUTE}/${id}`), { 
		method: "PATCH", 
		body: JSON.stringify(banking), 
		headers: {
			"Content-Type": "application/json"
		}
	})
	if(!res.ok) {
		throw await APIError.fromResponse(res) 
	}
	const body = await res.json()

	return body.banking as BankingInfo
}

export async function getBankingFromMemberId(memberId: z.infer<typeof memberIdSchema>) {
	const res = await fetch(url(`${MEMBER_ROUTE}/${memberId}/banking`))
	if(!res.ok) {
		throw await APIError.fromResponse(res)
	}
	try {
		const body = await res.json()

		return body.banking as BankingInfo
	} catch (e) {
		throw e
	}
	
}
