import z from "zod"
import { memberSchema, createMemberInput } from "../validation/member"
import { createBanking } from "./banking"
import { createBankingSchema } from "../validation/banking"

const MEMBER_ROUTE = "/api/members/"
export async function getMembers() {
	const res = await fetch(process.env.API_HOST + MEMBER_ROUTE)
	const body = await res.json()

	const member = memberSchema.array().safeParse(body.members)
	if(!member.success) {
		console.log(body)
		throw new Error("couldnt parse body on getMembers", body)
	}
	return member.data
}

export async function createMember(member: z.infer<typeof createMemberInput>) {
	const res = await fetch(process.env.API_HOST + MEMBER_ROUTE, { method: "POST", body: JSON.stringify(member) })
	const body = await res.json()


	const memberParser = memberSchema.safeParse(body.member)
	if(!memberParser.success) {
		console.log(body)
		throw new Error("couldnt parse body on createMember", body)
	}

	return memberParser.data
}

export async function createMemberWithBanking(member: Omit<z.infer<typeof createMemberInput>, "bankingId">, banking: z.infer<typeof createBankingSchema>) {
	
	const bankingInfo = await createBanking(banking)

	const newMember = await createMember({ ...member, bankingId: bankingInfo.id })

	return { member: newMember, bankingInfo: bankingInfo }
}
