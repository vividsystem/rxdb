"use server";

import { memberRoles, permissions, rolePermissions } from "@/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { Permission } from "../db/permissions";

export const getMemberPermissions = async (memberId: string) => {
	const rows = await db.select({ name: permissions.name }).from(memberRoles)
    .innerJoin(rolePermissions, eq(memberRoles.roleId, rolePermissions.roleId))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(eq(memberRoles.memberId, memberId));

  // rows is an array of objects like: { name: string }
  return rows.map(r => r.name) as Permission[];
}

export const hasPermission = async (memberId: string, perm: Permission) => {
	const perms = await getMemberPermissions(memberId)

	return perms.includes(perm)
}
