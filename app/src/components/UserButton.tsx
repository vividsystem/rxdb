import { DropdownMenu } from "@kobalte/core";
import { A, useNavigate } from "@solidjs/router";
import { User } from "lucide-solid";
import { authClient } from "~/lib/auth-client";

export function UserButton() {
	const session = authClient.getSession();
	const navigate = useNavigate();
	return (
				<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div class="flex items-center justify-center px-4">
						<User />
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content class="container text-2xl">
						<DropdownMenu.Item class="">
							<A href="/app/settings">
								Settings
							</A>
						</DropdownMenu.Item>
						<DropdownMenu.Separator class="my-2 "/>
						<DropdownMenu.Item class="text-red-700">
							<button class="" onClick={() => {
								authClient.signOut();
								navigate("/login")
							}}>
								Sign-out
							</button>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
	)
}
