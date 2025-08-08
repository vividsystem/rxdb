import { createContext } from "solid-js";
import { BankingInfo } from "../validation/banking";

export interface BankingStore {
	banking: Partial<BankingInfo>
	setBanking: (updated: Partial<BankingInfo>) => void
}
const INITIAL_MEMBER_STORE: BankingStore = {
	banking: {},
	setBanking: () => {} 
}
export const BankingContext = createContext(INITIAL_MEMBER_STORE);
