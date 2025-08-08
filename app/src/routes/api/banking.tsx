import { bankingInfo } from "../../../drizzle/schema";
import { json } from "@solidjs/router";
import z from "zod";
import { db } from "~/lib/db";
import { createBankingSchema } from "~/lib/validation/banking";
import type { APIEvent } from "@solidjs/start/server";

export async function POST({ request }: APIEvent) {
	const body = await request.json()
	const bodyParser = createBankingSchema.safeParse(body)
	if(!bodyParser.success) {
    return json({ errors: z.formatError(bodyParser.error) }, { status: 400 });
	}
	
	const banking = await db.insert(bankingInfo).values(bodyParser.data).returning()

	return json({ banking: banking[0] }, { status: 201 })	
}
