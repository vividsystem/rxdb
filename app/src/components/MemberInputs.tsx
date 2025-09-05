import Input from "./Input"
import { Member } from "~/lib/validation/member";


interface MemberInputsProps {
	member: Partial<Member>
	setMember: (updated: Partial<Member>) => void
}

// some things can only be changed by admins
export function OnboardingMemberInputs(props: MemberInputsProps) {
	return (
	<>
		<div class="flex flex-row gap-2">
			<Input type="text" name="firstname" 
			placeholder="Max" label={() => "Firstname"}
			value={() => props.member.firstname ?? undefined} 
			setValue={(fn: string) => props.setMember({...props.member, firstname: fn})}
			class="w-64"
			/>
			<Input type="text" name="lastname" 
			placeholder="Mustermann" label={() => "Lastname"}
			value={() => props.member.lastname ?? undefined} 
			setValue={(ln: string) => props.setMember({ ...props.member, lastname: ln })}	
			class="w-64"
			/>
		</div>

		<Input type="date" opts={{pattern: "\d{4}-\d{2}-\d{2}"}} 
		value={() => props.member.dateOfBirth ?? undefined} 
		placeholder="01-01-2000" label={() => "DoB"} 
		name="date_of_birth" 
		setValue={(dt) => props.setMember({...props.member, dateOfBirth: dt})}
		class="w-48"
		/>
		<div class="flex flex-row gap-2">
			<Input type="tel" name="telephone" placeholder="+49 1234 56789" label={() => "Telephone"}
			value={() => props.member.telephone ?? undefined}
			setValue={(v) => props.setMember({...props.member, telephone: v})}
			class="w-48"
			/>
		</div>


		<Input type="text" name="street" placeholder="Musterstraße" label={() => "Street"}
		value={() => props.member.street ?? undefined}
		setValue={(v) => props.setMember({...props.member, street: v})}
		class="w-96"
		/>

		<div class="flex flex-row gap-2">
		<Input type="text" name="postal" placeholder="12345" label={() => "Postal Code"}
		value={() => props.member.postal ?? undefined}
		setValue={(v) => props.setMember({...props.member, postal: v})}
		class="w-28"
		/>

		<Input type="text" name="city" placeholder="Musterstadt" label={() => "City"}
		value={() => props.member.city ?? undefined}
		setValue={(v) => props.setMember({...props.member, city: v})}
		class="w-48"
		/>
		</div>

		<div class="flex flex-row gap-2">
		<Input type="text" name="exchangeCountry" placeholder="USA" label={() => "Exchange Country"}
		value={() => props.member.exchangeCountry ?? undefined}
		setValue={(v) => props.setMember({...props.member, exchangeCountry: v})}
		class="w-96"
		/>

		<Input type="text" name="exchangeYear" placeholder="2023/2024" label={() => "Exchange Year"}
		value={() => props.member.yearOfExchange ?? undefined}
		setValue={(v) => props.setMember({yearOfExchange: v})}
		class="w-32"
		/>
		</div>
	</>
	)
}

export default function MemberInputs(props: MemberInputsProps) {
	
	return (
	<>
		<div class="flex flex-row">
			<Input type="date" opts={{pattern: "\d{4}-\d{2}-\d{2}"}} 
			value={() => props.member.memberSince ?? undefined} 
			placeholder="01-01-2000" label={() => "Member since"} 
			name="member_since" 
			setValue={(dt) => props.setMember({ ...props.member, memberSince: dt})}
			class="w-48"
			/>

			<Input type="checkbox" name="cert" placeholder="" label={() => "No Diddy?"}
			value={() => undefined}
			opts={{checked: (props.member.cert ?? false), onChange: (ev) => {props.setMember({...props.member, cert: ev.currentTarget.checked})}, class: "mx-6 my-2 border-1 border-gray-200 shadow-gray-400 shadow-md" }}
			setValue={() => {return}}
			class="items-center "
			/>
			<Input type="checkbox" name="cert" placeholder="" label={() => "Application finished?"}
			value={() => undefined}
			opts={{checked: (props.member.verified ?? false), onChange: (ev) => {props.setMember({...props.member, verified: ev.currentTarget.checked})}, class: "mx-6 my-2 border-1 border-gray-200 shadow-gray-400 shadow-md" }}
			setValue={() => {return}}
			class="items-center"
			/>
		</div>	
		<div class="flex flex-row gap-2">
			<Input type="text" name="firstname" 
			placeholder="Max" label={() => "Firstname"}
			value={() => props.member.firstname ?? undefined} 
			setValue={(fn: string) => props.setMember({...props.member, firstname: fn})}
			class="w-64"
			/>
			<Input type="text" name="lastname" 
			placeholder="Mustermann" label={() => "Lastname"}
			value={() => props.member.lastname ?? undefined} 
			setValue={(ln: string) => props.setMember({ ...props.member, lastname: ln })}	
			class="w-64"
			/>
		</div>

		<Input type="date" opts={{pattern: "\d{4}-\d{2}-\d{2}"}} 
		value={() => props.member.dateOfBirth ?? undefined} 
		placeholder="01-01-2000" label={() => "DoB"} 
		name="date_of_birth" 
		setValue={(dt) => props.setMember({...props.member, dateOfBirth: dt})}
		class="w-48"
		/>
		<div class="flex flex-row gap-2">
			<Input type="tel" name="telephone" placeholder="+49 1234 56789" label={() => "Telephone"}
			value={() => props.member.telephone ?? undefined}
			setValue={(v) => props.setMember({...props.member, telephone: v})}
			class="w-48"
			/>

			<Input type="email" name="email" placeholder="maxmustermann@example.com" label={() => "E-Mail"}
			value={() => props.member.email ?? undefined}
			setValue={(v) => props.setMember({...props.member, email: v})}
			class="w-96"
			/>
		</div>


		<Input type="text" name="street" placeholder="Musterstraße" label={() => "Street"}
		value={() => props.member.street ?? undefined}
		setValue={(v) => props.setMember({...props.member, street: v})}
		class="w-96"
		/>

		<div class="flex flex-row gap-2">
		<Input type="text" name="postal" placeholder="12345" label={() => "Postal Code"}
		value={() => props.member.postal ?? undefined}
		setValue={(v) => props.setMember({...props.member, postal: v})}
		class="w-28"
		/>

		<Input type="text" name="city" placeholder="Musterstadt" label={() => "City"}
		value={() => props.member.city ?? undefined}
		setValue={(v) => props.setMember({...props.member, city: v})}
		class="w-48"
		/>
		</div>

		<div class="flex flex-row gap-2">
		<Input type="text" name="exchangeCountry" placeholder="USA" label={() => "Exchange Country"}
		value={() => props.member.exchangeCountry ?? undefined}
		setValue={(v) => props.setMember({...props.member, exchangeCountry: v})}
		class="w-96"
		/>

		<Input type="text" name="exchangeYear" placeholder="2023/2024" label={() => "Exchange Year"}
		value={() => props.member.yearOfExchange ?? undefined}
		setValue={(v) => props.setMember({yearOfExchange: v})}
		class="w-32"
		/>
		</div>
	</>
	)
}
