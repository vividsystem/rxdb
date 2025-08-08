import { members } from "../../../drizzle/schema";
import { json } from "@solidjs/router";
import { db } from "~/lib/db";

export async function GET() {

	const allMembers = await db.select().from(members).catch((e) => {
		throw e
	});
	
	return json({members: allMembers}, {status: 200})
}
