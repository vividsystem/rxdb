import { createAsync, query, redirect, RouteDefinition } from "@solidjs/router";
import { createResource, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import MemberTable from "~/components/MemberTable";
import { getMembers, getPendingMembers } from "~/lib/api/members";
import { BankingContext } from "~/lib/contexts/banking";
import { MemberContext } from "~/lib/contexts/member";
import { BankingInfo } from "~/lib/validation/banking";
import { Member } from "~/lib/validation/member";
import { useAlerts } from "~/lib/contexts/alerts";
import { APIError } from "~/lib/api/errors";
import { warn } from "console";
import { getRequestEvent, isServer } from "solid-js/web";
import { auth, getMemberFromUserId } from "~/lib/auth";
import { hasPermission } from "~/lib/auth/roles";


export const getProtected = query(async () => {
  "use server"
  const session = await auth.api.getSession({ headers: getRequestEvent()?.request.headers! });
  if (!session) {
    throw redirect("/login");
  }

	const member = await getMemberFromUserId(session.user.id)
	if(!member) {
		throw redirect("/login")
	}

	const allowed = await hasPermission(member.id, "view_members")
	if(!allowed) {
		throw redirect("/app")
	}

  return { user: session.user, member: member };
}, "protectedData");

export default function MembersLayout() {
	const data = createAsync(async () => getProtected());
	const { addAlert } = useAlerts();
	const [members] = createResource(async () => {
		if(isServer) return
		try {
			return await getMembers()
		} catch (e) {
			const apiError = e as APIError
			addAlert({ title: "Something went wrong", message: apiError.message, type: "error"})
			throw e
		}
	})
	const [pending] = createResource(async () => {
		if(isServer) return
		try {
			return await getPendingMembers()
		} catch (e) {
			const apiError = e as APIError
			addAlert({ title: "Something went wrong", message: apiError.message, type: "error"})
			throw e
		}
	})
	const [member, setMember] = createStore<Partial<Member>>({})
	const [banking, setBanking] = createStore<Partial<BankingInfo>>({})

  return (
		<>
			<div class="w-4/5 h-screen">
				<MemberContext.Provider value={{member, setMember}}>
				<BankingContext.Provider value={{banking, setBanking}}>
					<Suspense fallback={"Loading..."}>
						<MemberTable members={members()} pendingMembers={pending()}/>
					</Suspense>
				</BankingContext.Provider>
				</MemberContext.Provider>
			</div>
			
		</>
  );
}
