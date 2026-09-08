# OMNII Security Posture & Provider Boundary Doctrine — Canonical

**Status: CANONICAL**  
**Date: 2026-09-08**

## Purpose

Security controls are part of the Control Plane. They protect the distinction between constitutional authority, application permissions, provider privileges, runtime observation and persisted data.

## RLS invariant

Application data exposed through Supabase APIs MUST be protected by Row Level Security unless the table is intentionally non-client-facing and is isolated behind a provider/runtime boundary.

Operational observability tables are service/runtime data by default. They MUST NOT be left readable or writable by `anon` or `authenticated` merely because they are useful to operators.

Enabling RLS without an explicit policy plan is not a complete remediation. The required sequence is:

`classify → define actors → define permitted operations → define predicates → test deny/allow cases → enable RLS → verify service paths → re-run security audit`

## PostGIS/provider-managed boundary

PostGIS is provider-managed infrastructure. A migration that repeatedly issues `REVOKE EXECUTE` is not a durable control when the provider reasserts extension privileges.

For the hosted project, the observed state MUST therefore be treated as a provider-boundary finding until the extension is placed in a dedicated schema or otherwise restricted through a provider-supported configuration path.

Do not represent ineffective privilege statements as a successful remediation.

## API-key lifecycle

The ecosystem MUST support Supabase publishable/secret API keys and treat legacy `anon` / `service_role` names as migration debt. Public/browser code uses a publishable key; secure server-side components use a secret key. Secret material MUST NOT enter source control, client bundles, telemetry payloads or application event bodies.

The migration is staged:

`discover references → provision new keys → migrate clients → migrate server components → verify last-use of legacy keys → disable legacy keys → retain rollback evidence`

No key migration step should require embedding a secret into code or logs.

## Secret telemetry invariant

Observability captures control metadata, not secrets. Redaction MUST happen before emission where feasible. At minimum, the following classes are prohibited from event bodies and attributes:

- API keys and bearer tokens
- authentication cookies/session secrets
- private signing material
- full payment credentials
- passwords and recovery secrets

Identifiers that are necessary for correlation belong in structured attributes, not in event names.

## Event semantics

Operational events SHOULD follow a stable, domain-specific event name and place dynamic identifiers in attributes. Events represent meaningful occurrences; duration-bearing operations are represented as spans where appropriate.

Required correlation context for consequential events:

`event_id + event_name + occurred_at + observed_at + actor/principal + subject + source + correlation_id + causation_id + parent_event_id + trace_id + schema_version + policy_version`

## Agent boundary

An agent is an actor with delegated capability, not an authority source. Agent execution MUST remain constrained by:

`identity → delegation → capability → scope → jurisdiction → policy → risk class → approval gate → execution → evidence → audit`

An agent may propose, classify, route or execute an authorized capability. It MUST NOT manufacture authority, silently broaden scope, resolve constitutional conflicts, or turn an unverified external response into Actual state.

High-impact or irreversible actions require explicit stronger gates and, where policy requires, human approval.

## Provider independence

External services are replaceable adapters. Their outage, schema, pricing, rate limit, or privilege model MUST NOT silently redefine OMNII semantics.

Provider-specific constraints are recorded as implementation/runtime facts and reconciled against the canonical contract.

## Promotion rule

A security control is not considered production-ready merely because code exists. Promotion requires:

`policy defined + implementation present + deny/allow tests + runtime verification + evidence + rollback path`

Unresolved provider constraints remain visible findings rather than hidden exceptions.
