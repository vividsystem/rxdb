import { createAsync, useNavigate, useParams, useSubmission, type RouteDefinition } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { getMember, updateMember } from "~/api";
import MemberInputs from "~/components/MemberInputs";


export const route = {
  preload() {
		const params = useParams();
		const navigate = useNavigate();
		if(isNaN((parseInt(params.id, 10)))) {
			return navigate("/members")
		}
    getMember(Number(params.id));
  }
} satisfies RouteDefinition;

export default function Member() {
	const params = useParams();
	const navigate = useNavigate();
	if(isNaN((parseInt(params.id, 10)))) {
		return navigate("/members")
	}
	const submissionSave = useSubmission(updateMember);
	const member = createAsync(() => getMember(Number(params.id)))

	const [amember, setMember] = createSignal(member() ?? { firstname: "", lastname: ""})
	return (

		<Show when={member()} >
		<form method="post">
			<div class="flex flex-col">
					<MemberInputs member={amember()!} setMember={setMember}/>

			<div class="flex flex-row gap-2 py-4">
				<input type="submit" value={submissionSave.pending ? "Saving" : "Save"} class="py-2 px-4 border-1 border-green-200 shadow-md shadow-green-400 bg-green-400" onSubmit={(e) => e.preventDefault()} formaction={updateMember.with(props.member.id, amember())}/>
			</div>
			</div>
		</form>
		</Show>
)	
}
