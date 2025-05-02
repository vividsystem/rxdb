import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { getMembers } from "~/api";
import Table from "~/components/Table";

export const route = {
  preload() {
    getMembers();
  }
} satisfies RouteDefinition;

export default function Home() {
  const members = createAsync(async () => getMembers(), { deferStream: true }); 
  return (
    <main class="w-full p-4 space-y-2">
			<Suspense fallback={"Loading..."}>
				<Show when={members()}>

					<Table data={members()} />
				</Show>
			</Suspense>
    </main>
  );
}
