import { action, useSubmission } from "@solidjs/router"
import { createEffect, createSignal, useContext } from "solid-js"
import z from "zod"
import { updateBankingInformation } from "~/lib/api/banking"
import { BankingContext } from "~/lib/contexts/banking"
import { bankingSchema } from "~/lib/validation/banking"
import Dialog from "./Dialog"
import { MousePointer2 } from "lucide-solid"
import BankingInputs from "./BankingInputs"

interface BankingEditDialogProps {
}
export function BankingEditDialog(props: BankingEditDialogProps) {
	const {banking} = useContext(BankingContext)
	const [localBanking, setLocalBanking] = createSignal(banking)
	const [loading, setLoading] = createSignal(false)
	const [finished, setFinished] = createSignal(false)

	const update = async () => {
		console.log("UPDATE")
		setFinished(false)
		setLoading(true)
		const parser = bankingSchema.safeParse(localBanking())
		if(!parser.success) {
			setLoading(false)
			throw (z.formatError(parser.error))
		}
		const {id, ...rest} = parser.data
		await updateBankingInformation(id, rest)
		setLoading(false)
		setFinished(true)
		return
	}


	//const submission = useSubmission(update)

	const buttonMessage = () => {
		switch (true){
			case loading():
				return "Editing"
			case finished():
				return "Edited"
			case !(finished() || loading()):
				return "Edit"

		}
	}
	return (
		<Dialog trigger={
			<MousePointer2 />		
		}>
				
			<form>
				<BankingInputs banking={localBanking()} setBanking={setLocalBanking}/>
				<div class="flex flex-row gap-2 py-4">
					<button type="submit" class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400" onClick={async (e) => {
						e.preventDefault()
						return await update()
					}}>{buttonMessage()}</button>
				</div>
			</form>
		</Dialog>
	)
}
