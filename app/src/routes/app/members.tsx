import { RouteDefinition } from "@solidjs/router";
import { Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import MemberTable from "~/components/MemberTable";
import { BankingContext } from "~/lib/contexts/banking";
import { MemberContext } from "~/lib/contexts/member";
import { BankingInfo } from "~/lib/validation/banking";
import { Member } from "~/lib/validation/member";


export const route = {
  preload() {}
} satisfies RouteDefinition;


export default function MembersLayout() {
	const [member, setMember] = createStore<Partial<Member>>({})
	const [banking, setBanking] = createStore<Partial<BankingInfo>>({})

  return (
		<>
			<div class="w-4/5 h-screen">
				<MemberContext.Provider value={{member, setMember}}>
				<BankingContext.Provider value={{banking, setBanking}}>
					<Suspense fallback={"Loading..."}>
						<MemberTable />
					</Suspense>
				</BankingContext.Provider>
				</MemberContext.Provider>
			</div>
			
		</>
  );
}
