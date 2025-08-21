import { A, createAsync, query, redirect, RouteSectionProps } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { AlertProvider } from "~/components/AlertProvider";
import { UserButton } from "~/components/UserButton";
import { auth, getMemberFromUserId } from "~/lib/auth";


const getProtectedData = query(async () => {
  "use server"
  const session = await auth.api.getSession({ headers: getRequestEvent()?.request.headers! });
  if (!session) {
    throw redirect("/login");
  }

	const member = await getMemberFromUserId(session.user.id)
	if(!member) {
		throw redirect("/login")
	}

  return { user: session.user, member: member };
}, "protectedData");

export default function AppLayout(props: RouteSectionProps) {
	const data = createAsync(() => getProtectedData());
  return (
		<>
			<AlertProvider>
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
			</AlertProvider>
		</>
  );
}
