# BUNK Cumulative Dependency Map

## Purpose

This is the compact architectural map for handing BUNK to an implementation agent after the entire OMNII repository has been considered.

BUNK is a downstream composition. It does not own the substrate it consumes.

## Assembly

```text
CONSTITUTION
  ↓ meaning / constraints
UNIVERSAL OBJECT + GRAPH + IDENTITY + AUTHORITY + TRUST
  ↓ canonical substrate
RUNTIME + PERSISTENCE + EVENTS + LEDGER BOUNDARIES
  ↓ execution substrate
ABBA / AGENTS / WORKFLOWS / SERVICES
  ↓ authorized orchestration
SHARED AUTH + PERMISSIONS + DOMAIN + WEB
  ↓ product composition substrate
BUNK
  ├─ person / organization
  ├─ property / unit
  ├─ proof / verification
  ├─ authority / SEAL
  ├─ listing
  ├─ inspection
  ├─ marketplace discovery
  ├─ occupancy / transaction lifecycle
  └─ continuity / audit / Pulse
```

## Canonical BUNK implementation taps

| BUNK need | Existing OMNII tap |
|---|---|
| User identity | `packages/auth/` + Supabase auth |
| Roles | `packages/auth/src/types.ts` + `packages/permissions/src/product-roles.ts` |
| Permissions | `packages/permissions/src/index.ts` |
| Domain validation | `packages/shared/src/domain.ts` |
| Reference data | `packages/shared/src/demo-data.ts` |
| Product persistence | `supabase/migrations/0001_bunk_marketplace_core.sql` |
| BUNK auth/security persistence | `supabase/migrations/0002_bunk_auth_roles_permissions.sql` |
| Web experience | `apps/web/app/` + `apps/web/lib/` |
| Constitutional constraints | `constitution/` + `docs/architecture/` |
| Universal runtime | `packages/omnii-runtime/` |
| Ecosystem dependency graph | `docs/architecture/OMNII_FINAL_DEPENDENCY_GRAPH.md` |
| Product composition policy | `docs/architecture/OMNII_SINGLE_REPOSITORY_COMPOSITION_MODEL.md` |
| Audit/evidence boundary | `docs/architecture/OMNII_IMPLEMENTATION_GAP_REGISTER.md` |

## Critical rule

A BUNK implementation agent must first determine whether the requested capability already exists in the OMNII substrate. If it does, BUNK consumes it. If it does not, add the smallest new composition or domain extension necessary and register it against the universal substrate.

Do not create a parallel BUNK identity system, authority system, graph, event model, ledger, constitutional layer or universal runtime.

## Current evidence boundary

Repository materialization is established. Production readiness remains separately evidenced. The current gap register must be consulted before any claim of production certification.
