import { members } from "@/schema";
import { createAsync, query, redirect, RouteDefinition, useNavigate } from "@solidjs/router";
import { eq, or } from "drizzle-orm";
import { JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { getRequestEvent } from "solid-js/web";
import z from "zod";
import BankingInputs from "~/components/BankingInputs";
import { OnboardingMemberInputs } from "~/components/MemberInputs";
import { createMemberWithBanking } from "~/lib/api/members";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { BankingInfo, createBankingSchema } from "~/lib/validation/banking";
import { Member, onboardingMemberSchema } from "~/lib/validation/member";

export const route = {
  preload() {}
} satisfies RouteDefinition;


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
	if(res.length != 0) {
		// necessary even with after hook in better-auth because of seeding?
		if(res[0].userId == null) {
			await db.update(members).set({ userId: session.user.id}).where(eq(members.email, session.user.email))
		}

		throw redirect("/app")
	}

	return { user: session.user };
}, "protectedData");


export default function Onboarding() {
	const navigate = useNavigate()
	const data = createAsync(() => checkLoginAndMemberExistance());
	const [member, setMember] = createStore<Partial<Member>>({});
	const [banking, setBanking] = createStore<Partial<BankingInfo>>({});
	const handleCreation: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent, JSX.EventHandler<HTMLFormElement, SubmitEvent>> = async (e) => {
		e.preventDefault()
		const memberParser = onboardingMemberSchema.safeParse({...member, userId: data.latest?.user.id, email: data.latest?.user.email})
		if(!memberParser.success) {
			for (let l of (z.prettifyError(memberParser.error).split("✖"))) {
				//addAlert({ title: l, type: "error"})
				console.error(l)
			}
			return
		}

		const bankingParser = createBankingSchema.omit({memberId: true}).safeParse(banking)
		if(!bankingParser.success) {
			for (let l of (z.prettifyError(bankingParser.error).split("✖"))) {
				//addAlert{ title: l, type: "error"})
				console.log(l)
			}
			return

		}

		await createMemberWithBanking(memberParser.data, bankingParser.data)
		navigate("/onboarding/success")

	}
	return (
		<div class="w-full h-screen p-4 space-y-2 flex justify-center items-center">
			<form onSubmit={handleCreation}>
				<div class="flex flex-col">

					<div>
						<OnboardingMemberInputs member={member} setMember={setMember}/>
					</div>
					<div>
						<BankingInputs banking={banking} setBanking={setBanking}/>
					</div>

					<div class="flex flex-row gap-2 py-4">
						<button type="submit" class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400">Create</button>
					</div>
				</div>
			</form>
		</div>
	)
}
