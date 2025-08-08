
import { members } from "../../../../drizzle/schema";
import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "~/lib/db";
import { createMemberInput, memberId, updateMemberInput } from "~/lib/validation/member";
export async function GET({ params }: APIEvent) {
	const idResult = memberId.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }
	const res = await db.select().from(members).where(eq(members.id, idResult.data))
	if(res.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}


	return json({
		member: res[0],
	}, { status: 200 })
}

export async function PATCH({ request, params }: APIEvent) {
	const idResult = memberId.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }

	const body = await request.json();
  const bodyResult = updateMemberInput.safeParse(body);

	if (!bodyResult.success) {
    return json({ errors: z.formatError(bodyResult.error) }, { status: 400 });
  }

	const member = await db.update(members).set(bodyResult.data).where(eq(members.id, idResult.data)).returning()
	if(member.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}

	return json({ member: member[0]}, { status: 200 })
}

export async function DELETE({ params }: APIEvent) {
	const idResult = memberId.safeParse(params.id);

	if (!idResult.success) {
    return json({ errors: z.formatError(idResult.error) }, { status: 400 });
  }

	const res = await db.delete(members).where(eq(members.id, idResult.data))
	if(res.length < 1) {
		return json({message: "Not found"}, {status: 404})
	}


	return json({
		member: res[0],
	}, { status: 200 })
}
