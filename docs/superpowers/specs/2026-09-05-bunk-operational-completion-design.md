# BUNK Whole-Ecosystem Operational Completion Design

## Purpose

Complete BUNK as a real operating product inside Carbon Actual / OMNII. BUNK must consume the whole OMNII ecosystem substrate rather than treating TIP as its sole upstream dependency.

## Architectural Position

```text
OMNII ecosystem / constitutional substrate
  ├─ identity + HAPI human context
  ├─ authority + SEAL
  ├─ objects + relationships + registries
  ├─ evidence + provenance + proof
  ├─ persistence / Vault / Atlas / Actual
  ├─ events + Pulse + audit + ledger boundaries
  ├─ workflows + task queue + process workers
  ├─ ABBA + agents + routing + intelligence
  ├─ security / consent / policy / operating context
  ├─ TIP — trade, investment, finance and value markets
  └─ shared ecosystem capabilities and future products
          ↓
        BUNK
```

TIP is BUNK's economic foundation tool where economic intent, market, financing, trade, investment, settlement, collateral or related financial activity is required. BUNK may also invoke every other relevant OMNII capability directly according to authority and policy.

## Operating Loop

Every consequential BUNK action follows:

`identity/context → intent/form → validation → evidence/provenance → workflow → human/agent task → authority/SEAL where required → governed state transition → TIP when economic → OMNII event/Pulse/audit → next action`

Intelligence never grants authority. ABBA never becomes a SEAL issuer. A form submission never equals approval. A listing never equals verified property. TIP never replaces OMNII authority or persistence.

## Scope

The completion pass covers property registration, rights, listings, discovery, wanted requests, offers, agreements, inspections, development, maintenance, payments, intelligence, participants, verification, evidence, publication, lifecycle progression, audit/Pulse, and the corresponding forms/review queues and API/UI paths.

The product must use the live Supabase/OMNII substrate and existing form/registry infrastructure. New tables are permitted only for genuinely BUNK-specific state that cannot be represented by existing OMNII primitives.

## Production Boundaries

External land/title registries, regulated financial rails, insurance carriers, government approvals, licensed professional credentials and other third-party systems remain explicit integration boundaries. BUNK may represent requests, evidence, status and references without pretending that an external authority has been exercised.

## Success Criteria

- BUNK uses live persisted records rather than demo-only data for its operating paths.
- Forms create governed submissions connected to workflow/process state.
- Review and verification states are visible and actionable.
- Consequential transitions require the appropriate authority and evidence.
- Economic actions route through TIP while non-economic ecosystem capabilities remain directly consumable.
- Property state, listing state, rights, evidence, intelligence, workflows and outcomes share one property identity/reference context.
- OMNII events/Pulse/audit boundaries capture material outcomes.
- No duplicate universal identity, authority, graph, registry ontology, persistence or canonical economic ontology is created.
- The product remains extensible to new property forms, unknown/frontier objects, and future ecosystem capabilities.
