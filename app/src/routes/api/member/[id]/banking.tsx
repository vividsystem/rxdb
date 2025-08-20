import { bankingInfo } from "../../../../../drizzle/schema";
import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";
import { db } from "~/lib/db";
import { createBankingSchema, updateBankingSchema } from "~/lib/validation/banking";
import { memberId } from "~/lib/validation/member";

export async function GET(event: APIEvent) {
	const { params } = event
	const paramsParser = memberId.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (paramsParser.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "view_banking"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const banking = await db.select().from(bankingInfo).where(eq(bankingInfo.memberId, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}


	return json({ banking: banking[0] }, { status: 200 })

}

//TODO
export async function POST(event: APIEvent) {
	const { request, params } = event
	const paramsParser = memberId.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (paramsParser.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "edit_members"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const body = await request.json()
	const bodyParser = createBankingSchema.safeParse(body)
	if(!bodyParser.success) {
    return json({ errors: z.formatError(bodyParser.error) }, { status: 400 });
	}
	
	const banking = await db.insert(bankingInfo).values(bodyParser.data).returning()

	return json({ banking: banking[0] }, { status: 201 })	

	
}


export async function PATCH(event: APIEvent) {
	const { request, params } = event
	const paramsParser = memberId.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}
	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (paramsParser.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "edit_banking"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const body = await request.json()
	const bodyParser = updateBankingSchema.safeParse(body)
	if(!bodyParser.success) {
    return json({ errors: z.formatError(bodyParser.error) }, { status: 400 });
	}

	const banking = await db.update(bankingInfo).set(bodyParser.data).where(eq(bankingInfo.memberId, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking[0]}, { status: 200})
}

export async function DELETE(event: APIEvent) {
	const { params } = event
	const paramsParser = memberId.safeParse(params.id)
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (paramsParser.data != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "delete_banking"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const banking = await db.delete(bankingInfo).where(eq(bankingInfo.memberId, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking[0]}, { status: 200})
}
