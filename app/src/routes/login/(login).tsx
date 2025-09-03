import { createEffect, createSignal, onMount } from "solid-js";
import { authClient } from "~/lib/auth-client";
import Input from "~/components/Input";
import { useNavigate } from "@solidjs/router";


export default function Login() {
  let inputRef: HTMLInputElement | undefined;
	const navigate = useNavigate();
	const [email, setEmail] = createSignal("")
	onMount(() => {
		inputRef?.focus();
	})


	const login = async (email: string) => {
		const {error} =  await authClient.signIn.magicLink({
			email: email,
			callbackURL: "/app",
			newUserCallbackURL: "/onboarding",
			errorCallbackURL: "/error",
		})
		if(error) {
			return error
		} else {
			navigate("/login/wait")	
		}
	}

  return (
    <main class="w-full h-screen p-4 space-y-2 flex justify-center items-center">
			<div class="container">
				<h1 class="text-2xl">Login or sign-up</h1>
				<form class="flex flex-col jusitfy-start gap-4">
					<Input type="email" name="email" placeholder="name@example.com" value={email} setValue={setEmail} label={() => "Email"} />
					<button class="w-fit btn text-2xl" onClick={async (e) => {
						e.preventDefault()
						const err = await login(email())
						console.log(err)
					}}>Login</button>
				</form>
			</div>
    </main>
  );
}
