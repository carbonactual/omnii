# BUNK Build Area

This directory is the canonical handoff/index for the BUNK product build inside the OMNII single repository.

## Operating rule

BUNK is **not** a separate repository and this directory does not replace the existing source-of-truth files. OMNII remains the single repository and the existing implementation files remain authoritative in their native locations.

This directory exists so a future BUNK build can be handed to an implementation agent as one bounded build package without losing the connection to the shared OMNII foundation.

## Current BUNK assembly

The BUNK implementation is currently distributed across:

- `supabase/migrations/0001_bunk_marketplace_core.sql` — marketplace/property/listing/inspection/pulse data foundation.
- `supabase/migrations/0002_bunk_auth_roles_permissions.sql` — BUNK authentication, roles, and permissions materialization.
- `packages/permissions/src/product-roles.ts` — product-level role definitions used by the ecosystem permissions layer.
- `packages/shared/src/domain.ts` — shared domain primitives used by the web/product layer.
- `packages/shared/src/demo-data.ts` — shared/demo data used by the current web implementation.
- `apps/web/app/` — current BUNK-facing web experience and account/onboarding surfaces.
- `apps/web/lib/` — current web integration/support code.

The exact source paths and handoff boundaries are recorded in `BUILD_MANIFEST.md`.

## Build handoff contract

A specific BUNK build should:

1. Read this directory first.
2. Read `BUILD_MANIFEST.md` before changing implementation files.
3. Work in the existing OMNII source locations rather than creating a second BUNK architecture.
4. Preserve OMNII constitutional, foundation, identity, authority, relationship, persistence, and interoperability contracts.
5. Add new BUNK-specific material under this directory only when it is documentation, build specification, migration mapping, or handoff evidence; executable source belongs in its canonical package/app location unless the architecture explicitly establishes a BUNK package.
6. End every BUNK handoff with an updated manifest, tests/evidence, and the commit SHA that contains the build.

## Current consolidation status

The BUNK work has been consolidated at the documentation/handoff level in this folder. The native implementation remains in place so there is one executable source of truth, not duplicate implementations.
