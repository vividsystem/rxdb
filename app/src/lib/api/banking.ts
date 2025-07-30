import z from "zod";
import { bankingSchema, createBankingSchema } from "../validation/banking";
const BANKING_ROUTE = "/api/banking/"

export async function createBanking(banking: z.infer<typeof createBankingSchema>) {
	const res = await fetch(process.env.API_HOST + BANKING_ROUTE, { method: "POST", body: JSON.stringify(banking) })
	const body = await res.json()


	const bankingParser = bankingSchema.safeParse(body.banking)
	if(!bankingParser.success) {
		console.log(body)
		throw new Error("couldnt parse body on createMember", body)
	}

	return bankingParser.data
}
