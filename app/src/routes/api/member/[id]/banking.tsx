import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { z } from "zod";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";
import { createBanking, deleteBanking, getBankingByMemberId, updateBanking } from "~/lib/db/wrapper/banking";
import { createBankingSchema, updateBankingSchema } from "~/lib/validation/banking";
import { memberIdSchema } from "~/lib/validation/member";

export async function GET(event: APIEvent) {
	const { params } = event
	const paramsParser = memberIdSchema.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const loggedInUser = await requireUser(event)
	if(!loggedInUser) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedInUser.member.id, "view_banking")
	if(!permitted && (paramsParser.data != loggedInUser.member.id)) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const banking = getBankingByMemberId(paramsParser.data)
	if(!banking) {
		return json({ message: "Not found"}, {status: 404})
	}

}

export async function POST(event: APIEvent) {
	const { request, params } = event
	const paramsParser = memberIdSchema.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const loggedInUser = await requireUser(event)
	if(!loggedInUser) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedInUser.member.id, "edit_members")
	if(!permitted && (paramsParser.data != loggedInUser.member.id)) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const body = await request.json()
	const bodyParser = createBankingSchema.safeParse(body)
	if(!bodyParser.success) {
    return json({ errors: z.formatError(bodyParser.error) }, { status: 400 });
	}
	
	const banking = createBanking(bodyParser.data)
	if(!banking) {
		return json({message: "Not found"}, {status: 404})

	}

	return json({ banking: banking }, { status: 201 })	
	
}


export async function PATCH(event: APIEvent) {
	const { request, params } = event
	const paramsParser = memberIdSchema.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const loggedInUser = await requireUser(event)
	if(!loggedInUser) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedInUser.member.id, "edit_banking")
	if(!permitted && (paramsParser.data != loggedInUser.member.id)) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const body = await request.json()
	const bodyParser = updateBankingSchema.safeParse(body)
	if(!bodyParser.success) {
    return json({ errors: z.formatError(bodyParser.error) }, { status: 400 });
	}

	const banking = updateBanking(paramsParser.data, bodyParser.data)
	if(!banking) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking }, { status: 200})
}

export async function DELETE(event: APIEvent) {
	const { params } = event
	const paramsParser = memberIdSchema.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const loggedInUser = await requireUser(event)
	if(!loggedInUser) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}
	const permitted = await hasPermission(loggedInUser.member.id, "delete_banking")
	if(!permitted && (paramsParser.data != loggedInUser.member.id)) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const banking = deleteBanking(paramsParser.data)
	if(!banking) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking }, { status: 200 })
}
