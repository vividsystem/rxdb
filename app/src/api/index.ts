import { query } from "@solidjs/router";
import { getMembers as gM } from "./server";

export const getMembers = query(gM, "member");
