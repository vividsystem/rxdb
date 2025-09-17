import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import z from "zod";
import { requireUser } from "~/lib/auth";
import { getMemberPermissions, hasPermission } from "~/lib/db/wrapper/permissions";
import { memberIdSchema } from "~/lib/validation/member";

export async function GET(event: APIEvent) {
	const params = memberIdSchema.safeParse(event.params)
	if(!params.success) {
		return json({errors: z.formatError(params.error)}, { status: 400 })
	}

	const loggedInUser = await requireUser(event)
	if(!loggedInUser) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedInUser.member.id, "view_permissions")
	if(!permitted) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const permissions = getMemberPermissions(params.data)
	return json({ permissions: permissions }, { status: 200 })
}
