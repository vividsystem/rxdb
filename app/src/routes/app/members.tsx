import { createAsync, query, redirect, RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import MemberTable from "~/components/MemberTable";
import { getRequestEvent } from "solid-js/web";
import { auth, getMemberFromUserId } from "~/lib/auth";
import { getPendingMembers, getVerifiedMembers } from "~/lib/db/wrapper/member";
import { hasPermission } from "~/lib/db/wrapper/permissions";


export const route = {
	preload: () => checkPermissionsAndGetMembers()
} satisfies RouteDefinition

// dont use export! this causes weird bundling issues with ssr?
const checkPermissionsAndGetMembers = query(async () => {
  "use server"
  const session = await auth.api.getSession({ headers: getRequestEvent()?.request.headers! });
  if (!session) {
    throw redirect("/login");
  }

	const member = await getMemberFromUserId(session.user.id)
	if(!member) {
		throw redirect("/login");
	}

	const allowed = await hasPermission(member.id, "view_members")
	if(!allowed) {
		throw redirect("/app")
	}


	const members = await getVerifiedMembers()

	const pending = await getPendingMembers()

  return { user: session.user, member: member, members: members, pending: pending};
}, "permissionCheck");

export default function MembersLayout() {
	const data = createAsync(() => checkPermissionsAndGetMembers());

  return (
		<>
			<div class="w-4/5 h-screen">
				<Show when={data.latest} fallback={"Loading..."}>
					<MemberTable members={data.latest!.members} pendingMembers={data()!.pending}/>
				</Show>
			</div>
			
		</>
  );
}
