import { createEffect, createSignal } from "solid-js";
import { Member, NewBanking, NewMember } from "~/api/server";
import { updateMember, deleteMember, addMember} from "~/api";
import { X } from "lucide-solid";
import { useSubmission } from "@solidjs/router";
import PopUp, { PopUpProps } from "./Popup";
import MemberInputs from "./MemberInputs";
import BankingInputs from "./BankingInputs";

interface MemberPopUpProps {
	member: Member
	onClose: () => void
}



export function MemberEditPopUp(props: MemberPopUpProps) {
	const submissionSave = useSubmission(updateMember);
	const submissionDelete = useSubmission(deleteMember);
	const [member, setMember] = createSignal<NewMember>(props.member);

	return (
		<PopUp onClose={props.onClose} >
				<form method="post">
					<div class="absolute right-0 top-0 p-4" onClick={props.onClose}>
						<X class="size-8"/>
					</div>
					<div class="flex flex-col">


					<MemberInputs member={props.member} setMember={setMember}/>

					<div class="flex flex-row gap-2 py-4">
						<input type="submit" value={submissionSave.pending ? "Saving" : "Save"} class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400" onSubmit={(e) => e.preventDefault()} formaction={updateMember.with(props.member.id, member())}/>
						<input type="submit" value={submissionDelete.pending ? "Deleting" : "Delete"} class="py-2 px-4 border-1 border-red-200 shadow-md shadow-red-400 bg-red-400" onSubmit={(e) => {
							e.preventDefault()
						}} formaction={deleteMember.with(props.member.id)}/>
					</div>
					</div>
				</form>
		</PopUp>
	)	
}

export function MemberCreatePopUp(props: PopUpProps) {
	const submissionCreate = useSubmission(addMember);
	const [member, setMember] = createSignal<NewMember>({ firstname: "", lastname: "" });
	const [banking, setBanking] = createSignal<NewBanking>({});


	const [executed, setExecuted] = createSignal(false);

	createEffect(() => {
		if(!executed() && submissionCreate.pending) {
			setExecuted(true)
		} else if(executed() && !submissionCreate.pending) {
			setMember({ firstname: "" ,lastname: ""})
			setBanking({})
			setExecuted(false)
			props.onClose()
		}
	})

	return (
		<PopUp onClose={props.onClose}>
				<form method="post">
					<div class="absolute right-0 top-0 p-4" onClick={props.onClose}>
						<X class="size-8"/>
					</div>
					<div class="flex flex-col">


					<div>
						<MemberInputs member={member()} setMember={setMember}/>
					</div>
					<div>
						<BankingInputs banking={banking()} setBanking={setBanking}/>
					</div>

					<div class="flex flex-row gap-2 py-4">
						<input type="submit" value={submissionCreate.pending ? "Creating" : "Create"} class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400" onSubmit={(e) => {
							e.preventDefault()}

						} formaction={addMember.with(member(), banking())}/>
					</div>
					</div>
				</form>
		</PopUp>
	)
}
