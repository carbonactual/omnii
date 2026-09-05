# BUNK Product Manifest

**Product ID:** `BUNK`
**Ecosystem:** `OMNII`
**Role:** Universal property product
**Economic foundation:** `TIP`
**Positioning:** Property, properly connected.
**North star:** Verified successful property outcomes.

## Canonical placement

BUNK is a downstream product composition of the OMNII ecosystem. It is not a standalone platform architecture, foundation subsystem, alternate universal runtime, or alternate economic system.

`OMNII foundation → shared capabilities → TIP economic foundation → BUNK property product experience`

## Scope

Universal property domain across land, parcels, estates, buildings, units, infrastructure, fixtures and property-linked movable objects; tenure, title representations and property rights/interests; access, spatial and temporal interests; cemetery, burial and memorial interests; natural/ecological property; biological/material candidates; cultural/heritage property; intangible/digital property; property-linked financial interests; development interests; capacity interests; space assets; extraterrestrial resource candidates; and unknown property candidates.

BUNK is intentionally chronological and future-facing: historical/customary, contemporary, emerging, futuristic, extraterrestrial and unknown forms are representable without assuming identical legal treatment.

## Product capabilities

Discovery, search, listings, wanted requests, matching, property/unit views, land/title/tenure evidence presentation, due diligence, valuation/feasibility workflows, inspection, offers, negotiation, agreements, tenancy, payments, property/facility operations, maintenance, vendor/artisan coordination, property professionals, development workflows, finance/investment journeys, property portfolios, property intelligence, risk/compliance, recovery/reuse and lifecycle management.

## Property value chain

Discovery → mapping → tenure/rights → evidence → due diligence → valuation → planning → acquisition/assembly → land banking → capital/finance → design → procurement → construction → inspection/certification → market/listing → negotiation → contract → economic execution → settlement → occupancy/use → operations → maintenance → insurance/tax/compliance → measurement/intelligence → refinancing/reinvestment → transfer/inheritance → redevelopment/adaptation → recovery/reuse/repurpose/recycling → retirement/preservation/archive.

## Economic composition

BUNK delegates canonical property economic semantics to TIP for sale/purchase markets, leasing/rental markets, property services markets, financing, investment, pooled participation, fractionalization, decimalization, collateralization, insurance/risk markets, secondary exposure, capacity/usage markets, tokenization and settlement, subject to jurisdiction and policy.

BUNK may present these capabilities as one seamless product experience but must not create a parallel canonical market, investment, financing, tokenization or settlement ontology.

## Shared dependencies

OMNII supplies identity, authority/SEAL, objects, graph, relationships, registries, evidence/provenance, persistence/Vault/Atlas, events/ledger/Pulse, agents, ABBA, workflows, governance and reconciliation.

## Roles and value-chain participants

Owners, sellers, buyers, tenants, landlords, investors, developers, communities, institutions, governments, agents, brokers, agencies, managers, inspectors, surveyors, valuers, lawyers, planners, architects, engineers, quantity surveyors, contractors, builders, artisans, vendors, suppliers, financiers, insurers, facility managers, maintenance providers, security/cleaning providers, technology operators and other authorized participants.

## Lifecycle

Discovery → identification → mapping → registration → tenure/rights → evidence/due diligence → valuation/feasibility → planning → acquisition/assembly → finance/investment → design → procurement → construction → inspection/certification → listing/market → negotiation → contract → settlement → occupancy/use → operations → maintenance → insurance/tax/compliance → measurement/intelligence → refinance/reinvestment → transfer/inheritance → redevelopment/adaptation → recovery/reuse/repurpose/recycling → retirement/preservation/archive.

## Frontier policy

Historical/customary, emerging, futuristic and extraterrestrial cases are representable. Unknown remains an epistemic classification. No frontier or unknown classification can independently establish ownership, sovereignty, personhood, consent, authority, legal recognition, tradeability or investment eligibility.

## Conformance requirements

- BUNK remains downstream of OMNII.
- BUNK consumes, rather than replaces, OMNII universal capabilities.
- TIP is the canonical economic foundation tool consumed by BUNK.
- No BUNK-specific universal identity, graph, authority, persistence or canonical economic ledger.
- Property record ≠ listing.
- Evidence ≠ verification.
- Verification ≠ disclosure.
- Intelligence ≠ authority.
- AI/agents cannot grant SEAL or bypass human/jurisdictional controls.
- Material lifecycle state changes retain authority and evidence references.
- Product implementations must classify new capabilities before adding them and reject prohibited duplication.

## Runtime conformance

The machine-checkable BUNK boundary is materialized in `packages/omnii-runtime/src/bunk-product-manifest.ts`, exported from `packages/omnii-runtime/src/index.ts`, and covered by `packages/omnii-runtime/tests/bunk-product-conformance.test.ts`. The runtime manifest enforces the OMNII dependency set, TIP as the economic foundation, and explicit rejection rules for universal capability duplication.

## Provenance

Existing BUNK materialization remains canonical by provenance: `supabase/migrations/0001_bunk_marketplace_core.sql`, `supabase/migrations/0002_bunk_auth_roles_permissions.sql`, `packages/shared/src/domain.ts`, `packages/permissions/src/*`, `packages/auth/src/*`, BUNK-facing web routes and `builds/BUNK/*`. Runtime contracts are additive and exported from `packages/omnii-runtime/src/index.ts`.

## Evidence status

The BUNK product architecture, composition contract, product manifest and pure runtime contracts are materialized in this repository. Production deployment, live Supabase/RLS behavior, external land/title integrations, regulated financial activation and end-to-end production ABBA/event integration remain environment evidence questions and are not certified by documentation alone.
