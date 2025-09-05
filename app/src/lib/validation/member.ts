import { z } from "zod";
import { defaultString } from ".";


export const memberIdSchema = z.uuid()

export const memberSchema = z.object({
	id: memberIdSchema,
	firstname: defaultString,
	memberSince: z.iso.date().default(() => new Date().toISOString().split("T")[0]), 
	verified: z.boolean().default(false),
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
	userId: z.string().nonempty().nullable()
}).strip()

// for use to create users as admins
export const createMemberSchema = memberSchema.omit({ id: true, userId: true }).strip()
// for use in onboarding process
export const onboardingMemberSchema = createMemberSchema.omit({ cert: true, verified: true, memberSince: true}).strip()

export const Input = memberSchema.extend({ cert: z.boolean().optional() }).omit({ id: true }).strip()

export const updateMemberSchema = onboardingMemberSchema.partial().strip()


export type Member = z.infer<typeof memberSchema>
