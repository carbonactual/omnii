# BUNK Build Manifest

Canonical build map for BUNK inside `carbonactual/omnii`.

## 1. BUNK-specific database materialization

| Area | Canonical source | Purpose |
|---|---|---|
| Marketplace core | `supabase/migrations/0001_bunk_marketplace_core.sql` | Profiles, organizations, properties, units, proof records, seal requests/decisions, listings, saves, inspections, and pulse events; BUNK verification/occupancy/listing state enums; RLS enablement. |
| Auth / roles / permissions | `supabase/migrations/0002_bunk_auth_roles_permissions.sql` | BUNK-specific authentication, role, and permission materialization. |

The marketplace migration explicitly contains BUNK state machines for verification, occupancy, and listing lifecycle, plus the property/listing/inspection data model. This is the strongest directly BUNK-named implementation evidence currently found in the repository.

## 2. Shared implementation required by BUNK

| Area | Canonical source | Handoff role |
|---|---|---|
| Product roles | `packages/permissions/src/product-roles.ts` | Product-level role vocabulary and authorization integration. |
| Shared domain | `packages/shared/src/domain.ts` | Cross-product/domain primitives; do not fork for BUNK. |
| Demo data | `packages/shared/src/demo-data.ts` | Current development/demo data used by the web layer. |
| Web application | `apps/web/app/` | Current product UI, account, onboarding, and API surfaces. |
| Web support | `apps/web/lib/` | Web-side integration/support modules. |
| Web package contract | `apps/web/package.json` | Application dependencies and scripts. |

## 3. Relevant ecosystem contracts to read before a BUNK build

These are not BUNK-specific files, but they constrain how BUNK is assembled in OMNII:

- `README.md`
- `ECOSYSTEM_ARCHITECTURE.md`
- `docs/ARCHITECTURE.md`
- `docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md`
- `docs/CARBON_ACTUAL_PRODUCT_BLUEPRINT.md`
- `docs/CARBON_ACTUAL_ARCHITECTURE_TRACEABILITY.md`
- `docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md`
- `docs/architecture/OMNII_REPOSITORY_BOUNDARY.md`
- `docs/architecture/OMNII_RUNTIME_BOUNDARY.md`
- `docs/architecture/OMNII_SINGLE_REPOSITORY_COMPOSITION_MODEL.md`
- `docs/architecture/OMNII_FINAL_DEPENDENCY_GRAPH.md`
- `docs/architecture/OMNII_IMPLEMENTATION_GAP_REGISTER.md`
- `docs/HAPI_AI.md`
- `docs/SWARMS.md`
- `constitution/README.md`
- `constitution/` canonical constitutional documents

## 4. Current BUNK handoff boundary

BUNK should be treated as a product build assembled from the OMNII substrate, not as a competing architecture.

The implementation-agent handoff should therefore include:

**Input**
- This directory.
- The manifest above.
- The canonical source files listed above.
- The relevant OMNII constitutional/runtime documents.

**Work location**
- Existing canonical app/package/migration paths.
- New BUNK-specific source should only gain a dedicated package/directory when the repository architecture has explicitly established that boundary.

**Output**
- Code and migrations committed in their canonical locations.
- Updated BUNK documentation/manifest in `builds/BUNK/`.
- Tests and evidence attached to the same commit.
- Explicit commit SHA recorded in the build handoff.

## 5. Do not duplicate source of truth

`builds/BUNK/` is the **collation and handoff layer**. It is intentionally not a second copy of the executable BUNK code. Keeping one executable source of truth prevents drift between a copied "BUNK bundle" and the actual OMNII implementation.

## 6. Discovery note

The repository search found two files explicitly named for BUNK:

- `supabase/migrations/0001_bunk_marketplace_core.sql`
- `supabase/migrations/0002_bunk_auth_roles_permissions.sql`

Additional BUNK work is coupled through shared permissions, domain, demo-data, web, auth, and ecosystem architecture layers; those are therefore mapped here rather than incorrectly reclassified as standalone BUNK implementations.
