import { Permission } from "../db/permissions"

export function includesPermission(perms: Permission[], toContain: Permission): boolean {
	return perms.includes(toContain);
}
