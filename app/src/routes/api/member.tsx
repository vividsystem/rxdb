import { json } from "@solidjs/router";
import z from "zod";
import { createMemberSchema } from "~/lib/validation/member";
import type { APIEvent } from "@solidjs/start/server";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";
import { createMember } from "~/lib/db/wrapper/member";

export async function POST(event: APIEvent) {
	const { request } = event
	const body = await request.json();
	const loggedIn = await requireUser(event)
	if(!loggedIn 
		|| !hasPermission(loggedIn.member.id, "edit_members")) {
		body.verified = undefined
		body.cert = undefined
	}

	//handle correctly in the future with onboardingMemberSchema
	const result = createMemberSchema.safeParse(body);
	if (!result.success) {
		return json({ errors: z.formatError(result.error) }, { status: 400 });
	}
	const member = createMember(result.data)
	if(!member) {
		return json({ message: "Something went wrong"}, { status: 500})
	}

	return json({ member: member }, { status: 201 })
}

export async function GET(event: APIEvent) {
	const loggedInUser = await requireUser(event)
	if(!loggedInUser) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	return json({ member: loggedInUser.member })
}
