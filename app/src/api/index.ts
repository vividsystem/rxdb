import { action, query } from "@solidjs/router";
import { getMembers as gM, addMember as aM } from "./server";

export const getMembers = query(gM, "members");
export const addMember = query(aM, "addMember");
