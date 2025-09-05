import { members } from "@/schema";
import { createAsync, query, redirect } from "@solidjs/router";
import { eq, or } from "drizzle-orm";
import { getRequestEvent } from "solid-js/web";
import { UserButton } from "~/components/UserButton";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";

const checkLoginAndMemberExistance = query(async () => {
	"use server"
	const session = await auth.api.getSession({ headers: getRequestEvent()?.request.headers! });
	if (!session) {
		throw redirect("/login");
	}

	const res = await db.select().from(members).where(or(
		eq(members.userId, session.user.id),
		eq(members.email, session.user.email)
	))
	if(res.length == 0) {

		throw redirect("/onboarding")
	}

	// necessary even with after hook in better-auth because of seeding?
	if(res[0].userId == null) {
		await db.update(members).set({ userId: session.user.id}).where(eq(members.email, session.user.email))
	}

	return { user: session.user, member: res[0]};
}, "protectedData");
export default function OnboardingSuccess() {
	const data = createAsync(() => checkLoginAndMemberExistance())
	return (
			<>
			<header class="flex flex-col-reverse w-full">
				<UserButton />
			</header>
	    <main class="w-full h-screen p-4 space-y-2 flex justify-center items-center">
			<div class="container text-2xl w-fit">
				<h1 class="text-5xl block p-4">Please wait to be approved!</h1>	
				<p class="p-4">
					A member of our team is going to review your application shortly.
				</p>
			</div>
		</main>	
		</>
	)

}
