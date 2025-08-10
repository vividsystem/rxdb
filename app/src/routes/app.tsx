import { A, RouteSectionProps } from "@solidjs/router";
import { UserButton } from "~/components/UserButton";

export default function AppLayout(props: RouteSectionProps) {
  return (
		<>

		<header class="flex flex-row justify-between w-full p-4 text-2xl">
			<h1><A href="/app">rxdb</A></h1>
			<nav class="flex flex-row divide-x-2 divide-gray-700">
				<A href="/app/members" class="px-4">Member Table</A>
				<UserButton/>
			</nav>
		</header>
    <main class="w-full h-screen p-4 space-y-2 flex flex-col items-center">
			{props.children}
    </main>
		</>
  );
}
