import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { bodyParser } from "better-auth/client";
import z from "zod";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/db/wrapper/permissions";
import { addRole, getMemberRoles, removeRole } from "~/lib/db/wrapper/roles";
import { memberIdSchema } from "~/lib/validation/member";
import { addRoleSchema } from "~/lib/validation/roles";

// get roles from member
export async function GET(event: APIEvent) {
	const params = memberIdSchema.safeParse(event.params)
	if(!params.success) {
		return json({errors: z.formatError(params.error)}, { status: 400 })
	}

	const loggedIn = await requireUser(event)
	if(!loggedIn) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedIn.member.id, "view_roles")
	if(!permitted && (params.data != loggedIn.member.id)) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const rows = await getMemberRoles(params.data)
	const roles = rows.map(r => r.role)

	return json({ roles: roles }, { status: 200 })
}

//add role to member
export async function POST(event: APIEvent) {
	const params = memberIdSchema.safeParse(event.params)
	if(!params.success) {
		return json({errors: z.formatError(params.error)}, { status: 400 })
	}
	
	const body = await event.request.json()
	const bodyParser = addRoleSchema.safeParse(body)
	if(!bodyParser.success) {
		return json({ message: "Bad request"}, { status: 400 })
	}

	const loggedIn = await requireUser(event)
	if(!loggedIn) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedIn.member.id, "assign_roles")
	if(!permitted) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}


	const rows = await addRole(params.data, bodyParser.data.id)
	if(rows.length == 0) {
		return json({ message: "Role already exists on member." }, { status: 200 })
	}

	return json({ message: "Role added to member" }, { status: 201 })
}

//unassign role from member
export async function DELETE(event: APIEvent) {
	const params = memberIdSchema.safeParse(event.params)
	if(!params.success) {
		return json({errors: z.formatError(params.error)}, { status: 400 })
	}

	const body = await event.request.json()
	const bodyParser = addRoleSchema.safeParse(body)
	if(!bodyParser.success) {
		return json({ message: "Bad request"}, { status: 400 })
	}

	const loggedInUser = await requireUser(event)
	if(!loggedInUser) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedInUser.member.id, "assign_roles")
	if(!permitted) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const rows = await removeRole(params.data, bodyParser.data.id)
	if(rows.length == 0) {
		return json({ message: "Role doesn't exist on member" })
	}

	return json({ message: "Role deleted from member"}, { status: 200 })

}
