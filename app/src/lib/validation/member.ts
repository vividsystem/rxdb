import { z } from "zod";
import { defaultString } from ".";


export const memberId = z.uuid()

export const memberSchema = z.object({
	id: memberId,
	firstname: defaultString,
	lastname: defaultString,
	dateOfBirth: z.iso.date(),
	telephone: z.string().trim().min(1).max(22),
	email: z.email().trim(),
	street: defaultString,
	postal: z.string().trim().length(5),
	city: defaultString,
	cert: z.boolean().default(false),
	yearOfExchange: z.string().trim().length(9),
	exchangeCountry: defaultString,
	bankingId: z.number().int().positive()
}).strict()

export const createMemberInput = memberSchema.extend({ cert: z.boolean().optional() }).omit({ id: true }).strip()

export const updateMemberInput = createMemberInput.partial().strip()
