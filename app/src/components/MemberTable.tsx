import { createSignal, Show } from "solid-js"
import Table, { Column } from "~/components/Table"
import { Calendar, Phone, AtSign, MapPin, Check, Landmark, X } from "lucide-solid"
import { MemberAddDialog, MemberEditDialog } from "./MemberDialog"
import { Member } from "~/lib/validation/member"
import { BankingEditDialog } from "./BankingDialog"


export function MemberColumns() {

	const cols: Column<Member>[] = [
		{
			header: () => ("ID"),
			accessor: (item: Member) => (item.id),
		},
		{
			header: () => (<div class="flex flex-row gap-1 items-center"><Calendar class="size-4"/>Member since</div>),
			accessor: (item: Member) => (item.memberSince),
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
			accessor: (item) => (<BankingEditDialog memberId={item.id}/>)
		},
		{
			header: () => (""),
			accessor: (item: Member) => (
					<MemberEditDialog member={item}/>
			)
		}
	]
	return cols
}


interface MemberTableProps {
	members?: Member[]
	pendingMembers?: Member[]
}
export default function MemberTable(props: MemberTableProps) {
	const [normalTab, setNormalTab] = createSignal(true)
	return (
		<>
			<div class="">
				<div class="w-full flex flex-row justify-between py-2">
					<h1 class="text-5xl w-fit">Members</h1>
					<MemberAddDialog />
				</div>
				<div class="w-full flex flex-row justify-start text-2xl py-4 first:pl-0">
					<div class="px-8 border-b-4 hover:border-b-gray-400 hover:text-b-gray-400" 
						onClick={() => {
							setNormalTab(true)
						}} classList={{
							"text-black border-b-black": normalTab(),
							"text-gray-300": !normalTab()
						}}
					>Current</div>	
					<div 
						class="px-8 border-b-4 hover:border-b-gray-400 hover:text-b-gray-400" 
						onClick={() => {
							setNormalTab(false)
						}} classList={{
						"text-black border-b-4 border-b-black": !normalTab(),
						"text-gray-300": normalTab()
						}}
					>
						Pending
					</div>	
				</div>
			</div>
			<Show when={normalTab()} fallback={
				<Show when={props.pendingMembers !== undefined} fallback={"Loading..."}>
					<div class="w-full h-4/5 overflow-scroll overflow-y-scroll drop-shadow-xl drop-shadow-gray-400 rounded-md">	
						<Table data={props.pendingMembers!} columns={MemberColumns()}/>
					</div>
				</Show>
			}>
			<Show when={props.members !== undefined} fallback={"Loading..."}>
				<div class="w-full h-4/5 overflow-scroll overflow-y-scroll drop-shadow-xl drop-shadow-gray-400 rounded-md">	
					<Table data={props.members!} columns={MemberColumns()}/>
				</div>
			</Show>
			</Show>
		</>
	)
}
