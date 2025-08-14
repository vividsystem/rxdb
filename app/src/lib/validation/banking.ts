import z from "zod";
import { defaultString } from ".";
import { memberId } from "./member";


export const bankingId = z.number().positive()
export const bankingSchema = z.object({
	id: bankingId,
	firstname: defaultString,
	lastname: defaultString,
	IBAN: z.string().trim().min(1).max(33),
	BIC: z.string().trim().max(11).nullish(),
	memberId: memberId
}).strict()


export const createBankingSchema = bankingSchema.omit({ id: true }).strip()


export const updateBankingSchema = createBankingSchema.partial().strip()

export type BankingInfo = z.infer<typeof bankingSchema>
