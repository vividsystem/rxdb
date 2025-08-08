import Dialog from "./Dialog";
import MemberInputs from "./MemberInputs";
import BankingInputs from "./BankingInputs";
import { createMemberWithBanking, updateMember } from "../lib/api/members"
import { useContext, JSX, createSignal } from "solid-js";
import { MemberContext } from "~/lib/contexts/member";
import { BankingContext } from "~/lib/contexts/banking";
import { memberSchema, createMemberInput, Member } from "~/lib/validation/member";
import z from "zod";
import { createBankingSchema } from "~/lib/validation/banking";
import { Pencil, Plus } from "lucide-solid";
import { action, useSubmission } from "@solidjs/router";
import { createStore } from "solid-js/store";


export function MemberAddDialog() {
	const [member, setMember] = createStore<Partial<Member>>({});

	const {banking} = useContext(BankingContext);
	const handleCreation: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent, JSX.EventHandler<HTMLFormElement, SubmitEvent>> = async (e) => {
		e.preventDefault()
		const memberParser = createMemberInput.omit({bankingId: true}).safeParse(member)
		if(!memberParser.success) {
			throw (z.formatError(memberParser.error))
		}

		const bankingParser = createBankingSchema.safeParse(banking)
		if(!bankingParser.success) {
			throw (z.formatError(bankingParser.error))
		}

		const res = await createMemberWithBanking(memberParser.data, bankingParser.data)
		console.log(res)
	}
	return (
		<Dialog trigger={(
			<div class="w-fit px-4 py-4 border-gray-200 shadow-gray-400 shadow-md">
				<Plus />
			</div>
		)}>
			<form  onSubmit={handleCreation}>
				<div class="flex flex-col">

					<div>
						<MemberInputs member={member} setMember={setMember}/>
					</div>
					<div>
						<BankingInputs />
					</div>

					<div class="flex flex-row gap-2 py-4">
						<button type="submit" class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400">Create</button>
					</div>
				</div>
			</form>
		</Dialog>
	)
}


export function MemberEditDialog() {
	const {member} = useContext(MemberContext)
	const [localMember, setLocalMember] = createSignal(member)

	const update = action(async () => {
		console.log("UPDATE")
		const parser = memberSchema.omit({bankingId: true}).safeParse(localMember())
		if(!parser.success) {
			throw (z.formatError(parser.error))
		}
		const {id, ...rest} = parser.data
		return await updateMember(id, rest)
	})
	const submission = useSubmission(update)
	return (
		<Dialog trigger={
			<Pencil />		
		}>
			<form method="post" action={update}>
				<MemberInputs member={localMember()} setMember={setLocalMember}/>
				<div class="flex flex-row gap-2 py-4">
					<button type="submit" class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400" onClick={(e) => {
						//e.preventDefault()
					}}>{submission.pending ? "Editing": "Edit"}</button>
				</div>
			</form>
		</Dialog>
	)
}
