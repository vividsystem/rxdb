import { members } from "../../../../drizzle/schema";
import { json } from "@solidjs/router";
import { eq } from "drizzle-orm";
import { requireUser } from "~/lib/auth";
import { db } from "~/lib/db";
import type { APIEvent } from "@solidjs/start/server";
import { hasPermission } from "~/lib/auth/roles";

export async function GET(event: APIEvent) {
	const loggedIn = await requireUser(event)
	// user logged in and with perms
	if(!loggedIn 
		|| !hasPermission(loggedIn.member.id, "view_members")) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const allMembers = await db.select().from(members).where(eq(members.verified, false)).catch((e) => {
		throw e
	});
	
	return json({members: allMembers}, {status: 200})
}
