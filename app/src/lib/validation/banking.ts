import z from "zod";
import { defaultString } from ".";
import { memberIdSchema } from "./member";


export const bankingIdSchema = z.number().positive()
export const bankingSchema = z.object({
	id: bankingIdSchema,
	firstname: defaultString,
	lastname: defaultString,
	IBAN: z.string().trim().min(1).max(33),
	BIC: z.string().trim().max(11).nullish(),
	memberId: memberIdSchema
}).strict()


export const createBankingSchema = bankingSchema.omit({ id: true }).strip()


export const updateBankingSchema = createBankingSchema.omit({ memberId: true }).partial().strip()

export type BankingInfo = z.infer<typeof bankingSchema>
