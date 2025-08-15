import z from "zod"
import { createMemberInput, Member, memberId, updateMemberInput } from "../validation/member"
import { createBanking } from "./banking"
import { BankingInfo, createBankingSchema } from "../validation/banking"
import { url } from "./helpers"

const MEMBERS_ROUTE = "/api/members"
const MEMBER_ROUTE = "/api/member"

export async function getMembers(): Promise<Member[]> {
	const res = await fetch(url(MEMBERS_ROUTE), { credentials: "include" })
	try {
		const body = await res.json()
		if(!res.ok) {
			throw new Error(`request failed with status ${res.status} and body ${JSON.stringify(body)}`)	
		}

		return body.members as Member[]
	} catch (e) {
		throw e
	}

}
export async function getPendingMembers(): Promise<Member[]> {
	const res = await fetch(`${url(MEMBERS_ROUTE)}/pending`)
	if(!res.ok) {
		throw res
	}
	const body = await res.json()

	return body.members as Member[]
}

export async function createMember(member: z.infer<typeof createMemberInput>): Promise<Member> {
	const res = await fetch(url(MEMBER_ROUTE), { 
		method: "POST", 
		body: JSON.stringify(member), 
		headers: {
			"Content-Type": "application/json"
		}
	})
	if(!res.ok) {
		throw res
	}
	const body = await res.json()

	return body.member as Member
}

export async function createMemberWithBanking(member: Omit<z.infer<typeof createMemberInput>, "bankingId">, banking: z.infer<typeof createBankingSchema>): Promise<{ member: Member, bankingInfo: BankingInfo }> {
	

	const newMember = await createMember({ ...member })
	const bankingInfo = await createBanking({ ...banking, memberId: newMember.id })


	return { member: newMember, bankingInfo: bankingInfo }
}


export async function updateMember(id: z.infer<typeof memberId>, member: z.infer<typeof updateMemberInput>) {
	const res = await fetch(url(`${MEMBER_ROUTE}/${id}`), { 
		method: "PATCH", 
		body: JSON.stringify(member), 
		headers: {
			"Content-Type": "application/json"
		}
	})
	if(!res.ok) {
		throw res
	}
	const body = await res.json()

	return body.member as Member
}
