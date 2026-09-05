# BUNK Product Extraction Design

**Date:** 2026-09-05  
**Repository:** `carbonactual/omnii`  
**Status:** Approved architecture; canonical product-boundary specification

## 1. Purpose

BUNK is a first-class Carbon Actual / OMNII product for property, housing, accommodation, investment, and property operations. BUNK is not a foundation subsystem and is not a second ecosystem architecture.

The product consumes OMNII's universal substrate and uses TIP as its economic foundation tool. Existing BUNK implementation is preserved by provenance and consolidated into this product boundary.

## 2. Canonical placement

```text
OMNII ecosystem
├── Universal foundation/runtime
│   ├── Identity
│   ├── Objects / Graph / Relationships
│   ├── Authority / SEAL
│   ├── Registries
│   ├── Evidence / Proof
│   ├── Persistence / Vault / Atlas boundaries
│   ├── Events / Ledger / Pulse
│   ├── ABBA / Agents / Workflows
│   └── Governance / Constitutional controls
│
├── Foundation tools
│   └── TIP
│       ├── Trade
│       ├── Investment
│       ├── Value Markets
│       ├── Financing
│       ├── Collateral
│       ├── Settlement
│       └── Tokenization
│
└── Products
    └── BUNK
```

Dependency direction is strictly downstream: OMNII foundation -> TIP/other shared capabilities -> BUNK. BUNK must never redefine or fork universal identity, authority, graph, persistence, ledger, or economic semantics.

## 3. Product definition

**Positioning:** Property, properly connected.

BUNK connects property identity, human relationships, permissions, evidence, agreements, payments, operations, intelligence, and value into a governed property experience.

The north-star outcome is verified successful property outcomes.

## 4. Product surfaces

### 4.1 Customer surface

Discovery, property and unit views, listings, wanted requests, explainable matching, saves, lead progression, inspections, offers, agreements, payments, tenancy, maintenance, property Proof, trust/verification status, notifications and outcome feedback.

### 4.2 Partner/operator surface

Owner, agent, agency, manager, inspector, lawyer, valuer, vendor, developer, sponsor and other authorized operational roles; portfolios; assignments; inspections; property operations; leads; agreements; payment tracking; maintenance; evidence; cases; reporting.

### 4.3 Internal command surface

Verification, moderation, human SEAL review, risk/cases, reconciliation, audit, providers, ABBA routing, swarms, analytics, security and product/system health.

## 5. BUNK-specific domain

BUNK may define property-domain representations and workflows, but canonical cross-product objects remain OMNII objects.

BUNK-specific concepts include:

- property and unit product views;
- listing and wanted-request experiences;
- property discovery and matching;
- inspection workflow;
- property offers and negotiation workflow;
- agreement/tenancy workflow;
- property payment tracking and operational cash flows;
- maintenance/work-order workflow;
- property professional/operator profiles and assignments;
- property-specific verification and trust presentation;
- property portfolio and operational views;
- property-specific outcome measurement and Pulse composition.

A property record is distinct from a listing. Evidence is distinct from verification. Verification is distinct from public disclosure.

## 6. TIP integration

TIP is not embedded as a duplicate BUNK economic subsystem. BUNK consumes TIP contracts and capabilities for:

- sale and purchase markets;
- leasing/rental markets;
- property services and maintenance markets;
- financing and mortgage-related orchestration where lawful and enabled;
- investment and property participation;
- collateralization;
- insurance/risk markets;
- deposits/escrow/settlement flows;
- fractionalized/tokenized property exposure where lawful and enabled;
- secondary markets and transfers;
- property capacity and usage markets;
- agent-mediated and automated economic workflows.

BUNK owns the property experience and property-domain workflow. TIP owns the canonical economic semantics, market mechanisms and settlement abstractions.

## 7. Universal OMNII integration

BUNK consumes:

- one canonical identity model;
- one authority/SEAL model;
- one relationship/graph model;
- one evidence/provenance model;
- one event and Pulse model;
- one persistence boundary;
- one audit/ledger boundary;
- one ABBA/orchestration boundary;
- shared agent, task, execution and reconciliation primitives.

BUNK may compose these capabilities but may not establish competing versions.

## 8. Trust and governance

Non-negotiable controls:

1. AI cannot grant SEAL or make final high-impact decisions.
2. Important claims retain ROOT lineage.
3. Private records remain in VAULT boundaries.
4. Public ATLAS publication requires valid human permission.
5. Financial records are append-only after posting.
6. A listing may not be represented as verified unless its required verification route is complete and current.
7. BUNK role activation remains linked to human identity, optional organization context, permissions and SEAL where required.
8. Product automation must honor authority, consent, privacy, risk and jurisdictional constraints.

## 9. Existing materialization to preserve

The product extraction must consolidate, not discard, existing materialization including:

- `supabase/migrations/0001_bunk_marketplace_core.sql`;
- `supabase/migrations/0002_bunk_auth_roles_permissions.sql`;
- `packages/shared/src/domain.ts`;
- `packages/shared/src/demo-data.ts`;
- `packages/permissions/src/product-roles.ts`;
- `packages/permissions/src/index.ts`;
- `packages/auth/src/types.ts`;
- `packages/auth/src/supabase-server.ts`;
- `packages/auth/src/supabase-browser.ts`;
- BUNK-facing routes under `apps/web/app/`;
- the existing BUNK build manifest/dependency/evidence material under `builds/BUNK/`.

The build area remains a handoff/evidence index. It is not a reason to duplicate source code.

## 10. Product contract

The canonical BUNK product manifest should expose:

- product identity and version;
- product status/maturity;
- purpose and north-star outcome;
- capabilities;
- required OMNII capabilities;
- TIP dependencies;
- BUNK-specific domain objects/views;
- workflows and state transitions;
- roles and permissions;
- evidence and verification requirements;
- authority requirements;
- economic actions delegated to TIP;
- events/Pulse outcomes;
- persistence classification;
- public/private projection rules;
- metrics and health signals;
- known implementation and evidence gaps;
- provenance to existing source files/commits.

## 11. Missing capability discovery

Extraction is not considered complete merely because existing files are catalogued. The implementation pass must classify every discovered BUNK concern as one of:

- OMNII shared capability;
- TIP capability;
- BUNK product capability;
- external integration;
- prohibited/invalid duplication.

Anything missing from the current product experience should be recorded as a product gap and built only when it belongs inside the agreed BUNK boundary.

## 12. Success criteria

The extraction is successful when:

- BUNK has an explicit canonical product boundary under OMNII;
- BUNK-specific capabilities are discoverable from one product manifest;
- TIP is the sole canonical economic foundation consumed by BUNK;
- no duplicate identity, authority, graph, persistence, ledger or universal economic semantics are introduced;
- existing BUNK functionality remains reachable and provenance-preserving;
- product workflows are testable end-to-end at the boundaries available in the repository;
- tests prove dependency direction and rejection of prohibited duplication;
- the repository documents the final product composition and known runtime/evidence gaps honestly.

## 13. Explicit non-goals

This extraction does not:

- create a separate BUNK repository;
- create a BUNK-only universal identity or authority model;
- create a BUNK-only TIP database or ledger;
- replace OMNII constitutional definitions;
- certify production deployment merely because documentation is consolidated;
- enable regulated financial products without their required compliance controls and feature flags.
