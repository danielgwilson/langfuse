import { type OrganizationRole } from "@langfuse/shared";

const scopes = ["projects:create", "organizations:update"] as const;

// type string of all Resource:Action, e.g. "members:read"
export type Scope = (typeof scopes)[number];

export const roleAccessRights: Record<OrganizationRole, Scope[]> = {
  OWNER: ["projects:create", "organizations:update"],

  MEMBER: [],
};
