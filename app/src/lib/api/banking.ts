import z from "zod";
import { createBankingSchema, BankingInfo, updateBankingSchema } from "../validation/banking";
import { memberId as memberIdSchema } from "../validation/member";
import { url } from "./helpers";
import { APIError } from "./errors";

const bankingRoute = (memberId: z.infer<typeof memberIdSchema>) => {
	return `/api/member/${memberId}/banking`
}

export async function createBanking(banking: z.infer<typeof createBankingSchema>): Promise<BankingInfo> {
	const res = await fetch(url(bankingRoute(banking.memberId)), {
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

export async function getBanking(memberId: z.infer<typeof memberIdSchema>) {
	const res = await fetch(url(bankingRoute(memberId)))
	if(!res.ok) {
		throw await APIError.fromResponse(res) 
	}
	const body = await res.json()

	return body.banking as BankingInfo
}


export async function updateBankingInformation(memberId: z.infer<typeof memberIdSchema>, banking: z.infer<typeof updateBankingSchema>) {
	const res = await fetch(url(bankingRoute(memberId)), {
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

export async function deleteBankingInformation(memberId: z.infer<typeof memberIdSchema>) {
	const res = await fetch(url(bankingRoute(memberId)), {
		method: "DELETE", 
	})
	if(!res.ok) {
		throw await APIError.fromResponse(res) 
	}
	const body = await res.json()

	return body.banking as BankingInfo
}
