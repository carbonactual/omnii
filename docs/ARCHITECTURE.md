# BUNK Architecture

## System shape

BUNK begins as a modular Next.js and Supabase application with explicit service boundaries so modules can separate later without rewriting the product model.

## Shared Carbon Actual layers

- `#`: immutable internal identity plus readable public references.
- `HAPI`: relationships, consent scope, obligations, trust, disputes, agreements, and communications.
- `SEAL`: human-only approval, rejection, amendment, revocation, and disclosure authority.
- `ROOT`: source, provenance, versions, and lineage.
- `INDEX`: property, transaction, location, risk, verification, occupancy, and matching classification.
- `VAULT`: protected documents and restricted access.
- `PROOF`: claims, evidence, verification stage, confidence, expiry, visibility, and dispute state.
- `PULSE`: meaningful events for timelines, audit, analytics, notifications, and orchestration.
- `ACTUAL`: a formed state reached only after evidence and required human authority.
- `ATLAS`: permitted public property knowledge.
- `I/O`: payment-provider abstraction, reconciliation, ledger, and value attribution.
- `ABBA`: intent resolution, swarm routing, suggestions, missing-information detection, and escalation.

## Bounded modules

Identity, organizations, properties, units, listings, wanted requests, discovery, matching, CRM, inspections, applications, offers, agreements, payments, tenancy, maintenance, partners, affiliates, investments, communications, trust, cases, AI, swarms, analytics, and system administration.

## Request flow

1. Authenticate the actor.
2. Resolve active role and organization context.
3. Validate input with typed schemas.
4. Authorize through role, relationship, ownership, and SEAL policy.
5. Execute inside a transaction.
6. Append audit and Pulse records.
7. Generate or link Proof where required.
8. Return structured data, errors, correlation ID, and next actions.

## AI boundary

Agents have identities, versions, scopes, least-privilege tools, budgets, evaluation rules, and escalation thresholds. Agent output records sources, confidence, provider, tool calls, and ROOT lineage. No agent can create its own SEAL, publish protected Proof, release funds, accept offers, sign agreements, or decide disputes.

## Deployment environments

Development, staging, and production use separate Supabase projects, storage buckets, payment credentials, AI budgets, webhook secrets, analytics projects, and feature flags. Preview deployments must never receive production secrets.

## Release gates

A release requires passing type checks, unit tests, permission and RLS tests, API integration tests, payment-webhook tests, accessibility checks, security checks, migration validation, backup verification, and human product-owner SEAL.
