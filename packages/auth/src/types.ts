export const bunkRoles = [
  "property_seeker",
  "tenant",
  "buyer",
  "seller",
  "landlord",
  "property_owner",
  "agent",
  "agency_owner",
  "affiliate",
  "property_manager",
  "developer",
  "investor",
  "investment_sponsor",
  "inspector",
  "legal_reviewer",
  "valuer",
  "surveyor",
  "facility_manager",
  "maintenance_provider",
  "finance_partner",
  "insurance_partner",
  "organization_admin",
  "support_officer",
  "verification_officer",
  "compliance_officer",
  "finance_officer",
  "operations_manager",
  "seal_approver",
  "super_admin",
  "product_owner",
  "auditor"
] as const;

export type BunkRole = (typeof bunkRoles)[number];

export const privilegedRoles: BunkRole[] = [
  "verification_officer",
  "compliance_officer",
  "finance_officer",
  "operations_manager",
  "seal_approver",
  "super_admin",
  "product_owner",
  "auditor"
];

export interface AuthenticatedBunkUser {
  id: string;
  email?: string;
  phone?: string;
  displayName?: string;
  activeRole?: BunkRole;
  roles: BunkRole[];
  organizationIds: string[];
  mfaVerified: boolean;
}

export interface AuthResult {
  user: AuthenticatedBunkUser;
  nextPath: string;
}
