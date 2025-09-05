import { createAsync, query, redirect, RouteDefinition } from "@solidjs/router";
import { createEffect, createSignal, JSX, Show } from "solid-js";
import { getRequestEvent } from "solid-js/web";
import z from "zod";
import BankingInputs from "~/components/BankingInputs";
import { updateBankingInformation } from "~/lib/api/banking";
import { auth, getMemberFromUserId } from "~/lib/auth";
import { getBankingByMemberId } from "~/lib/db/wrapper/banking";
import { updateBankingSchema } from "~/lib/validation/banking";



export const route = {
	preload: () => getBanking()
} satisfies RouteDefinition

const getBanking = query(async () => {
  "use server"
  const session = await auth.api.getSession({ headers: getRequestEvent()?.request.headers! });
  if (!session) {
    throw redirect("/login");
  }

	const member = await getMemberFromUserId(session.user.id)
	if(!member) {
		throw redirect("/onboarding")
	}


	const banking = await getBankingByMemberId(member.id)

  return { user: session.user, member: member, banking: banking };
}, "protectedBankingSettings");


type PartialWithNull<T> = {
  [P in keyof T]?: T[P] | null;
};

export default function BankingSettings() {
	const data = createAsync(() => getBanking())

	const [localBanking, setLocalBanking] = createSignal()

	const handleUpdate: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent, JSX.EventHandler<HTMLFormElement, SubmitEvent>> = async (e) => {
		e.preventDefault()
		if(!data.latest || !localBanking()) {
			return
		}
		const memberParser = updateBankingSchema.safeParse(localBanking())
		if(!memberParser.success) {
			for (let l of (z.prettifyError(memberParser.error).split("✖"))) {
				//addAlert({ title: l, type: "error"})
				console.error(l)
			}
			return
		}



		await updateBankingInformation(data.latest.member.id, localBanking()!)
	}
	createEffect(() => {
		if(data()?.banking) {
			setLocalBanking(data()!.banking)
		}
	})
	//stuck in loading...
	return (<>
		<main class="p-4">
		<Show when={localBanking()} fallback={"Loading..."}>
			<form onSubmit={handleUpdate}>
			<BankingInputs banking={localBanking()!} setBanking={setLocalBanking}/>	
			<button class="p-4 container text-2xl" type="submit">Edit</button>
			</form>
		</Show>
		</main>
	</>)

}
