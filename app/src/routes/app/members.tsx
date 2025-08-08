import { A, createAsync, query, RouteDefinition } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import { MemberAddDialog } from "~/components/MemberDialog";
import MemberTable from "~/components/MemberTable";
import { getMembers } from "~/lib/api/members";
import { BankingContext } from "~/lib/contexts/banking";
import { MemberContext } from "~/lib/contexts/member";
import { BankingInfo } from "~/lib/validation/banking";
import { Member } from "~/lib/validation/member";


export const route = {
  preload() {}
} satisfies RouteDefinition;

const membersQuery = query(async (_prev) => await getMembers(), "members"); 

export default function MembersLayout() {
	const members = createAsync(membersQuery)
	const [member, setMember] = createStore<Partial<Member>>({})
	const [banking, setBanking] = createStore<Partial<BankingInfo>>({})

  return (
		<>
			<div class="w-4/5 h-screen">
				<MemberContext.Provider value={{member, setMember}}>
				<BankingContext.Provider value={{banking, setBanking}}>
					<div class="w-full flex flex-row justify-between py-4">
						<h1 class="text-5xl w-fit">Members</h1>
						<MemberAddDialog />
					</div>
					<Suspense fallback={"Loading..."}>
						<div class="w-full h-4/5 overflow-scroll overflow-y-scroll drop-shadow-xl drop-shadow-gray-400 rounded-md">	
							<MemberTable members={members() ?? []}/>
						</div>
					</Suspense>
				</BankingContext.Provider>
				</MemberContext.Provider>
			</div>
			
		</>
  );
}
