import { query, redirect } from "@solidjs/router";
import { auth, getMemberFromUserId } from "../auth";
import { getRequestEvent } from "solid-js/web";
import { getMemberPermissions } from "../auth/roles";

export const getProtectedData = query(async () => {
  "use server"
  const session = await auth.api.getSession({ headers: getRequestEvent()?.request.headers! });
  if (!session) {
    throw redirect("/login");
  }

	const member = await getMemberFromUserId(session.user.id)
	if(!member) {
		throw redirect("/onboarding")
	}


	const perms = await getMemberPermissions(member.id)

  return { user: session.user, member: member, permissions: perms };
}, "protectedData");

