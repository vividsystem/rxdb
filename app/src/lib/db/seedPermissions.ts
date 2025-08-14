// seedPermissions.ts
import { db } from ".";
import { permissions } from "../../../drizzle//schema";
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
