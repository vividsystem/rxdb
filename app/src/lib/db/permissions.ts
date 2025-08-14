export const PERMISSIONS = [
  "view_members",
  "edit_members",
  "delete_members",
  "assign_roles",
] as const;

export type Permission = typeof PERMISSIONS[number];
