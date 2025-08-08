import { bankingInfo } from "../../../../drizzle/schema";
import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/lib/db";
import { bankingId, updateBankingSchema } from "~/lib/validation/banking";

export async function GET({ params }: APIEvent) {
	const paramsParser = bankingId.safeParse(Number(params.id))
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const banking = await db.select().from(bankingInfo).where(eq(bankingInfo.id, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking[0] }, { status: 200 })

}


export async function PATCH({ request, params }: APIEvent) {
	const paramsParser = bankingId.safeParse(Number(params.id))
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
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

export async function DELETE({ request, params }: APIEvent) {
	const paramsParser = bankingId.safeParse(Number(params.id))
	if(!paramsParser.success) {
    return json({ errors: z.formatError(paramsParser.error) }, { status: 400 });
	}

	const banking = await db.delete(bankingInfo).where(eq(bankingInfo.id, paramsParser.data))
	if(banking.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ banking: banking[0]}, { status: 200})
}
