import { members } from "../../../drizzle/schema";
import { json } from "@solidjs/router";
import z from "zod";
import { db } from "~/lib/db";
import { createMemberInput } from "~/lib/validation/member";
import type { APIEvent } from "@solidjs/start/server";

export async function POST({ request }: APIEvent) {
	const body = await request.json();
  const result = createMemberInput.safeParse(body);

	if (!result.success) {
    return json({ errors: z.formatError(result.error) }, { status: 400 });
  }

	const member = await db.insert(members).values(result.data).returning()

	return json({ member: member[0] }, { status: 201 })
}
