import z from "zod";

export const roleIdSchema = z.number().positive()
export const roleSchema = z.object({
	id: roleIdSchema,
	name: z.string().nonempty(),
})

export const createRoleSchema = roleSchema.omit({id: true})
