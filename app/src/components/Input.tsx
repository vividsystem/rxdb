import { JSX } from "solid-js"

interface InputProps {
	name: string
	placeholder: string
	type: JSX.InputHTMLAttributes<HTMLInputElement>["type"]
	label: () => JSX.Element
	value: () => Required<JSX.InputHTMLAttributes<HTMLInputElement>["value"]>
	setValue: (val: string) => void

	opts?: Partial<Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "value">>
	class?: string
}
function Input(props: InputProps) {

	return (
		<div class={"flex flex-col justify-items-start"+" "+props.class}>
			<label for={props.name} class="font-bold px-2 py-1 h-fit">{props.label()}</label>
			<input name={props.name} placeholder={props.placeholder} type={props.type} value={props.value()} onChange={(ev) => props.setValue(ev.currentTarget.value)} 
				class="py-2 px-4 border-1 border-gray-200 shadow-gray-400 shadow-md"{...props.opts}
			/>
		</div>
	)
}

export default Input
