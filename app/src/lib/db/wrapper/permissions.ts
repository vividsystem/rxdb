"use server";
import { memberRoles, permissions, rolePermissions } from "@/schema";
import { and, eq, inArray } from "drizzle-orm";
import { Permission } from "../permissions";
import { db } from "..";
import z from "zod";
import { memberIdSchema } from "~/lib/validation/member";
import { roleIdSchema } from "~/lib/validation/roles";
import { permissionIdSchema } from "~/lib/validation/permission";

export const getMemberPermissions = async (memberId: z.infer<typeof memberIdSchema>) => {
	const rows = await db.select({ name: permissions.name }).from(memberRoles)
    .innerJoin(rolePermissions, eq(memberRoles.roleId, rolePermissions.roleId))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(eq(memberRoles.memberId, memberId));

  // rows is an array of objects like: { name: string }
  return rows.map(r => r.name) as Permission[];
}

export const hasPermission = async (memberId: string, perm: Permission) => {
	const row = await db
    .select()
    .from(memberRoles)
    .innerJoin(rolePermissions, eq(memberRoles.roleId, rolePermissions.roleId))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(
      and(
        eq(memberRoles.memberId, memberId),
        eq(permissions.name, perm)
      )
    )
    .limit(1);

  return row.length > 0;
}

export async function addPermissionsToRole(roleId: z.infer<typeof roleIdSchema>, perms: Permission[]) {
 if (perms.length === 0) {
    return
  }

	const rows = await getPermissionIds(perms)
	if(!rows) {
		return
	}

  const res = await db
    .insert(rolePermissions)
    .values(rows.map((p) => ({ roleId, permissionId: p.id })))
    .onConflictDoNothing({
      target: [rolePermissions.roleId, rolePermissions.permissionId],
    })
    .returning();

  return res
}

export async function addPermissionToRole(roleId: z.infer<typeof roleIdSchema>, permissionId: z.infer<typeof permissionIdSchema>) {

	const res = db
    .insert(rolePermissions)
    .values({ roleId, permissionId })
    .onConflictDoNothing({
      target: [rolePermissions.roleId, rolePermissions.permissionId],
    })
    .returning();

  return res
}

export async function removePermissionsFromRole(roleId: z.infer<typeof roleIdSchema>, perms: Permission[]) {
 if (perms.length === 0) {
    return
  }

	const rows = await getPermissionIds(perms)
	if(!rows) {
		return
	}

  const res = await db
    .delete(rolePermissions)
    .where(and(
			eq(rolePermissions.roleId, roleId),
			inArray(rolePermissions.permissionId, rows.map((r) => r.id)))
		)
    .returning();

  return res
}

export async function getPermissionIds(perms: Permission[]) {
  const rows = await db
    .select({ id: permissions.id, name: permissions.name })
    .from(permissions)
    .where(inArray(permissions.name, perms));

  const foundNames = rows.map((r) => r.name);
  const missing = perms.filter((p) => !foundNames.includes(p));
  if (missing.length > 0) {
    return 
  }

	return rows
}
