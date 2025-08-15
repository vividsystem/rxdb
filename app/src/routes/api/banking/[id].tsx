import { bankingInfo } from "../../../../drizzle/schema";
import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { requireUser } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";
import { db } from "~/lib/db";
import { bankingId, updateBankingSchema } from "~/lib/validation/banking";

export async function GET(event: APIEvent) {
	const { params } = event
	const paramsParser = bankingId.safeParse(Number(params.id))
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const banking = await db.select().from(bankingInfo).where(eq(bankingInfo.id, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (banking[0].memberId != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "view_banking"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	return json({ banking: banking[0] }, { status: 200 })

}


export async function PATCH(event: APIEvent) {
	const { request, params } = event
	const paramsParser = bankingId.safeParse(Number(params.id))
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const res = await db.select({memberId: bankingInfo.memberId}).from(bankingInfo).where(eq(bankingInfo.id, paramsParser.data))

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (res[0].memberId != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "edit_banking"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const body = await request.json()
	const bodyParser = updateBankingSchema.safeParse(body)
	if(!bodyParser.success) {
    return json({ errors: z.formatError(bodyParser.error) }, { status: 400 });
	}

	const banking = await db.update(bankingInfo).set(bodyParser.data).where(eq(bankingInfo.id, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking[0]}, { status: 200})
}

export async function DELETE(event: APIEvent) {
	const { params } = event
	const paramsParser = bankingId.safeParse(Number(params.id))
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const res = await db.select({memberId: bankingInfo.memberId}).from(bankingInfo).where(eq(bankingInfo.id, paramsParser.data))

	const loggedInUser = await requireUser(event)
	// user logged in and with perms
	if(!loggedInUser 
		|| (res[0].memberId != loggedInUser.member.id && !hasPermission(loggedInUser.member.id, "delete_banking"))) {
		return json({ message: "Unauthorized" }, { status: 401 })
	}

	const banking = await db.delete(bankingInfo).where(eq(bankingInfo.id, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking[0]}, { status: 200})
}
