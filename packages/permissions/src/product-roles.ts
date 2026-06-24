export const BUNK_ROLES = [
  "seeker",
  "tenant",
  "buyer",
  "seller",
  "owner",
  "landlord",
  "agent",
  "affiliate",
  "property_manager",
  "developer",
  "investor",
  "inspector",
  "vendor",
  "reviewer",
  "administrator"
] as const;

export type BunkRole = (typeof BUNK_ROLES)[number];

export type ProductRoleActivation = {
  humanId: string;
  role: BunkRole;
  sealReference: string;
  organizationId?: string;
  active: boolean;
};
