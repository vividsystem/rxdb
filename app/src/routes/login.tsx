import { action, redirect, RouteDefinition } from "@solidjs/router";
import { createEffect, createSignal, onMount } from "solid-js";
import { authClient } from "~/lib/auth-client";
import Input from "~/components/Input";


export default function Login() {
  let inputRef: HTMLInputElement | undefined;
	const [email, setEmail] = createSignal("")
	onMount(() => {
		inputRef?.focus();
	})


	const login = async (email: string) => {
		const {error} =  await authClient.signIn.magicLink({
			email: email,
			callbackURL: "/dashboard",

			errorCallbackURL: "/error",
		})
		return error
	}

  return (
    <main class="w-full h-screen p-4 space-y-2 flex flex-col items-center">
			Login
			<form>
				<Input type="email" name="email" placeholder="name@example.com" value={email} setValue={setEmail} label={() => "Email"} />
				<button class="text-xl" onClick={async (e) => {
					e.preventDefault()
					const err = login(email())
					console.log(err)
				}}>Login</button>
			</form>
    </main>
  );
}
