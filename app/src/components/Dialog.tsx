import { Dialog as KobalteDialog } from "@kobalte/core/dialog";
import { Plus, X } from "lucide-solid";
import { JSX, ParentProps } from "solid-js";

interface DialogProps {
	trigger: JSX.Element
	onOpenChange?: (open: boolean) => void
}
export default function Dialog(props: ParentProps<DialogProps>) {
	return (
		<KobalteDialog onOpenChange={props.onOpenChange}>
			<KobalteDialog.Trigger class="">
				{props.trigger}
			</KobalteDialog.Trigger>
			<KobalteDialog.Portal>
				<KobalteDialog.Overlay class="fixed z-50 top-0 bottom-0 left-0 right-0 backdrop-blur-md"/>

				<div class="fixed z-50 inset-0 flex justify-center items-center">
				<KobalteDialog.Content>
							<div class="isolate border-2 border-black p-4 w-fit bg-white shadow-xl shadow-gray-400 relative">
							<KobalteDialog.CloseButton class="absolute right-0 top-0 p-4">
									<X class="size-8"/>
							</KobalteDialog.CloseButton>
							<KobalteDialog.Title /> 
							<KobalteDialog.Description /> 
								{props.children}
							</div>
				</KobalteDialog.Content>
				</div>
			</KobalteDialog.Portal>
		</KobalteDialog>
	)
}
