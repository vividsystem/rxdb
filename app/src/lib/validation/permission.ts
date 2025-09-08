import z from "zod";

export const permissionIdSchema = z.number().positive()
