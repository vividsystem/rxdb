import { useNavigate, useParams } from "@solidjs/router";
import BankingPopUp from "~/components/BankingPopUp";

export default function MembersBanking() {
	const params = useParams();
	const navigate = useNavigate();
	if(isNaN((parseInt(params.id, 10)))) {
		return navigate("/members")
	}

	return (
		<BankingPopUp bankingId={Number(params.id)} onClose={() => navigate("/members")}/>
	)
}

