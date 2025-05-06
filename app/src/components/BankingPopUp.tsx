import { createEffect, createSignal, onMount, Show, Suspense } from "solid-js";
import PopUp, {PopUpProps} from "./Popup";
import { X } from "lucide-solid";
import { useSubmission } from "@solidjs/router";
import { getBanking } from "~/api";
import { BankingInfo, NewBanking } from "~/api/server";
import { updateBanking } from "~/api";

import BankingInputs from "./BankingInputs";

interface BankingPopUp extends PopUpProps {
	bankingId: number 
}

function BankingPopUp(props: BankingPopUp) {
	const [banking, setBanking] = createSignal<NewBanking>({ id: props.bankingId, 
		firstname: null,
		lastname: null,
		IBAN: null,
		BIC: null
	});

	createEffect(async () => {
		setBanking(await getBanking(props.bankingId))
	})

	const submission = useSubmission(updateBanking)

	return (
		<PopUp visible={props.visible} setVisible={props.setVisible}>
			<Show when={banking()} fallback={"Loading..."}>
			<form method="post">
					<div class="absolute right-0 top-0 p-4" onClick={() => props.setVisible(false)}>
						<X class="size-8"/>
					</div>
					
					<BankingInputs banking={banking()} setBanking={setBanking} />
		
					<div class="flex flex-row gap-2 py-4">
						<input type="submit" value={"Save"} class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400" onSubmit={(e) => e.preventDefault()} formaction={updateBanking.with(props.bankingId, banking()!)}/>
					</div>
			</form>
		</Show>
	</PopUp>
	)
}

export default BankingPopUp
