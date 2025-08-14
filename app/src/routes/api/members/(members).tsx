import { members } from "../../../../drizzle/schema";
import { json } from "@solidjs/router";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import type { APIEvent } from "@solidjs/start/server";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";

export async function GET(event: APIEvent) {
	const loggedIn = await requireUser(event)
	// user logged in and with perms
	if(!loggedIn 
		|| !hasPermission(loggedIn.member.id, "view_members")) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	
	const allMembers = await db.select().from(members).where(eq(members.verified, true)).catch((e) => {
		throw e
	});
	
	return json({members: allMembers}, {status: 200})
}
