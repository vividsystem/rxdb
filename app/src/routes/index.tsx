import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main class="w-full h-screen p-4 space-y-2 flex flex-col items-center">
			<A href="/members">Members</A>
    </main>
  );
}
