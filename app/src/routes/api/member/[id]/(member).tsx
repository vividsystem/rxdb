import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import z from "zod";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";
import { deleteMember, getMember, updateMember } from "~/lib/db/wrapper/member";
import { memberIdSchema, updateMemberSchema } from "~/lib/validation/member";
export async function GET(event: APIEvent) {
	const { params } = event
	const idResult = memberIdSchema.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (idResult.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "view_members"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const member = getMember(idResult.data)
	if(!member) {
		return json({message: "Not found"}, {status: 404})
	}


	return json({ member: member }, { status: 200 })
}

export async function PATCH(event: APIEvent) {
	const {request, params } = event
	const idResult = memberIdSchema.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (idResult.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "edit_members"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const body = await request.json();
  const bodyResult = updateMemberSchema.safeParse(body);

	if (!bodyResult.success) {
    return json({ errors: z.formatError(bodyResult.error) }, { status: 400 });
  }

	const member = updateMember(idResult.data, bodyResult.data)
	if(!member) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ member: member } , { status: 200 })
}

export async function DELETE(event: APIEvent) {
	const { params } = event
	const idResult = memberIdSchema.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (idResult.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "delete_members"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	

	const member = deleteMember(idResult.data)
	if(!member) {
		return json({message: "Not found"}, {status: 404})
	}


	return json({ member: member }, { status: 200 })
}
