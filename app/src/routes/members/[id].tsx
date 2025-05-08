import { createAsync, redirect, RouteDefinition, useNavigate, useParams } from "@solidjs/router";
import { onMount, Show } from "solid-js";
import { getMember, getMembers } from "~/api/";
import { MemberEditPopUp } from "~/components/MemberPopUp";


export const route = {
  preload() {
  }
} satisfies RouteDefinition;



export default function MemberPage() {
	const navigate = useNavigate()
	const params = useParams();
	if(isNaN((parseInt(params.id, 10)))) {
		return navigate("/members")
	}
	const member = createAsync(() => getMember(Number(params.id)));

  return (
		<Show when={params.id && member()} >
			<MemberEditPopUp member={member()!} onClose={() => navigate("/members")}/>
		</Show>
  );
}
