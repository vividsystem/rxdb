import z from "zod";

export const defaultString = z.string().trim().min(1).max(64)
