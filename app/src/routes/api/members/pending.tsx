import { json } from "@solidjs/router";
import { requireUser } from "~/lib/auth";
import type { APIEvent } from "@solidjs/start/server";
import { hasPermission } from "~/lib/auth/roles";
import { getPendingMembers } from "~/lib/db/wrapper/member";

export async function GET(event: APIEvent) {
	const loggedIn = await requireUser(event)
	// user logged in and with perms
	if(!loggedIn 
		|| !hasPermission(loggedIn.member.id, "view_members")) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const allMembers = getPendingMembers()
	
	return json({members: allMembers}, {status: 200})
}
