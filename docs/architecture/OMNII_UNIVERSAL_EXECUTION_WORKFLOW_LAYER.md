# OMNII Universal Execution & Workflow Layer

**Status:** CANONICAL COMPOSITION LAYER — 2026-09-07  
**Authority:** subordinate to OMNII governance, authority, policy and lifecycle semantics

## Purpose

Turn governed intent into observable execution across products, institutions, agents and territories while preserving human/legal authority boundaries.

## Core model

`Intent → Plan → Authorization → Workflow → Task → Assignment → Action → Evidence → Checkpoint → Fulfillment → Outcome`

## Universal workflow object

A workflow is a governed composition of stages and transitions. It contains:

`workflow_id + subject + trigger + policy + stages + actors + required_authorizations + evidence_rules + deadlines + escalation + completion_conditions`

Products may specialize templates, but the lifecycle semantics remain shared.

## Work types

The layer covers applications, approvals, registrations, trade, education, inspections, maintenance, transport, healthcare, government services, media production, financial operations, institutional processes and agent tasks.

## State machine

Every stage supports explicit states:

`pending → ready → assigned → active → blocked → waiting → completed`

Failure and exceptional states include:

`rejected, cancelled, expired, suspended, escalated, disputed, compensated`

No state transition bypasses required authority or evidence.

## Assignment and routing

Work may be routed to humans, teams, organizations, agents, systems or external providers according to capability, availability, authority, geography, policy and contextual risk.

Routing is not authority. An assignee receives only the authority explicitly granted by the governing workflow context.

## Human-in-the-loop controls

Policies can require human review for defined action classes. The workflow must fail closed when required approval is absent, stale or revoked.

Human approval records identify the principal, role, decision, scope, timestamp, evidence context and expiry where applicable.

## Evidence and checkpoints

Material actions produce evidence and checkpoints. A checkpoint can validate identity, authority, quality, safety, delivery, financial condition, legal condition or another declared criterion.

Evidence can be machine-generated but consequential acceptance remains governed by policy.

## Timers and escalation

Workflows support due dates, service windows, reminders, expirations, retries, escalation ladders and handoffs. Timer-driven automation cannot elevate its own authority.

## Idempotency and recovery

Actions that may be retried must carry idempotency keys and deterministic correlation to the originating intent/IO event. Recovery follows:

`detect → isolate → retry/repair → validate → resume/compensate`

## External execution

External services are integrated through adapters/connectors. Their responses become observations/evidence until validated under local workflow policy.

## Transaction and settlement integration

Execution can emit obligations and settlement instructions. The workflow remains the operational process; the settlement layer remains the authority for settlement state.

## Pulse integration

Outcomes, delays, quality, resource use, failures and realized value feed Pulse. Pulse informs optimization and learning but cannot retroactively rewrite the historical workflow.

## Interoperability

Cross-system execution carries correlation IDs, provenance, source authority, schema mapping and delivery status. Imported state must remain distinguishable from locally verified state.

## Conformance invariant

**Every consequential action must have an attributable trigger, authority context, execution record and observable outcome.**
