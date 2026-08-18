# BUNK Build Manifest

**Status: CONSOLIDATED / HANDOFF-READY**  
**Repository:** `carbonactual/omnii`  
**Principle:** BUNK is a composition of the OMNII substrate, not a standalone architecture.

## 1. Canonical rule

BUNK is assembled from the work already committed to OMNII. `builds/BUNK/` is the **collation, dependency, handoff and evidence layer**. It is not a copy of executable source.

The OMNII single-repository composition policy explicitly defines BUNK as a product/world composition inside one governed environment. Existing assets are preserved by value and provenance, and new products should primarily be assembly operations over canonical objects, relationships, capabilities, resources, workflows and policy. fileciteturn25file0

Therefore:

- Do not fork OMNII primitives into BUNK.
- Do not recreate identity, authority, graph, event, value, persistence or runtime semantics inside BUNK.
- Do not infer that a file belongs exclusively to BUNK merely because BUNK consumes it.
- Implement new BUNK-specific behavior in its canonical existing app/package/migration location unless a dedicated boundary is explicitly established.
- Keep provenance: every BUNK capability should point back to the OMNII layer it consumes.

## 2. BUNK-specific materialization

| Area | Canonical source | What it provides |
|---|---|---|
| Marketplace core | `supabase/migrations/0001_bunk_marketplace_core.sql` | Profiles, organizations, properties, units, proof records, SEAL requests/decisions, listings, saves, inspections, Pulse events, verification/occupancy/listing state machines, geospatial property location and RLS enablement. |
| Auth / roles / permissions materialization | `supabase/migrations/0002_bunk_auth_roles_permissions.sql` | Roles, permissions, role assignments, consent, devices, login events, sensitive-action challenges, BUNK user bootstrap trigger and RLS policies. |

The marketplace migration is the principal BUNK domain materialization. Its schema includes the lifecycle controls needed for property/listing trust rather than treating BUNK as a simple listing UI. fileciteturn9file0

The authentication migration adds BUNK role/permission and consent/security materialization and creates the BUNK user bootstrap path. fileciteturn19file0

## 3. BUNK domain and product contracts

| Area | Canonical source | Role in BUNK |
|---|---|---|
| Shared BUNK domain | `packages/shared/src/domain.ts` | Zod contracts for properties, listings, verification, occupancy, risk and SEAL decisions. |
| BUNK demo/reference data | `packages/shared/src/demo-data.ts` | Fictional Abuja property/listing fixtures for development and evidence. |
| Ecosystem product roles | `packages/permissions/src/product-roles.ts` | Product-level BUNK role activation contract and SEAL-linked role activation. |
| Permission matrix | `packages/permissions/src/index.ts` | Runtime permission vocabulary and role-to-permission checks. |
| Canonical BUNK auth types | `packages/auth/src/types.ts` | BUNK role vocabulary, privileged roles and authenticated-user shape. |
| Server auth adapter | `packages/auth/src/supabase-server.ts` | Server-side Supabase session/client boundary. |
| Browser auth adapter | `packages/auth/src/supabase-browser.ts` | Browser-side Supabase client boundary. |

The shared domain currently defines the BUNK property/listing state and SEAL decision schemas. fileciteturn24file0

The canonical auth type contains the broader BUNK role vocabulary used by the onboarding surface. fileciteturn22file0

The permission implementation provides the actual role-to-capability checks consumed by the product layer. fileciteturn30file0

The product-role activation layer additionally binds an active BUNK role to a human, optional organization and SEAL reference. fileciteturn20file0

## 4. BUNK web/application surface

The current web application is a shared OMNII application surface containing BUNK-facing routes rather than a separate BUNK app.

| Surface | Canonical source | Role |
|---|---|---|
| Web application | `apps/web/app/` | BUNK UI, account, onboarding, API and product experience. |
| Web support | `apps/web/lib/` | Web-side integration/support code. |
| Application contract | `apps/web/package.json` | Dependencies and scripts. |
| Health endpoint | `apps/web/app/api/health/route.ts` | BUNK web/Supabase integration health probe. |
| Role onboarding | `apps/web/app/onboarding/role/page.tsx` | Selects current BUNK operating role while preserving multi-role accounts. |
| Sign-in | `apps/web/app/sign-in/page.tsx` | Authentication surface. |
| Sign-up | `apps/web/app/sign-up/page.tsx` | Account creation surface. |
| Forgot password | `apps/web/app/forgot-password/page.tsx` | Account recovery surface. |
| Web home/layout | `apps/web/app/page.tsx`, `apps/web/app/layout.tsx` | Shared product shell and BUNK-facing entry experience. |

The role onboarding implementation explicitly treats an account as capable of holding several roles and selects the active dashboard/permission context rather than creating separate identities. fileciteturn21file0

The health endpoint reports the BUNK web service and its Supabase integration state. fileciteturn23file0

## 5. OMNII substrate BUNK depends on

These are **not BUNK files**. They are canonical ecosystem infrastructure that BUNK consumes.

### Constitutional and composition layer

- `constitution/` and `constitution/README.md`
- `docs/constitution/KERNEL_INDEX.md`
- `docs/constitution/COMPOSITION.md`
- `docs/CARBON_ACTUAL_BUILD_CONSTITUTION.md`
- `docs/CARBON_ACTUAL_PRODUCT_BLUEPRINT.md`
- `docs/CARBON_ACTUAL_ARCHITECTURE_TRACEABILITY.md`
- `docs/ARCHITECTURE.md`
- `docs/PRODUCT.md`
- `docs/architecture/OMNII_CANONICAL_ARCHITECTURE.md`
- `docs/architecture/OMNII_REPOSITORY_BOUNDARY.md`
- `docs/architecture/OMNII_RUNTIME_BOUNDARY.md`
- `docs/architecture/OMNII_SINGLE_REPOSITORY_COMPOSITION_MODEL.md`
- `docs/architecture/OMNII_FINAL_DEPENDENCY_GRAPH.md`
- `docs/architecture/OMNII_IMPLEMENTATION_GAP_REGISTER.md`
- `docs/HAPI_AI.md`
- `docs/SWARMS.md`

### Universal foundation/runtime

- `packages/foundation/src/client.ts`
- `packages/foundation/src/contracts.ts`
- `packages/omnii-runtime/`
- canonical object/runtime/identity/authority/relationship/dependency/persistence layers already established in the repository
- shared event/Pulse and ledger boundaries
- authentication and permissions primitives

The canonical dependency graph places products downstream of the universal runtime and explicitly states that BUNK must remain downstream rather than becoming an OMNII dependency. fileciteturn18file0

### Constitutional runtime

Build 24 materialized the constitutional registry and validator in:

- `packages/omnii-runtime/src/constitutional.ts`
- `packages/omnii-runtime/src/constitutional-registry.ts`
- `packages/omnii-runtime/src/constitutional-validator.ts`
- `packages/omnii-runtime/tests/constitutional-runtime.test.ts`

The registry validates dependencies and rejects unknown dependencies/cycles; the validator also protects the canonical meaning of OMNI. fileciteturn32file0 fileciteturn33file0 fileciteturn34file0

## 6. Dependency direction

```text
OMNII Constitution
        ↓
Universal primitives / schemas / graph
        ↓
Identity / Authority / Trust / Consent
        ↓
Universal Runtime / Persistence / Events
        ↓
ABBA / agents / workflows / services (where authorized)
        ↓
Shared web + permissions + auth
        ↓
BUNK composition
        ↓
BUNK property / listing / verification / inspection / marketplace workflows
```

This is a **consumption graph**, not a software-import requirement between every layer. Constitutional dependency is semantic; runtime dependency is implementation-specific.

The canonical dependency graph identifies the universal runtime and ecosystem runtime as prerequisites for product compositions and explicitly forbids Constitution → BUNK as a dependency direction. fileciteturn18file0

## 7. BUNK capability assembly

BUNK's current materialized capabilities can be read as compositions of existing primitives:

- **Identity** → profile + authenticated BUNK user.
- **Role** → product role + organization context + active role.
- **Authority** → proof + SEAL decision + role/permission checks.
- **Property** → canonical object/domain contract + geographic location + verification/occupancy/risk state.
- **Listing** → property/unit + listing lifecycle + authority proof + SEAL decision.
- **Trust** → evidence/proof + verification states + human review + SEAL.
- **Inspection** → listing + scheduling + assignment + completion + proof reference.
- **Marketplace discovery** → listing/property state + location + shared web experience.
- **Continuity/audit** → Pulse events + audit/ledger boundaries already supplied by OMNII.
- **Security** → Supabase auth/session boundary + RLS + consent/device/login/challenge materialization.

The database itself enforces an important marketplace invariant: a listing cannot be `published` unless authority proof and a SEAL decision are present. fileciteturn9file0

## 8. BUNK is downstream, not foundational

The current OMNII gap register explicitly records:

- `BUNK remains downstream; no BUNK → OMNII dependency`.
- One canonical object model.
- One canonical relationship/dependency model.
- One canonical authority model.
- One persistence boundary.
- `CAPABILITY ≠ AUTHORITY`.
- `INTELLIGENCE ≠ AUTHORITY`.
- `ABBA ≠ AUTHORITY ISSUER`.

These constraints are architectural invariants, not optional product conventions. fileciteturn26file0

## 9. Known implementation/evidence boundary

The BUNK build map is now complete as a **repository collation**. That does not mean BUNK production readiness has been falsely certified.

The repository-wide evidence register still identifies unresolved verification/integration boundaries including current repository execution, current GitHub Actions evidence, production deployment, authenticated/anonymous application-role identity mapping, distributed events, and production workflow/agent integration. fileciteturn26file0

Therefore this build area distinguishes:

**Materialized:** code, schemas, routes, roles, permissions, auth adapters, domain contracts, runtime/constitutional substrate references.

**Not automatically certified:** production deployment, current CI execution, full live authenticated RLS behavior, production ABBA intelligence, distributed event transport, and end-to-end production workflow evidence.

## 10. Historical provenance

The BUNK material is not tied to one BUNK commit. It is inherited from the cumulative OMNII history. The current repository also contains later constitutional/runtime materialization, including Build 24 and subsequent CI-trigger commits. Build 24 explicitly records that constitutional runtime enforcement remains subordinate to the constitution and that production compliance requires separate code/test/workflow/persistence/authority/consent/deployment evidence. fileciteturn15file0

This is why this manifest is a **map across commits**, not a claim that BUNK was introduced as one isolated feature branch.

## 11. Build handoff procedure

When a specific BUNK build is requested:

1. Start here.
2. Read the relevant OMNII constitutional/runtime contracts.
3. Identify which canonical primitives already satisfy the requirement.
4. Identify only the genuinely new BUNK behavior/data/interface needed.
5. Modify the existing canonical source location.
6. Add/update tests and evidence.
7. Update this manifest if the dependency surface changes.
8. Commit the complete build.
9. Record the exact commit SHA and verification status.

**Never copy the OMNII substrate into `builds/BUNK/`. Assemble it by reference.**
