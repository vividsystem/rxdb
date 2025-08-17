import { createResource, createSignal } from "solid-js"
import z from "zod"
import { createBanking, getBankingFromMemberId, updateBankingInformation } from "~/lib/api/banking"
import { BankingInfo, createBankingSchema, updateBankingSchema } from "~/lib/validation/banking"
import Dialog from "./Dialog"
import { MousePointer2 } from "lucide-solid"
import BankingInputs from "./BankingInputs"
import { memberId } from "~/lib/validation/member"
import { APIError } from "~/lib/api/errors"

interface BankingEditDialogProps {
	memberId: z.infer<typeof memberId>
}
export function BankingEditDialog(props: BankingEditDialogProps) {
  const [banking] = createResource(
    () => props.memberId, 
		(id: z.infer<typeof memberId>) => {
  	return getBankingFromMemberId(id)
		}
  )
	const [localBanking, setLocalBanking] = createSignal<Partial<BankingInfo> | undefined>(banking.latest)
	const [loading, setLoading] = createSignal(false)
	const [finished, setFinished] = createSignal(false)


	const update = async () => {
		setFinished(false)
		setLoading(true)
		if(banking.error && (banking.error as APIError).status == 404) {

			const parser = createBankingSchema.omit({memberId: true}).safeParse(localBanking())
			if(!parser.success) {
				setLoading(false)
				throw (z.formatError(parser.error))
			}
			await createBanking({...parser.data, memberId: props.memberId})
		} else {
			const parser = updateBankingSchema.omit({memberId: true}).safeParse(localBanking())
			if(!parser.success) {
				setLoading(false)
				throw (z.formatError(parser.error))
			}
			await updateBankingInformation(banking.latest!.id, parser.data)
		}
		setLoading(false)
		setFinished(true)
		return
	}



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
		} onOpenChange={(open) => {
			if(open) {
				setFinished(false)
				setLoading(false)
			}
		}}>
				
			<form>
				<BankingInputs banking={banking()} setBanking={setLocalBanking}/>
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
