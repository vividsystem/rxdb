import { A, RouteSectionProps, useLocation } from "@solidjs/router";
import { Landmark, User, Users } from "lucide-solid";


export default function SettingsPageLayout(props: RouteSectionProps) {
	const location = useLocation();
	return (
		<div class="flex flex-row justify-start items-baseline w-full h-full">
		<nav class="w-1/4 flex flex-col items-baseline justify-start border-r h-full" >
			<A href="/app/settings/personal" class="flex flex-row justify-center items-center p-2 text-lg rounded-sm" classList={{"bg-gray-200": location.pathname == "/app/settings/personal"}}> <User class="color-black size-8" /><span>Personal Information</span></A>

			<A href="/app/settings/banking" class="flex flex-row justify-center items-center p-2 text-lg rounded-sm" classList={{"bg-gray-200": location.pathname == "/app/settings/banking"}}> <Landmark class="color-black size-8" /><span>Banking</span></A>
			<A href="/app/settings/membership" class="flex flex-row justify-center items-center p-2 text-lg rounded-sm" classList={{"bg-gray-200": location.pathname == "/app/settings/membership"}}> <Users class="color-black size-8" /><span>Membership</span></A>
		</nav>
		<main class="w-full p-4">
			{props.children}
		</main>
		</div>
	) 
}
