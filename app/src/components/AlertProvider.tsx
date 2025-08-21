import { Toast, toaster } from "@kobalte/core/toast";
import { X } from "lucide-solid";
import { createSignal, ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";
import { Alert, AlertContext } from "~/lib/contexts/alerts";

export const AlertProvider: ParentComponent = (props) => {
  const addAlert = (alert: Omit<Alert, "id">) => {
		console.log("showing alert")
		toaster.show(props => (
			<Toast toastId={props.toastId} class="container">
					<div class="flex flex-row">
          <div >
            <Toast.Title class="">{alert.title}</Toast.Title>
            <Toast.Description class="">{alert.message}</Toast.Description>
          </div>
          <Toast.CloseButton class="">
            <X />
          </Toast.CloseButton>
        </div>
        <Toast.ProgressTrack class="">
          <Toast.ProgressFill class="" />
        </Toast.ProgressTrack>
      </Toast>
		))
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
			<Portal>
				<Toast.Region pauseOnInteraction limit={6}>
					<Toast.List class="fixed bottom-0 right-0 z-[9999] flex flex-col gap-4 p-4 w-96"/>
				</Toast.Region>
			</Portal>
      {props.children}
    </AlertContext.Provider>
  );
};
