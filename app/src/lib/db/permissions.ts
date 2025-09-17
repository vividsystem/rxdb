export const PERMISSIONS = [
  "view_members",
  "edit_members",
  "delete_members",
  "assign_roles",
	"edit_roles",
	"view_roles",
  "view_banking",
  "edit_banking",
  "delete_banking",
	"view_permissions", // Is this neccessary? -> view_roles does pretty much the same
	
] as const;

export type Permission = typeof PERMISSIONS[number];
