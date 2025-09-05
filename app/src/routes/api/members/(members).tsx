import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";
import { getVerifiedMembers } from "~/lib/db/wrapper/member";

export async function GET(event: APIEvent) {
	const loggedIn = await requireUser(event)
	// user logged in and with perms
	if(!loggedIn 
		|| !hasPermission(loggedIn.member.id, "view_members")) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	
	const allMembers = await getVerifiedMembers()
	
	return json({members: allMembers}, {status: 200})
}
