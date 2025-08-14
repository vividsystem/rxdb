
import { members } from "../../../../drizzle/schema";
import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { requireUser } from "~/lib/auth";
import { getMemberPermissions, hasPermission } from "~/lib/auth/roles";
import { db } from "~/lib/db";
import { createMemberInput, memberId, updateMemberInput } from "~/lib/validation/member";
export async function GET(event: APIEvent) {
	const { params } = event
	const idResult = memberId.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (idResult.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "view_members"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const res = await db.select().from(members).where(eq(members.id, idResult.data))
	if(res.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}


	return json({
		member: res[0],
	}, { status: 200 })
}

export async function PATCH(event: APIEvent) {
	const {request, params } = event
	const idResult = memberId.safeParse(params.id);

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
  const bodyResult = updateMemberInput.safeParse(body);

	if (!bodyResult.success) {
    return json({ errors: z.formatError(bodyResult.error) }, { status: 400 });
  }

	const member = await db.update(members).set(bodyResult.data).where(eq(members.id, idResult.data)).returning()
	if(member.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ member: member[0]}, { status: 200 })
}

export async function DELETE(event: APIEvent) {
	const { params } = event
	const idResult = memberId.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (idResult.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "delete_members"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	

	const res = await db.delete(members).where(eq(members.id, idResult.data))
	if(res.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}


	return json({
		member: res[0],
	}, { status: 200 })
}
