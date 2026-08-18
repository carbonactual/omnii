# OMNII Implementation Gap Register

**Scope:** Final production-readiness closure for the established Phase 1–40 runtime. **Phase 41 = NOT STARTED.**

| Priority | Gap | Status | Exact evidence required to close |
|---|---|---|---|
| P0 | Phase 27 has no package/commit evidence. | IMPLEMENTATION GAP / NOT EVIDENCED | Explicit Phase 27 implementation or an authoritative decision that it is not required for the canonical runtime. No implementation was fabricated in this pass. |
| P1 | Current repository execution is unavailable through connected tooling. | UNVERIFIED — ENVIRONMENT LIMITATION | Fresh execution of `pnpm install`, `pnpm typecheck`, `pnpm test`, `pnpm test:runtime`, and runtime build in an execution-capable environment. |
| P1 | Current CI run is unavailable. | UNVERIFIED — ENVIRONMENT LIMITATION | A current GitHub Actions run for the current HEAD with install, typecheck, runtime tests and runtime build all successful. |
| P1 | Production deployment is not evidenced. | UNVERIFIED | Actual deployment target, environment configuration, deployment run and post-deploy health evidence. |
| P1 | Production ABBA intelligence is not implemented in this repository. | UNIMPLEMENTED / INTEGRATION BOUNDARY | Authorized production intelligence/model provider connected behind the existing ABBA boundary, with authority remaining external to ABBA. |
| P2 | Authenticated/anonymous application-role identity → authority mapping is not canonical. | BLOCKED / RESTRICTIVE BY DESIGN | Authoritative identity contract sufficient to define narrow RLS policies, followed by live authenticated/anonymous policy tests. |
| P2 | Full database-side parent-authority containment is not implemented. | PARTIAL BY DESIGN | Only required if the canonical runtime needs atomic database-side delegation; otherwise runtime containment remains the single authority semantic. |
| P2 | Distributed event transport is not proven. | UNIMPLEMENTED | Production transport adapter and live delivery evidence without changing canonical event semantics. |
| P2 | Workflow/agent production integration remains local/reference-level. | PARTIAL | Deployment adapter and live end-to-end workflow/agent evidence. |
| P3 | Distributed observability is incomplete. | PARTIAL | Deployment-specific telemetry, alerting and operational dashboards. |
| P3 | Ledger is a boundary, not a production settlement engine. | PARTIAL BY DESIGN | Domain-specific settlement implementation only if a product requires it. |
| P4 | Phase 31–40 are horizon/composition concerns. | FUTURE | Future implementation only when explicitly authorized; not required to close the current runtime boundary. |

## Resolved in this closure pass

- Repository migration defects in `0008` and `0009` were found and corrected: their `GRANT EXECUTE` signatures now exactly match the created PostgreSQL functions.
- Canonical Supabase `omnii-canonical` (`fomkrgrsqakabftymbjn`) is `ACTIVE_HEALTHY`.
- Live migrations `0003` through `0009` are present.
- Live OMNII mutating RPCs use `search_path = public, pg_temp`.
- Live OMNII mutating RPCs are `SECURITY INVOKER` and execution is granted to `service_role`; no anon/authenticated execution was observed.
- Fresh live state/event, execution/audit and ledger/audit transaction paths were exercised with isolated verification identifiers.
- Fresh live authority issuance, idempotency, revocation, suspension and stale-version behavior were exercised.
- RLS remains enabled and restrictive with no invented application-role policies.

## Evidence boundary

The live database evidence is real database execution evidence. It does not prove current repository compilation/tests/build, GitHub Actions execution, browser/authenticated RLS behavior, or production deployment.

## Architectural invariants preserved

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
- Phase 41 not started

## Final status

The remaining gaps are verification, deployment, application-identity integration and intentionally unimplemented production integrations. No new constitutional architecture is required by the evidence gathered in this pass.
