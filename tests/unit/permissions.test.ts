import { describe, expect, it } from "vitest";
import { can, permissionsFor, requirePermission } from "../../packages/permissions/src";

describe("BUNK permissions", () => {
  it("allows property owners to create property records", () => {
    expect(can(["property_owner"], "property.create")).toBe(true);
  });

  it("does not allow ordinary agents to publish listings", () => {
    expect(can(["agent"], "listing.publish")).toBe(false);
  });

  it("requires a human SEAL approver for seal decisions", () => {
    expect(can(["seal_approver"], "seal.decide")).toBe(true);
    expect(can(["verification_officer"], "seal.decide")).toBe(false);
  });

  it("merges permissions across multiple active assignments", () => {
    const permissions = permissionsFor(["property_owner", "tenant"]);
    expect(permissions.has("property.create")).toBe(true);
    expect(permissions.has("inspection.book")).toBe(true);
  });

  it("throws when a required permission is absent", () => {
    expect(() => requirePermission(["property_seeker"], "listing.publish")).toThrow(/Missing permission/);
  });
});
