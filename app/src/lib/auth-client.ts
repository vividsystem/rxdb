import { createAuthClient } from "better-auth/client";
import type { auth } from "./auth.ts";
import { inferAdditionalFields, magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [magicLinkClient()],
});

