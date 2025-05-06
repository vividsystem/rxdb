import { Accessor, Setter } from "solid-js";
import Input from "./Input";
import { BankingInfo, NewBanking } from "~/api/server";

interface BankingInputsProps {
	banking: NewBanking
	setBanking: Setter<NewBanking>
}
export default function BankingInputs(props: BankingInputsProps) {
	return (
		<>
					<div class="flex flex-row gap-2">
						<Input type="text" name="firstname" 
							placeholder="Max" label={() => "Firstname"}
							value={() => props.banking.firstname ?? undefined} 
							setValue={(fn: string) => props.setBanking({...props.banking, firstname: fn})}	
							class="w-64"
						/>
						<Input type="text" name="lastname" 
							placeholder="Mustermann" label={() => "Lastname"}
							value={() => props.banking.lastname ?? undefined} 
							setValue={(ln: string) => props.setBanking({...props.banking, lastname: ln})}	
							class="w-64"
						/>
					</div>
					<div class="flex flex-row gap-2">
						<Input type="text" name="iban" 
							placeholder="DE00 0000 0000 0000 0000 00" label={() => "IBAN"}
							value={() => props.banking.IBAN ?? undefined} 
							setValue={(v: string) => props.setBanking({...props.banking, IBAN: v.replace(" ", "")})}	
							class="w-64"
						/>
						<Input type="text" name="bic" 
							placeholder="" label={() => "BIC"}
							value={() => props.banking.BIC ?? undefined} 
							setValue={(v: string) => props.setBanking({...props.banking, BIC: v})}	
							class="w-64"
						/>
					</div>
		</>
	)
}
