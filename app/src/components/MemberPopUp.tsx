import { Accessor, Setter, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Member } from "~/api/server";

interface MemberPopUpProps{
	member: Accessor<Member>
	setMember: Setter<Member>
	visible: boolean
}
export function MemberPopUp(props: MemberPopUpProps) {
	return (
		<Show when={props.visible}>
		<Portal>
		<form class="border-2 border-black">
			<input type="text" value={props.member().firstname}/>
			<input type="text" value={props.member().lastname}/>
			<input type="date" value={props.member().member_since != null ? props.member().member_since!.toString() : ""}/>
			<input type="tel" value={props.member().telephone ?? ""}/>
			<input type="email" value={props.member().email ?? ""}/>
			<input type="checkbox" checked={props.member().cert}/>
			<input type="text" value={props.member().street ?? ""}/>
			<input type="text" value={props.member().postal ?? ""}/>
			<input type="text" value={props.member().city ?? ""}/>
			<input type="text" value={props.member().exchangeCountry ?? ""}/>
			<input type="text" value={props.member().yearOfExchange ?? ""}/>
		</form>
	</Portal></Show>)
}
