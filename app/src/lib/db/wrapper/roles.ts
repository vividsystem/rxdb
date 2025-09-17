import { memberRoles, roles } from "@/schema";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { memberIdSchema } from "~/lib/validation/member";
import { db } from "..";
import { createRoleSchema, roleIdSchema, updateRoleSchema } from "~/lib/validation/roles";

//managing a members roles
export async function getMemberRoles(memberId: z.infer<typeof memberIdSchema>) {
	const rows = await db.select({
		role: roles
	}).from(memberRoles)
		.innerJoin(roles, eq(memberRoles.roleId, roles.id))
		.where(eq(memberRoles.memberId, memberId))

	return rows
}
// return: if length == 0 then already added else just added 
export async function addRole(memberId: z.infer<typeof memberIdSchema>, roleId: z.infer<typeof roleIdSchema>) {
	const inserted = await db.insert(memberRoles)
		.values({memberId, roleId})
		.onConflictDoNothing({
			target: [memberRoles.memberId, memberRoles.roleId],
		})
		.returning()

	return inserted
}

// if length>0 role removed else role not assigned to member
export async function removeRole(memberId: z.infer<typeof memberIdSchema>, roleId: z.infer<typeof roleIdSchema>) {
	const res = await db.delete(memberRoles).where(
		and(
			eq(memberRoles.memberId, memberId),
			eq(memberRoles.roleId, roleId)
		)
	).returning()

	return res
}


//managinc roles
export async function createRole(role: z.infer<typeof createRoleSchema>) {
	const res = await db.insert(roles).values(role).returning()
	if (res.length == 0) {
		return
	}

	return res[0]
}

export async function editRole(id: z.infer<typeof roleIdSchema>, updated: z.infer<typeof updateRoleSchema>) {
	const res = await db.update(roles).set(updated).where(eq(roles.id, id)).returning()


	return res
}
export async function deleteRole(id: z.infer<typeof roleIdSchema>) {
	const res = await db.delete(roles).where(eq(roles.id, id)).returning()

	return res
}
export async function getRole(id: z.infer<typeof roleIdSchema>) {
	const res = await db.select().from(roles)
		.where(eq(roles.id, id))
	
	if(res.length == 0) {
		return
	}

	return res[0]
}
