// seedPermissions.ts
import { db } from ".";
import { memberRoles, members, permissions, rolePermissions, roles } from "../../../drizzle/schema";
import { PERMISSIONS } from "./permissions";
import { eq } from "drizzle-orm";

export async function seedPermissions() {
  for (const perm of PERMISSIONS) {
    const existing = await db
      .select()
      .from(permissions)
      .where(eq(permissions.name, perm));

    if (existing.length === 0) {
      await db.insert(permissions).values({ name: perm });
    }
  }
}
const SEED_ADMIN = {
	firstname: "Super",
	lastname: "Admin",
	email: "superadmin@example.com"
}
export async function seedAdmin() {
  await db.transaction(async (tx) => {
    let adminRole = (
      await tx.select().from(roles).where(eq(roles.name, "Admin"))
    )[0];
    if (!adminRole) {
      const inserted = await tx
        .insert(roles)
        .values({ name: "Admin" })
        .returning();
      adminRole = inserted[0];
    }

    const allPerms = await tx.select().from(permissions);
    for (const perm of allPerms) {
      const alreadyLinked = await tx
        .select()
        .from(rolePermissions)
        .where(
          eq(rolePermissions.roleId, adminRole.id) &&
            eq(rolePermissions.permissionId, perm.id)
        );
      if (alreadyLinked.length === 0) {
        await tx
          .insert(rolePermissions)
          .values({ roleId: adminRole.id, permissionId: perm.id });
      }
    }

    let adminMember = (
      await tx.select().from(members).where(eq(members.email, SEED_ADMIN.email))
    )[0];
    if (!adminMember) {
      const inserted = await tx
        .insert(members)
        .values({ ...SEED_ADMIN })
        .returning();
      adminMember = inserted[0];
    }

    const hasRole = await tx
      .select()
      .from(memberRoles)
      .where(
        eq(memberRoles.memberId, adminMember.id) &&
          eq(memberRoles.roleId, adminRole.id)
      );

    if (hasRole.length === 0) {
      await tx
        .insert(memberRoles)
        .values({ memberId: adminMember.id, roleId: adminRole.id });
    }
  });

}
