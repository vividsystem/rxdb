import { useNavigate } from "@solidjs/router";
import { MemberCreatePopUp } from "~/components/MemberPopUp";

export default function MemberAdd() {
	const navigate = useNavigate();
	return (<>
		<MemberCreatePopUp onClose={() => navigate("/members")}/>
	</>)
}
