import { createEffect, createResource, createSignal, Show, useContext } from "solid-js"
import Table, { Column } from "~/components/Table"
import { Calendar, Phone, AtSign, MapPin, Check, Landmark, X } from "lucide-solid"
import { MemberAddDialog, MemberEditDialog } from "./MemberDialog"
import { MemberContext } from "~/lib/contexts/member"
import { Member } from "~/lib/validation/member"
import { BankingContext } from "~/lib/contexts/banking"
import { getBanking } from "~/lib/api/banking"
import { BankingEditDialog } from "./BankingDialog"
import { createAsync, query, revalidate } from "@solidjs/router"
import { getMembers, getPendingMembers } from "~/lib/api/members"

const membersQuery = query(async (_prev) => await getMembers(), "members"); 
const pendingMembersQuery = query(async (_prev) => await getPendingMembers(), "pendingMembers"); 

export function MemberColumns() {
	const {member, setMember} = useContext(MemberContext)
	const {setBanking} = useContext(BankingContext)
	const [banking] = createResource(() => member.bankingId, getBanking)

	createEffect(() => {
		if(banking()) {
			setBanking(banking()!)
		}
	})
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
			accessor: (item: Member) => (
				<div onClick={() => setMember(item)}>
					<BankingEditDialog />
				</div>
			)
		},
		{
			header: () => (""),
			accessor: (item: Member) => (
				<div onClick={() => setMember(item)}>
					<MemberEditDialog/>
				</div>
			)
		}
	]
	return cols
}


interface MemberTableProps {
}
export default function MemberTable(_props: MemberTableProps) {
	const members = createAsync(membersQuery)
	const pendingMembers = createAsync(pendingMembersQuery)
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
							revalidate(membersQuery.key)
						}} classList={{
							"text-black border-b-black": normalTab(),
							"text-gray-300": !normalTab()
						}}
					>Current</div>	
					<div 
						class="px-8 border-b-4 hover:border-b-gray-400 hover:text-b-gray-400" 
						onClick={() => {
							setNormalTab(false)
							revalidate(pendingMembersQuery.key)
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
				<Show when={pendingMembers()} fallback={"Loading..."}>
					<div class="w-full h-4/5 overflow-scroll overflow-y-scroll drop-shadow-xl drop-shadow-gray-400 rounded-md">	
						<Table data={pendingMembers()!} columns={MemberColumns()}/>
					</div>
				</Show>
			}>
			<Show when={members()} fallback={"Loading..."}>
				<div class="w-full h-4/5 overflow-scroll overflow-y-scroll drop-shadow-xl drop-shadow-gray-400 rounded-md">	
					<Table data={members()!} columns={MemberColumns()}/>
				</div>
			</Show>
			</Show>
		</>
	)
}
