import { createEffect, createResource, useContext } from "solid-js"
import Table, { Column } from "~/components/Table"
import { Calendar, Phone, AtSign, MapPin, Check, Landmark, X } from "lucide-solid"
import { MemberEditDialog } from "./MemberDialog"
import { MemberContext } from "~/lib/contexts/member"
import { Member } from "~/lib/validation/member"
import { BankingContext } from "~/lib/contexts/banking"
import { getBanking } from "~/lib/api/banking"
import { BankingEditDialog } from "./BankingDialog"
import { bankingId } from "~/lib/validation/banking"
import z from "zod"

export function MemberColumns() {
	const {member, setMember} = useContext(MemberContext)
	const {_, setBanking} = useContext(BankingContext)
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
	members: Member[]
}
export default function MemberTable(props: MemberTableProps) {
	return (
		<>
			<Table data={props.members} columns={MemberColumns()}/>
		</>
	)
}
