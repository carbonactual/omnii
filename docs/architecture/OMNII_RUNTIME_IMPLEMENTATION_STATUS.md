# OMNII Runtime Implementation Status

**Scope:** Phase 1–40 runtime hardening and empirical verification. **Phase 41 is not started.** No new constitutional kernel or competing runtime architecture is introduced by this pass.

| Component | Architecture | Schema | Code | Tested | Persisted | Integrated | CI-Verified | Live-Verified | Deployed |
|---|---|---|---|---|---|---|---|---|---|
| Canonical Object Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED (current run) | YES | NO |
| Relationship Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED (current run) | YES | NO |
| Registries | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED (current run) | YES (schema/runtime smoke) | NO |
| Event/State Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED (current run) | YES — atomic commit, rollback, idempotency, stale-version rejection | NO |
| Graph Runtime | YES | YES | YES | YES | YES | YES | UNVERIFIED (current run) | YES through canonical persistence | NO |
| Execution Runtime | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED (current run) | YES — execution/audit commit and rollback | NO |
| Workflow Runtime | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED (current run) | PARTIAL | NO |
| Agent Runtime | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED (current run) | PARTIAL | NO |
| ABBA Boundary | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED (current run) | YES — authority remains external to ABBA | NO |
| Authority Runtime | YES | YES | YES | YES (existing suite) | YES | YES | UNVERIFIED (current run) | YES — issuance/idempotency/revoke/suspend/version conflict | NO |
| Audit Runtime | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED (current run) | YES — execution/ledger atomic boundaries | NO |
| Ledger Boundary | YES | PARTIAL | YES | YES | YES | YES | UNVERIFIED (current run) | YES — ledger/audit commit and rollback | NO |
| Memory Persistence Adapter | YES | N/A | YES | YES | YES | YES | UNVERIFIED (current run) | YES | NO |
| Supabase Persistence Adapter | YES | YES | YES | YES (contract coverage) | YES | YES | UNVERIFIED (current run) | YES — canonical project RPCs and schema | NO |
| Durable PostgreSQL schema/RPCs | YES | YES | YES | YES | YES | YES | UNVERIFIED (current run) | YES | NO |

## Canonical durable environment

- **Project:** `omnii-canonical`
- **Project ref:** `fomkrgrsqakabftymbjn`
- **Status:** ACTIVE and live-accessible through the connected Supabase integration.

## Security hardening completed in this pass

Live inspection found mutable `search_path` configuration on the OMNII trigger and atomic/authority functions. Migration `0006_omnii_runtime_security_hardening` now sets `search_path = public, pg_temp` for those functions.

Live inspection also found the mutating OMNII RPCs executable by `anon`, `authenticated`, and `service_role`. Because the repository does not yet define an authoritative application-role identity/policy mapping, migration `0007_omnii_runtime_function_privileges` revokes those RPCs from `public`, `anon`, and `authenticated` and grants execution only to `service_role`. This preserves a restrictive boundary rather than inventing application authorization semantics.

The live security advisor now reports no OMNII `function_search_path_mutable` warnings. It continues to report RLS-enabled/no-policy informational findings because application-role policies remain intentionally unresolved.

## Durable state/event hardening

A live test exposed a real defect in the existing PostgreSQL state/event RPC: it could not persist an event when the event provenance did not contain an `authority` key, despite the event table requiring non-null authority. The same RPC also did not enforce the expected state version.

Migration `0008_omnii_runtime_state_event_hardening` corrected the existing boundary without creating a new architecture:

- state/event RPC now requires `expected_version`;
- requested state version must advance exactly one version;
- update is guarded by `id AND expected_version`;
- event authority is taken from the canonical state authority input;
- repeated event idempotency keys return the original state/event without reapplying the transition;
- stale writes are rejected transactionally.

Fresh live evidence:

- atomic state + event commit: **PASS**;
- failed event write rolled back the state insert: **PASS**;
- repeated idempotency key produced no second state/event effect: **PASS**;
- stale expected version was rejected: **PASS**.

## Durable execution/audit hardening

Inspection found that `ExecutionRuntime` previously changed execution state to `completed` or `failed` before calling the durable execution/audit atomic boundary. That could leave a terminal state behind if audit persistence failed.

The runtime now routes completion/failure through the existing `executionAudit` atomic boundary first. Regression coverage was added to verify that a failed audit leaves the execution in its prior state.

Fresh live evidence:

- execution + audit atomic commit: **PASS**;
- duplicate audit failure rolled back the execution write: **PASS**.

## Durable ledger/audit evidence

Fresh live evidence:

- ledger + audit atomic commit: **PASS**;
- audit failure rolled back the ledger write: **PASS**.

## Authority boundary

The implementation preserves:

- capability ≠ authority;
- intelligence/orchestration ≠ authority;
- ABBA ≠ authority issuer;
- agent ≠ governance authority issuer;
- delegated scope/capability/resource/context/duration cannot exceed parent authority in `AuthorityRuntime`;
- expired/revoked/suspended authority cannot authorize consequential action.

Fresh live PostgreSQL evidence confirms:

- authority issuance: **PASS**;
- idempotent issuance: **PASS**;
- revocation and version increment: **PASS**;
- stale revocation rejection: **PASS**;
- suspension/version behavior: **PASS** from prior live evidence;
- parent-authority containment inside PostgreSQL issue RPC: **UNVERIFIED / intentionally runtime-owned**.

## RLS and database execution boundary

- RLS enabled on OMNII runtime tables: **PASS**.
- Authenticated/anonymous application-role behavior: **UNVERIFIED** — no authoritative identity-to-authority mapping exists yet, so no broad policy was introduced.
- Mutating OMNII RPCs callable by anon/authenticated: **NO** after migration 0007.
- Backend service-role execution: **PASS** by database privilege inspection.

## Current repository execution evidence

The connected GitHub tooling can inspect workflow runs but does not expose workflow dispatch. At the pre-commit inspection of `c1e94fd83fda273fd09678bb4c8413e6790f27e1`, no current workflow run was observable.

A new corrective commit in this pass will trigger the existing `omnii-runtime.yml` push workflow. Its result will be treated as the current CI evidence only if an actual run becomes observable.

Until then:

- current typecheck: **UNVERIFIED**;
- current runtime tests: **UNVERIFIED**;
- current build: **UNVERIFIED**;
- current CI: **UNVERIFIED — ENVIRONMENT LIMITATION**.

Historical workflow evidence is not substituted for current verification.

## Phase and deployment discipline

- **Phase 27:** IMPLEMENTATION GAP — intentionally preserved.
- **Phase 41:** NOT STARTED.
- No BUNK → OMNII dependency was introduced.
- No second canonical object model was introduced.
- No second canonical graph was introduced.
- No competing authority architecture was introduced.
- No production deployment is claimed.

## Readiness rule

Production readiness requires contract, implementation, empirical tests, persistence integration, current CI evidence and deployment evidence. Live database evidence alone is not deployment evidence.
