import { Accessor, ParentProps, Setter, Show } from "solid-js";
import { Portal } from "solid-js/web";

export interface PopUpProps {
	onClose: () => void
}
function PopUp(props: ParentProps<PopUpProps>) {
	return (
		<Portal>
			
			<div class="fixed top-0 left-0 right-0 bottom-0">
				<div class="fixed z-40 top-0 bottom-0 left-0 right-0 backdrop-blur-md" onClick={() => props.onClose()}>
				</div>
				<div class="flex justify-center items-center min-h-screen">

					<div class="z-50 border-2 border-black p-4 w-fit bg-white shadow-xl shadow-gray-400 relative">
						{props.children}
					</div>
				</div>
			</div>
		</Portal>
	)
}

export default PopUp
