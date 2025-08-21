"use server";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "../db";
import { sendMagicMail } from "../mail";
import { account, user, session, verification } from "../../../drizzle/schema-auth"
import { members } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";
import type { APIEvent } from "@solidjs/start/server";

export const auth = betterAuth({
	databaseHooks: {
		user: {
			create: {
				before: async (user, _ctx) => {
					const member = await db.select().from(members).where(eq(members.email, user.email))
					if(member.length < 1) {
						throw new APIError("UNAUTHORIZED", {
							message: "User must be member of the club to sign up"
						})
					}
					return { data: user }
				},
				after: async (user) => {
					db.update(members).set({ userId: user.id }).where(eq(members.email, user.email))
				}
			}
		}
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user: user,
			verification: verification,
			account: account,
			session: session
		}
	}),
  plugins: [
    magicLink({
      expiresIn: 600, // optional, link lives 10 min
      disableSignUp: process.env.NODE_ENV !== "development",
      sendMagicLink: async ({ email, url }, _req) => {
				await sendMagicMail(email, url)
      },
    }),
  ],
});

export async function getMemberFromUserId(userId: string) {
	const res = await db.select().from(members).where(eq(members.userId, userId))
	if(res.length < 1) {
		return
	}

	return res[0]
}

export async function requireUser(event: APIEvent) { 
	const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (!session?.user) {
		return
  }
	
	const member = await db.select().from(members).where(eq(members.email, session.user.email))
	if(member.length < 1) {
		return
	}

  return {user: session.user, member: member[0]};
}
