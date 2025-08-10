import { A, RouteSectionProps } from "@solidjs/router";

export default function Index(props: RouteSectionProps) {
  return (
		<>

			<A href="/login" class="px-4">Login</A>
			<A href="/app" class="px-4">Go to the app</A>
		</>
  );
}
