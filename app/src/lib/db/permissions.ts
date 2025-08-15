export const PERMISSIONS = [
  "view_members",
  "edit_members",
  "delete_members",
  "assign_roles",
  "view_banking",
  "edit_banking",
  "delete_banking",
	
] as const;

export type Permission = typeof PERMISSIONS[number];
