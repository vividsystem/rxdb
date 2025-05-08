import { action, query } from "@solidjs/router";
import { getMembers as gMs, getMember as gM, createMember as aM, updateMember as uM, deleteMember as dM, getBanking as gB, updateBanking as uB} from "./server";

export const getMember = query(gM, "memberByID")
export const getMembers = query(gMs, "members");
export const addMember = action(aM, "addMember");


export const updateMember = action(uM, "updateMember");
export const deleteMember = action(dM, "deleteMember");

export const getBanking = query(gB, "getBanking");
export const updateBanking = action(uB, "updateBanking")
