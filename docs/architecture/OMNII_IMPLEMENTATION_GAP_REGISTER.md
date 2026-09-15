# OMNII Implementation Gap Register

**Scope:** Final production-readiness closure for the established Phase 1–40 runtime. **Phase 41 = NOT STARTED.**

| Priority | Gap | Status | Exact evidence required to close |
|---|---|---|---|
| P0 | Phase 27 has no package/commit evidence. | IMPLEMENTATION GAP / NOT EVIDENCED | Explicit Phase 27 implementation or an authoritative decision that it is not required for the canonical runtime. No implementation was fabricated in this pass. |
| P1 | Current repository execution is unavailable through connected tooling. | UNVERIFIED — ENVIRONMENT LIMITATION | Fresh execution of `npm install`, `npm run typecheck`, `npm test`, `npm run test:runtime`, and the production build in an execution-capable environment. |
| P1 | Current CI run is unavailable. | UNVERIFIED — NO RUN FOR CURRENT HEAD | A current GitHub Actions run for the current PR/head with install, typecheck, runtime tests and runtime build all successful. Current commit status reports `pending` with zero statuses rather than success. |
| P1 | Production deployment is not evidenced. | UNVERIFIED | Actual deployment target, environment configuration, deployment run and post-deploy health evidence. |
| P1 | Production ABBA intelligence is not implemented in this repository. | UNIMPLEMENTED / INTEGRATION BOUNDARY | Authorized production intelligence/model provider connected behind the existing ABBA boundary, with authority remaining external to ABBA. |
| P1 | Supabase public exposure/security-advisor findings remain. | PARTIAL / PROVIDER-MANAGED | Current advisors show 15 RLS-enabled tables with no policies, `public.spatial_ref_sys` without RLS, PostGIS in `public`, and SECURITY DEFINER exposure. Safe PostGIS function revocation was attempted in live migration but managed privileges reasserted; closure requires a supported provider-safe boundary change or an explicit accepted risk. |
| P2 | Authenticated/anonymous application-role identity → authority mapping is not canonical. | BLOCKED / RESTRICTIVE BY DESIGN | Authoritative identity contract sufficient to define narrow RLS policies, followed by live authenticated/anonymous policy tests. |
| P2 | Full database-side parent-authority containment is not implemented. | PARTIAL BY DESIGN | Only required if the canonical runtime needs atomic database-side delegation; otherwise runtime containment remains the single authority semantic. |
| P2 | Distributed event transport is not proven. | UNIMPLEMENTED | Production transport adapter and live delivery evidence without changing canonical event semantics. |
| P2 | Workflow/agent production integration remains local/reference-level. | PARTIAL | Deployment adapter and live end-to-end workflow/agent evidence. |
| P3 | Distributed observability is incomplete. | PARTIAL | Deployment-specific telemetry, alerting and operational dashboards. |
| P3 | Ledger is a boundary, not a production settlement engine. | PARTIAL BY DESIGN | Domain-specific settlement implementation only if a product requires it. |
| P4 | Phase 31–40 are horizon/composition concerns. | FUTURE | Future implementation only when explicitly authorized; not required to close the current runtime boundary. |

## Resolved/verified during the current closure work

- The canonical control-plane validator was strengthened in-place rather than creating a second validator primitive. It now checks required fields, duplicate canonical IDs, declared authority classes, declared lifecycle states and required canonical control IDs.
- Canonical Supabase `omnii-canonical` (`fomkrgrsqakabftymbjn`) remains `ACTIVE_HEALTHY`.
- Live inspection confirmed `omnii_has_active_authority(text)` is intentionally executable by `authenticated` because existing authenticated RLS policies call it; it was not revoked merely to reduce an advisor warning.
- Live inspection confirmed the three `public.st_estimatedextent(...)` PostGIS SECURITY DEFINER overloads are executable by `anon` and `authenticated`; restrictive revocation was applied through Supabase migration tooling but the managed provider reasserted the grants on subsequent inspection.
- Repository-side migration evidence for the PostGIS restriction attempt is recorded in `supabase/migrations/20260915110700_restrict_postgis_estimatedextent_api_execution.sql`.
- RLS remains enabled and restrictive with no invented application-role policies.

## Existing verified architectural invariants

- `CAPABILITY ≠ AUTHORITY`
- `INTELLIGENCE ≠ AUTHORITY`
- `ABBA ≠ AUTHORITY ISSUER`
- `ORCHESTRATION ≠ OWNERSHIP`
- delegated scope/capabilities/resources/context/duration remain bounded by parent authority
- one canonical object model
- one canonical relationship/dependency model
- one canonical authority model
- one persistence boundary
- Phase 40 remains an adapter/view, not a competing graph
- BUNK remains downstream; no BUNK → OMNII dependency
- OMNI remains a separate product from OMNII
- Phase 41 not started

## Evidence boundary

Live database evidence is real database execution evidence. It does not prove current repository compilation/tests/build, current GitHub Actions execution, browser/authenticated RLS behavior, or production deployment.

## Final status

The architecture itself is not waiting on a new constitutional layer. The remaining work is evidence closure, provider-safe database hardening, deployment verification, application-identity integration, distributed transport/observability proof, and intentionally external production integrations.
