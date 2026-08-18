# OMNII Runtime Implementation Status

**Scope:** Phase 1–40 runtime hardening and empirical verification. **Phase 41 is not started.** No new constitutional kernel or competing runtime architecture is introduced.

| Component | Architecture | Schema | Code | Tested | Persisted | Integrated | CI-Verified | Live-Verified | Deployed |
|---|---|---|---|---|---|---|---|---|---|
| Canonical Object Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED | YES | NO |
| Relationship Runtime | YES | YES | YES | YES — concurrency regression added | YES | YES | UNVERIFIED | YES | NO |
| Registries | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED | YES (schema/runtime smoke) | NO |
| Event/State Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED | YES — atomicity/idempotency/concurrency | NO |
| Graph Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED | YES through canonical persistence | NO |
| Execution Runtime | YES | PARTIAL | YES | YES — execution CAS regression added | YES | YES | UNVERIFIED | YES — atomic commit/rollback + stale-version rejection | NO |
| Workflow Runtime | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED | PARTIAL | NO |
| Agent Runtime | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED | PARTIAL | NO |
| ABBA Boundary | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED | YES — authority remains external to ABBA | NO |
| Authority Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED | YES — issuance/idempotency/revoke/suspend/version conflict | NO |
| Audit Runtime | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED | YES — atomic boundaries | NO |
| Ledger Boundary | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED | YES — ledger/audit commit/rollback | NO |
| Memory Persistence Adapter | YES | N/A | YES | YES | YES | YES | UNVERIFIED | YES | NO |
| Supabase Persistence Adapter | YES | YES | YES | YES | YES | YES | UNVERIFIED | YES — canonical project RPCs | NO |
| Durable PostgreSQL schema/RPCs | YES | YES | YES | YES | YES | YES | UNVERIFIED | YES — migrations 0003–0009 | NO |

## Canonical durable environment

- **Project:** `omnii-canonical`
- **Project ref:** `fomkrgrsqakabftymbjn`
- **Status:** ACTIVE_HEALTHY and live-accessible.
- **Migrations:** 0003, 0004, 0005, 0006, 0007, 0008, 0009 present live.

## Security boundary

- OMNII mutating RPCs use `search_path = public, pg_temp`.
- OMNII mutating RPCs are restricted to `service_role`; no broad anon/authenticated execution is granted.
- RLS is enabled on OMNII tables and there are currently no application-role policies. This remains intentionally restrictive because no authoritative identity→authority binding has been established.
- Security advisor reports the RLS-enabled/no-policy informational findings only; the previous mutable-function-search-path findings are resolved.

## Authority invariants

The runtime continues to enforce:

- `CAPABILITY ≠ AUTHORITY`;
- `INTELLIGENCE ≠ AUTHORITY`;
- `ABBA ≠ AUTHORITY ISSUER`;
- agent ≠ governance authority issuer;
- delegated scope/capabilities/resources/context/duration cannot exceed parent authority;
- revoked, suspended and expired authority cannot authorize consequential action.

Parent-authority containment remains runtime-owned rather than duplicated as a second constitutional authority engine in SQL.

## Durable concurrency hardening

A repository audit identified two real compare-and-swap gaps:

1. `RelationshipRuntime.update()` previously used a non-CAS persistence update. It now initializes relationships at version `1`, always uses `updateIfVersion`, increments exactly one version, and exposes version-aware retirement.
2. `ExecutionRuntime` previously used non-CAS state updates and the durable execution/audit RPC did not guard the expected version. Execution records now carry version `1`, state changes use `updateIfVersion`, and migration `0009_omnii_runtime_execution_concurrency` adds expected-version enforcement to the existing execution/audit atomic boundary.

The memory adapter now mirrors the durable state/event idempotency/version semantics and execution/audit version checks used by the named PostgreSQL boundaries.

## Fresh live evidence for 0009

Against `omnii-canonical`:

- migration 0009 applied: **PASS**;
- new execution/audit RPC signature and `search_path` inspected: **PASS**;
- RPC is `SECURITY INVOKER`: **PASS**;
- stale execution version rejected: **PASS**;
- successful execution + audit write: **PASS**;
- duplicate audit failure rolled back the execution mutation: **PASS**;
- verification records were cleaned after the test.

## Repository execution evidence

The connected GitHub integration exposes inspection, status and existing workflow-run evidence, but does not expose a workflow-dispatch action. For the current commit `1c25cc248558008771b792aa31693116e003b270`, no workflow run or status check is observable through the available GitHub tooling.

Therefore, current repository execution remains:

- `pnpm install`: **UNVERIFIED — ENVIRONMENT LIMITATION**;
- `pnpm typecheck`: **UNVERIFIED — ENVIRONMENT LIMITATION**;
- `pnpm test`: **UNVERIFIED — ENVIRONMENT LIMITATION**;
- `pnpm test:runtime`: **UNVERIFIED — ENVIRONMENT LIMITATION**;
- `pnpm --filter @omnii/runtime build`: **UNVERIFIED — ENVIRONMENT LIMITATION**;
- current CI: **UNVERIFIED — ENVIRONMENT LIMITATION**.

No historical CI run is substituted for current evidence.

## Phase/deployment discipline

- **Phase 27:** IMPLEMENTATION GAP — intentionally preserved.
- **Phase 41:** NOT STARTED.
- No BUNK → OMNII dependency.
- No second canonical object model.
- No second canonical graph.
- No competing authority architecture.
- Production deployment is not claimed.

## Readiness rule

Production readiness requires implementation, current empirical repository execution, persistence integration, live durable verification, CI evidence and deployment evidence. Documentation or source presence alone is insufficient.
