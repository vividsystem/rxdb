import { createAsync } from "@solidjs/router";
import { createEffect, createSignal, JSX, Show } from "solid-js";
import z from "zod";
import { OnboardingMemberInputs } from "~/components/MemberInputs";
import { updateMember } from "~/lib/api/members";
import { getProtectedData } from "~/lib/queries/basicProtected";
import { Member, updateMemberSchema } from "~/lib/validation/member";


export default function PersonalSettings() {
	const data = createAsync(() => getProtectedData())	
	const [localMember, setLocalMember] = createSignal<Partial<Member> | undefined>()


	const handleUpdate: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent, JSX.EventHandler<HTMLFormElement, SubmitEvent>> = async (e) => {
		e.preventDefault()
		if(!data.latest || !localMember()) {
			return
		}
		const memberParser = updateMemberSchema.safeParse(localMember())
		if(!memberParser.success) {
			for (let l of (z.prettifyError(memberParser.error).split("✖"))) {
				//addAlert({ title: l, type: "error"})
				console.error(l)
			}
			return
		}



		await updateMember(data.latest.member.id, localMember()!)
	}

	createEffect(() => {
		console.log(data())
		if(data()) {
			setLocalMember(data()!.member)
		}
	})

	return (<>
		<Show when={localMember()} fallback={"Loading..."}>
			<form onSubmit={handleUpdate}>
				<OnboardingMemberInputs member={localMember()!} setMember={setLocalMember}/>
				<button class="p-4 container text-2xl" type="submit">Edit</button>
			</form>
		</Show>
	</>)
}
