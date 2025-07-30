import z from "zod"
import { memberSchema, createMemberInput } from "../validation/member"

export async function getMembers() {
	const res = await fetch(process.env.API_HOST + "/api/members")
	const body = await res.json()

	const member = memberSchema.array().safeParse(body.members)
	if(!member.success) {
		console.log(body)
		throw new Error("couldnt parse body on getMembers", body)
	}
	return member.data
}

export async function createMember(member: z.infer<typeof createMemberInput>) {
	const res = await fetch(process.env.API_HOST + "/api/members", { method: "POST", body: JSON.stringify(member) })
	const body = await res.json()


	const memberParser = memberSchema.safeParse(body.member)
	if(!memberParser.success) {
		console.log(body)
		throw new Error("couldnt parse body on createMember", body)
	}

	return memberParser.data
}
