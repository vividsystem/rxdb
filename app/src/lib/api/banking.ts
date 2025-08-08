import z from "zod";
import { createBankingSchema, BankingInfo, bankingId, updateBankingSchema } from "../validation/banking";
import { url } from "./helpers";

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
		throw res
	}
	const body = await res.json()


	return body.banking as BankingInfo
}

export async function getBanking(id: z.infer<typeof bankingId>) {
	const res = await fetch(url(`${BANKING_ROUTE}/${id}`))
	if(!res.ok) {
		throw res
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
		throw res
	}
	const body = await res.json()

	return body.banking as BankingInfo
}
