
import { createAsync, RouteDefinition, RouteSectionProps, useNavigate } from "@solidjs/router";
import { AtSign, Calendar, Check, Landmark, MapPin, MousePointer2, Pencil, Phone, X} from "lucide-solid";
import { Show, Suspense } from "solid-js";
import { getMembers } from "~/api/";
import { Member } from "~/api/server";
import { DateTime } from "~/components/DateTime";
import Table, { Column } from "~/components/Table";


export const route = {
  preload() {
    getMembers();
  }
} satisfies RouteDefinition;

export default function MembersLayout(props: RouteSectionProps) {
  const members = createAsync(async () => getMembers(), { deferStream: true }); 
	const navigate = useNavigate();

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
			header: () => ("DoB"),
			accessor: (item: Member) => (item.dateOfBirth)
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
		}, 
		{
			header: () => (<div class="flex flex-row gap-1 items-center"><Landmark class="size-4"/></div>),
			accessor: (item: Member) => (
			<MousePointer2 onClick={() => {
				navigate("/members/banking/"+String(item.bankingId))
			}}/>)
		},
		{
			header: () => (""),
			accessor: (item: Member) => (
				<Pencil onClick={() =>{
					console.log(item.id)
					navigate("/members/"+String(item.id))
				}}/>
			)
		}
	]

  return (
    <main class="w-full h-screen p-4 space-y-2 flex flex-col items-center">
			{props.children}
			<div class="w-4/5 h-screen">
				<div class="w-full flex flex-row justify-between py-4">
					<h1 class="text-5xl w-fit">Members</h1>
					<button class="w-fit px-4 py-2 border-gray-200 shadow-gray-400 shadow-md" onClick={() => navigate("/members/add")}>Add</button>
				</div>
				<Suspense fallback={"Loading..."}>
					<Show when={members()}>
						<div class="w-full h-4/5 overflow-scroll overflow-y-scroll drop-shadow-xl drop-shadow-gray-400 rounded-md">	
							<Table data={members()!} columns={cols}/>
						</div>
					</Show>
				</Suspense>
			</div>
    </main>
  );
}
