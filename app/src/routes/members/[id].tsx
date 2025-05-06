import { createAsync, RouteDefinition, useNavigate, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { getMember, getMembers } from "~/api/";
import { MemberEditPopUp } from "~/components/MemberPopUp";


export const route = {
  preload() {
    getMembers();
  }
} satisfies RouteDefinition;

export default function MemberPage() {
	const navigate = useNavigate()
	const params = useParams();
	const member = createAsync(() => getMember(Number(params.id)));

  return (
		<Show when={params.id && member()} >
			<MemberEditPopUp  member={member()!} onClose={() => navigate("/members")}/>
		</Show>
  );
}
