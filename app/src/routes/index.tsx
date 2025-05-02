import { createAsync, type RouteDefinition } from "@solidjs/router";
import { createSignal, ParentProps, Show, Suspense } from "solid-js";
import { getMembers } from "~/api";
import { Member } from "~/api/server";
import { DateTime } from "~/components/DateTime";
import Table, { Column } from "~/components/Table";
import { AtSign, Calendar, Check, MapPin, Phone, X } from "lucide-solid";
import { MemberPopUp } from "~/components/MemberPopUp";

export const route = {
  preload() {
    getMembers();
  }
} satisfies RouteDefinition;

export default function Home() {
  const members = createAsync(async () => getMembers(), { deferStream: true }); 
	const [visible, setVisible] = createSignal(false);
	const [member, setMember] = createSignal<Member>({});


	const cols: Column<Member>[] = [
		{
			header: () => ("ID"),
			accessor: (item: Member) => (item.id),
		},
		{
			header: () => (<div class="flex flex-row gap-1 items-center"><Calendar class="size-4"/>Member since</div>),
			accessor: (item: Member) => (
				<Show when={item.member_since} fallback={"??-??-????"}>
					<DateTime date={item.member_since!}/>
				</Show>
			),
		},
		{
			header: () => ("First Name"),
			accessor: (item: Member) => (item.firstname),
		},
		{
			header: () => ("Last Name"),
			accessor: (item: Member) => (item.lastname)
		},
		{
			header: () => (<div class="flex flex-row gap-1 items-center"><Phone class="size-4"/>E-Mail</div>),
			accessor: (item: Member) => (item.telephone)
		},
		{
			header: () => (<div class="flex flex-row gap-1 items-center"><AtSign class="size-4"/>E-Mail</div>),
			accessor: (item: Member) => (item.email)
		},
		{
			header: () => (<div class="flex flex-row gap-1 items-center"><MapPin class="size-4"/>Address</div>),
			accessor: (item: Member) => (<>{item.street}, {item.postal} {item.city}</>)
		},
		{
			header: () => ("Führungszeugnis"),
			accessor: (item: Member) => (<div class="flex flex-row justify-center">{item.cert ? <Check/> : <X/>}</div>)
		},
		{
			header: () => ("Auslandsjahr"),
			accessor: (item: Member) => (item.yearOfExchange)
		},
		{
			header: () => ("Gastland"),
			accessor: (item: Member) => (item.exchangeCountry)
		}
	]

  return (
    <main class="w-full p-4 space-y-2">
		<MemberPopUp member={member} setMember={setMember} visible={visible()}/>
			<h1 class="text-5xl">Members</h1>
			<Suspense fallback={"Loading..."}>
				<Show when={members()}>
					<div class="w-4/5 h-96 overflow-auto drop-shadow-xl drop-shadow-gray-400 rounded-md">	
					<Table data={members()!} columns={cols}/>
					</div>
				</Show>
			</Suspense>
    </main>
  );
}
