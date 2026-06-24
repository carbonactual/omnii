import type { BunkRole } from "../../auth/src/types";

export type Permission =
  | "property.read"
  | "property.create"
  | "property.update"
  | "listing.create"
  | "listing.submit"
  | "listing.publish"
  | "listing.suspend"
  | "proof.submit"
  | "proof.review"
  | "seal.decide"
  | "inspection.book"
  | "inspection.manage"
  | "admin.access"
  | "audit.read"
  | "finance.read"
  | "finance.reconcile";

const matrix: Partial<Record<BunkRole, Permission[]>> = {
  property_seeker: ["property.read", "inspection.book"],
  tenant: ["property.read", "inspection.book"],
  buyer: ["property.read", "inspection.book"],
  property_owner: ["property.read", "property.create", "property.update", "listing.create", "listing.submit", "proof.submit"],
  landlord: ["property.read", "property.create", "property.update", "listing.create", "listing.submit", "proof.submit"],
  agent: ["property.read", "property.create", "listing.create", "listing.submit", "inspection.manage", "proof.submit"],
  property_manager: ["property.read", "property.update", "listing.create", "listing.submit", "inspection.manage"],
  verification_officer: ["property.read", "proof.review", "admin.access"],
  seal_approver: ["property.read", "seal.decide", "admin.access"],
  operations_manager: ["property.read", "listing.publish", "listing.suspend", "admin.access"],
  finance_officer: ["finance.read", "finance.reconcile", "admin.access"],
  auditor: ["audit.read", "admin.access"],
  super_admin: ["property.read", "property.create", "property.update", "listing.create", "listing.submit", "listing.publish", "listing.suspend", "proof.submit", "proof.review", "seal.decide", "inspection.book", "inspection.manage", "admin.access", "audit.read", "finance.read", "finance.reconcile"]
};

export function permissionsFor(roles: BunkRole[]): Set<Permission> {
  return new Set(roles.flatMap((role) => matrix[role] ?? []));
}

export function can(roles: BunkRole[], permission: Permission): boolean {
  return permissionsFor(roles).has(permission);
}

export function requirePermission(roles: BunkRole[], permission: Permission): void {
  if (!can(roles, permission)) throw new Error(`Missing permission: ${permission}`);
}
