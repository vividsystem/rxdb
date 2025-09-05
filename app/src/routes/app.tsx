import { A, createAsync, RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js/web";
import { UserButton } from "~/components/UserButton";
import { includesPermission } from "~/lib/auth/utils";
import { getProtectedData } from "~/lib/queries/basicProtected";


export default function AppLayout(props: RouteSectionProps) {
	const data = createAsync(() => getProtectedData());
  return (
		<>
			<header class="flex flex-row justify-between w-full p-4 text-2xl">
				<h1><A href="/app">rxdb</A></h1>
				<nav class="flex flex-row divide-x-2 divide-gray-700">
					<Show when={data.latest?.permissions && includesPermission(data.latest?.permissions, "view_members")}>	
						<A href="/app/members" class="px-4">Member Table</A>
					</Show>
					<UserButton/>
				</nav>
			</header>
			<main class="w-full h-screen p-4 space-y-2 flex flex-col items-center">
				{props.children}
			</main>
		</>
  );
}
