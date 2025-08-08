import { createContext } from "solid-js";
import { Member } from "../validation/member";

export interface MemberStore {
	member: Partial<Member>
	setMember: (updated: Partial<Member>) => void
}
const INITIAL_MEMBER_STORE: MemberStore = {
	member: {},
	setMember: () => {} 
}
export const MemberContext = createContext(INITIAL_MEMBER_STORE);
