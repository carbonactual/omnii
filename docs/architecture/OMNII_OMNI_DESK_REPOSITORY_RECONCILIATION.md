# OMNII OMNI / DESK Repository Reconciliation

**Status:** CANONICAL ARCHITECTURE RECONCILIATION — 2026-09-16
**Scope:** `carbonactual/desk`, `carbonactual/omni`
**Rule:** Preserve repository history and compatibility identifiers. No rename, merge, archive or deletion is implied by this document.

## 1. The collision

Two repositories use the `OMNI` name for different layers:

| Repository | Current semantic role | Public identity | Compatibility identity |
|---|---|---|---|
| `carbonactual/desk` | Economic participation composition: trade, sourcing, markets, investment, exchange, capacity, logistics, settlement coordination and related economic workflows | **OMNI Economic Participation** | `desk`, historical `Desk*` objects, repository name `desk` |
| `carbonactual/omni` | Operating/integration surface: runtime, routing, provider adapters, browser/terminal, MCP/A2A/API integrations, state/event surface | **OMNI Operating Surface** | repository/product id `omni` |

This is a naming collision, not evidence that one repository should be deleted or collapsed into the other.

## 2. Canonical topology

The public architecture is:

```text
OMNII
  ├─ constitutional + universal composition semantics
  ├─ Common Layer / Capability Fabric
  └─ Universal Composition Engine

ABBA
  └─ master intelligence / orchestration

OMNI Operating Surface
  └─ operating, routing, integration and provider-adapter surface

OMNI Economic Participation
  └─ economic-domain composition using Trade / Market / Investment / Exchange / Value / I/O capabilities

DESK
  └─ participant dashboard/workspace concept, not a competing economic semantics layer

SPOTIST
  └─ universal SEEK: discovery / matching / tracing / qualification / monitoring

I/O
  └─ movement / crossing / ledger and value-motion capabilities
```

The operating surface and economic participation surface may both expose OMNI-branded experiences, but they must not define competing universal primitives.

## 3. Repository boundaries

### `carbonactual/desk`

The repository is historically and operationally the economic composition surface. Its README already reframes the user-facing identity as OMNI while retaining `desk` compatibility identifiers. The repository may continue to contain internal `Desk*` identifiers while those identifiers are treated as historical compatibility names rather than canonical ecosystem semantics.

It consumes canonical discovery, matching, identity, authority, workflow, evidence, value, exchange, settlement, I/O, Pulse and recovery capabilities. Its economic scope remains a composition, not a new economic constitution.

### `carbonactual/omni`

The repository is the operating/integration surface. Its current README places it between canonical OMNII contracts and providers, routing work through an ABBA orchestration boundary and provider abstraction. It must not introduce a second capability registry, identity semantics, authority system or value ledger.

Its capability registry directory is an implementation detail and must map to the canonical capability fabric rather than become a new source of semantic truth.

### DESK

`DESK` is reserved for the participant dashboard/workspace presentation concept. It is not the canonical name of the economic capability family and it is not a third operating substrate.

The dashboard can consume OMNI Economic Participation, OMNI Operating Surface, SPOTIST, HAPI, I/O and other shared capabilities.

## 4. Shared capabilities

The following belong to the reusable ecosystem fabric and may be consumed by both repositories:

- identity and representation;
- intent and request;
- discovery and matching;
- authority and authorization;
- communication;
- workflow and task management;
- evidence and provenance;
- resource and availability;
- offer, order, transaction and exchange;
- market and opportunity discovery;
- settlement and reconciliation;
- interoperability and provider adapters;
- event / interaction / handoff;
- Pulse and learning;
- continuity, recovery, Ash and Phoenix.

These capabilities are not owned by either OMNI repository merely because one repository uses them first or most heavily.

## 5. Compatibility mapping

| Historical identifier | Meaning today | Action |
|---|---|---|
| repository `carbonactual/desk` | OMNI Economic Participation implementation | preserve until a governed migration exists |
| `product_id: desk` in inherited Carbon Actual registry | historical compatibility key for the economic composition | preserve; do not silently repurpose |
| `DeskNeed`, `DeskPool`, `DeskQuote`, `DeskShipment`, `DeskSettlement`, etc. | internal compatibility names for OMNI economic domain objects | preserve until versioned migration is proven |
| repository `carbonactual/omni` | OMNI Operating Surface implementation | preserve |
| `DESK` | participant dashboard/workspace concept | reserve for dashboard composition |
| `OMNII` | constitutional/runtime ecosystem substrate | never use `OMNI` as a substitute |

## 6. Reconciliation rules

1. A new document or manifest must name the semantic layer, not rely on `OMNI` alone when ambiguity is possible.
2. `OMNI Economic Participation` and `OMNI Operating Surface` are distinct product/composition roles even though both use the OMNI brand.
3. `DESK` means participant workspace/dashboard unless a historical identifier is explicitly marked for compatibility.
4. No new capability may be declared as canonical solely because it is implemented in one OMNI repository.
5. Both OMNI repositories must consume canonical Common Layer contracts and capability adapters.
6. SPOTIST remains the universal SEEK capability; sourcing/provider discovery is an economic composition of SPOTIST, not a duplicate discovery primitive.
7. Authority remains separate from capability, matching, readiness and provider availability.
8. Economic execution remains subject to HAPI/SEAL, I/O, value and settlement boundaries.
9. Product exit must preserve canonical participant/entity records, obligations, evidence, events and compatibility identifiers.
10. A future rename may occur only after migration fixtures demonstrate that links, events, manifests, provider integrations, downstream consumers and historical provenance remain reconstructable.

## 7. New-build rule

When a future requirement could fit either OMNI repository:

```text
semantic capability
→ canonical capability fabric
→ appropriate OMNI composition
→ appropriate operating surface
→ participant presentation (DESK where applicable)
```

Do not solve the ambiguity by adding a third OMNI-like primitive.

## 8. Source evidence

The reconciled roles are derived from the current repository documentation:

- `carbonactual/desk/README.md` currently describes the repository as **OMNI — the Carbon Actual economic participation platform**, with `Desk*` identifiers retained for compatibility.
- `carbonactual/omni/README.md` currently describes the repository as the **OMNI operating/integration surface**, explicitly subordinate to OMNII and ABBA contracts.
- The Carbon Actual product manifest registry currently retains `product_id: "desk"` mapped to `carbonactual/desk` and `product_id: "omni"` mapped to `carbonactual/omni`.

This reconciliation preserves those historical facts while making the semantic distinction explicit.
