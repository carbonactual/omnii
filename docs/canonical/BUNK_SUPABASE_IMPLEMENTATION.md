# BUNK Supabase Implementation

**Status:** LIVE MATERIALIZED
**Product:** BUNK
**Ecosystem:** OMNII
**Economic foundation:** TIP

## Live materialization

The canonical Supabase project has the BUNK property data layer deployed and verified at the database level.

| Layer | Live count | Purpose |
|---|---:|---|
| OMNII registries | 4 | Property, rights, participants and listings registry boundaries |
| Registry nodes | 54 | Property categories, rights, listing types and value-chain roles |
| Registry edges | 14 | Property-to-right, property-to-listing and lifecycle relationships |
| OMNII form templates | 22 | Governed property, listing, rights, due diligence, finance, service and lifecycle forms |
| `bunk_*` tables | 9 | Rights, wanted requests, offers, agreements, maintenance, intelligence, participants, development and property payments |
| BUNK institutional bindings | 1 | Connects BUNK forms, workflows, registries and capabilities into OMNII |
| Signup bootstrap | 1 | Auth-user → profile + initial BUNK role provisioning |

## Core shared tables

BUNK also uses the existing shared property/application tables: `profiles`, `organizations`, `organization_members`, `properties`, `units`, `proof_records`, `seal_requests`, `seal_decisions`, `listings`, `listing_saves`, `inspections`, and Pulse/event infrastructure.

The property and listing layer retains the important invariant that publication requires the appropriate authority proof and human SEAL decision.

## BUNK-specific tables

- `bunk_property_rights`
- `bunk_wanted_requests`
- `bunk_offers`
- `bunk_agreements`
- `bunk_maintenance_work_orders`
- `bunk_property_intelligence`
- `bunk_property_participants`
- `bunk_development_projects`
- `bunk_property_payments`

These are downstream BUNK materializations. They do not create a second OMNII identity, authority, graph, persistence, ledger or canonical economic system.

## Registry composition

Registries are represented through OMNII's shared `omnii_registries`, `omnii_registry_nodes` and `omnii_registry_edges` structures. BUNK therefore becomes discoverable by OMNII rather than creating a separate registry ontology.

The current registry families are:

- `BUNK:PROPERTY`
- `BUNK:RIGHTS`
- `BUNK:PARTICIPANTS`
- `BUNK:LISTINGS`

Frontier categories such as space assets, extraterrestrial resource candidates and unknown property candidates remain classifications, not automatic grants of ownership, sovereignty, authority, market eligibility or investment eligibility.

## Forms and workflows

BUNK uses the shared OMNII `omnii_form_templates` substrate. The current form set covers:

Property intake, listing creation, wanted requests, inspections, offers, agreements/tenancy, maintenance work orders, valuation/feasibility, development projects, property verification, participant onboarding, transfer/closure, land-rights evidence, due diligence, explainable matching, financing requests, insurance/risk, property service jobs, artisan/vendor onboarding, property portfolios, redevelopment/adaptation, and recovery/reuse.

Forms retain authority, evidence, provenance, privacy, timing, workflow and economic-boundary metadata. Economic forms explicitly delegate canonical economic semantics to TIP.

## Institutional binding

`BUNK:INSTITUTIONAL_BINDING` binds the BUNK product to its forms, workflow vocabulary, registries and shared capabilities, while preserving OMNII authority and TIP economic boundaries.

## Security

RLS is enabled on the BUNK-specific tables and on the core property/listing tables used by BUNK. Public access is limited to intentionally public property/listing projections; authenticated access is scoped to the relevant owner, participant or operational role. The broader Supabase project still has pre-existing security-advisor findings outside this BUNK-specific closure.

## Auth

A database trigger provisions a BUNK profile and default `property_seeker` role for newly created auth users unless an allowed initial role is supplied. The trigger is not an authority issuer and does not grant SEAL.

## Evidence boundary

This document records live database materialization verified against the canonical Supabase project. It does not certify external land/title integrations, regulated financial activation, production ABBA behavior, legal recognition of frontier property classifications, or end-to-end application CI/deployment until those environments provide corresponding evidence.
