import { Accessor, Setter } from "solid-js"
import Input from "./Input"
import { Member, NewMember } from "~/api/server"

interface MemberInputs {
	member: NewMember
	setMember: Setter<NewMember> 
}

export default function MemberInputs(props: MemberInputs) {
	return (
	<>
		<div class="flex flex-row">
			<Input type="date" opts={{pattern: "\d{4}-\d{2}-\d{2}"}} 
			value={() => props.member.member_since != null ? props.member.member_since.toISOString().slice(0,10) : ""} 
			placeholder="01-01-2000" label={() => "Member since"} 
			name="member_since" 
			setValue={(dt) => props.setMember({...props.member, member_since: new Date(dt)})}
			class="w-48"
			/>

			<Input type="checkbox" name="cert" placeholder="" label={() => "No Diddy?"}
			value={() => ""}
			opts={{checked: (props.member.cert), onChange: (ev) => {props.setMember({...props.member, cert: ev.currentTarget.checked})}, class: "mx-6 my-2 border-1 border-gray-200 shadow-gray-400 shadow-md" }}
			setValue={() => {return}}
			class="items-center "
			/>
		</div>	
		<div class="flex flex-row gap-2">
			<Input type="text" name="firstname" 
			placeholder="Max" label={() => "Firstname"}
			value={() => props.member.firstname} 
			setValue={(fn: string) => props.setMember({...props.member, firstname: fn})}	
			class="w-64"
			/>
			<Input type="text" name="lastname" 
			placeholder="Mustermann" label={() => "Lastname"}
			value={() => props.member.lastname} 
			setValue={(ln: string) => props.setMember({...props.member, lastname: ln})}	
			class="w-64"
			/>
		</div>

		<Input type="date" opts={{pattern: "\d{4}-\d{2}-\d{2}"}} 
		value={() => props.member.dateOfBirth != null ? new Date(props.member.dateOfBirth!).toISOString().slice(0,10) : ""} 
		placeholder="01-01-2000" label={() => "DoB"} 
		name="date_of_birth" 
		setValue={(dt) => props.setMember({...props.member, member_since: new Date(dt)})}
		class="w-48"
		/>
		<div class="flex flex-row gap-2">
			<Input type="tel" name="telephone" placeholder="+49 1234 56789" label={() => "Telephone"}
			value={() => props.member.telephone ?? ""}
			setValue={(v) => props.setMember({...props.member, telephone: v})}
			class="w-48"
			/>

			<Input type="email" name="email" placeholder="maxmustermann@example.com" label={() => "E-Mail"}
			value={() => props.member.email ?? ""}
			setValue={(v) => props.setMember({...props.member, email: v})}
			class="w-96"
			/>
		</div>


		<Input type="text" name="street" placeholder="Musterstraße" label={() => "Street"}
		value={() => props.member.street ?? ""}
		setValue={(v) => props.setMember({...props.member, street: v})}
		class="w-96"
		/>

		<div class="flex flex-row gap-2">
		<Input type="text" name="postal" placeholder="12345" label={() => "Postal Code"}
		value={() => props.member.postal ?? ""}
		setValue={(v) => props.setMember({...props.member, postal: v})}
		class="w-28"
		/>

		<Input type="text" name="city" placeholder="Musterstadt" label={() => "City"}
		value={() => props.member.city ?? ""}
		setValue={(v) => props.setMember({...props.member, city: v})}
		class="w-48"
		/>
		</div>

		<div class="flex flex-row gap-2">
		<Input type="text" name="exchangeCountry" placeholder="USA" label={() => "Exchange Country"}
		value={() => props.member.exchangeCountry ?? ""}
		setValue={(v) => props.setMember({...props.member, exchangeCountry: v})}
		class="w-96"
		/>

		<Input type="text" name="exchangeYear" placeholder="USA" label={() => "Exchange Year"}
		value={() => props.member.yearOfExchange ?? ""}
		setValue={(v) => props.setMember({...props.member, yearOfExchange: v})}
		class="w-32"
		/>
		</div>
	</>
	)
}
