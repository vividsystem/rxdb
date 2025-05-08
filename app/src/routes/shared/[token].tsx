import { query } from "@solidjs/router";
import { NewShareToken } from "~/api/server";

export default function SharedMember() {
	const getShare = query(async (token: NewShareToken) => {

	}, "getShare")
}
