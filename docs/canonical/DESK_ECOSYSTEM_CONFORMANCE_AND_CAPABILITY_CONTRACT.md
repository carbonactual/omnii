# Desk — Ecosystem Conformance & Capability Contract

**Ecosystem:** Carbon Actual / OMNII  
**Status:** CANONICAL DESIGN  
**Role:** Ecosystem economic coordination composition  
**Important:** Desk is a product composition, not a standalone economic system.

---

## 1. Constitutional position

The Desk is the ecosystem's user-facing economic coordination composition for finding, comparing, arranging and completing legitimate exchanges of goods, services, capabilities, rights, resources and other value.

It MUST consume shared ecosystem primitives. It MUST NOT create competing identity, value, registry, authority, ledger, governance, market or participant ontologies.

```text
CARBON ACTUAL CONSTITUTION
          ↓
      OMNII CORE
          ↓
 ABBA / AUTHORITY / POLICY
          ↓
 ┌────────┼──────────┐
ACTUAL   ATLAS      REGISTRIES
  │        │           │
  └────────┼───────────┘
           ↓
          TIP
 Trade / Investment / Value Markets
           ↓
         DESK
 discover → compare → coordinate → execute
           ↓
   IO / LEDGER / SETTLEMENT
           ↓
          PULSE
           ↓
         VALUE
           ↓
       next state
```

Desk is therefore a **composition of ecosystem capabilities** and may itself expose multiple user experiences without becoming multiple ontologies.

---

## 2. Desk constitutional purpose

The Desk exists to answer a universal economic request:

> **Find the best legitimate way to satisfy what this person or entity needs, using what is available, anywhere in the relevant value network.**

It supports both directions:

```text
I NEED → find supply
I HAVE → find demand
I CAN DO → find work/service demand
I CAN PROVIDE → find opportunity
I WANT TO MOVE → find movement/service
I WANT TO EXCHANGE → find counterpart
I WANT TO FUND → find eligible value/opportunity
I WANT TO RECOVER → find secondary value
```

The Desk may coordinate one person, two neighbors, a market, an enterprise, a national supply chain or a multi-country transaction.

---

## 3. Ecosystem capabilities consumed

Desk should compose, not duplicate:

### Constitutional / intelligence
- ABBA orchestration
- human authority / Seal
- policy and consent gates
- provenance and evidence
- governance
- constitutional object registry

### Economic foundation
- TIP Market Objects
- TIP Master Taxonomy
- market-form vocabulary
- valuation and value conversion
- financing
- investment
- risk/protection
- tokenization/fractionalization
- environmental/circular value

### State and knowledge
- Actual current state
- Atlas discoverability/context
- registries
- identity/KYC/KYB
- inventory and capacity
- location and movement state
- relationship graph

### Operations
- forms
- workflows
- documents
- approvals
- cases/disputes
- notifications
- scheduling
- Universal Movement / Charter
- storage and custody
- insurance
- inspection and certification
- settlement and reconciliation

### Feedback
- Pulse
- reviews and reputation
- delivery/outcome evidence
- loss and recovery
- lifecycle revaluation

---

## 4. Product boundary

Desk is not constitutionally:

- a bank
- an insurer
- a freight forwarder
- a customs authority
- a marketplace that owns all inventory
- a legal authority
- a universal clearing house
- a replacement for government registries
- a replacement for licensed financial/insurance/logistics providers

Desk can coordinate, compare, route, integrate and orchestrate those services where lawful.

Where a licensed third party must perform a regulated function, Desk represents the relationship and hands execution to the authorized rail.

---

## 5. Universal request model

Every request should be representable as a structured Intent:

```yaml
intent_id:
principal:
request_type: need | have | capability | service | exchange | funding | recovery | movement
object_or_capability:
quantity:
unit:
quality:
substitutions_allowed:
location_from:
location_to:
required_by:
urgency:
budget_or_value_limit:
acceptable_value_forms: []
market_forms: []
standards_required: []
regulatory_constraints: []
privacy_level:
minimum_confidence:
risk_tolerance:
local_preference:
relationship_preference:
return_terms:
financing_preference:
insurance_required:
provenance_required:
success_condition:
```

A simple user interface can collect only the necessary fields while the system constructs the full record underneath.

---

## 6. Supply representation

Supply may be:

- ready stock
- made-to-order
- used goods
- refurbished goods
- spare parts
- raw material
- processed material
- by-product
- recyclable
- waste with recoverable value
- idle inventory
- idle capacity
- service capacity
- human capability
- machine capability
- compute/data capacity
- property
- livestock
- vehicles/equipment
- financial capital where eligible
- rights/access
- future production
- future delivery

Supply may be formal, informal, local, cross-border, institutional or distributed.

The system records what is **known**, not what it wishes were true.

---

## 7. Demand representation

Demand may be explicit or inferred from permitted signals:

- direct request
- recurring order
- shortage
- reservation
- contract requirement
- procurement/tender
- forecast
- inventory depletion
- local price spread
- route imbalance
- community signal
- enterprise planning
- export buyer requirement
- emergency need

Inferred demand must be labeled as inferred and confidence-scored.

---

## 8. Match engine

The matching objective is not “lowest price”.

It is a constrained ranking across:

```text
FIT
QUALITY
LEGAL ELIGIBILITY
AVAILABILITY
URGENCY
TOTAL LANDED COST
TIME
LOCAL VALUE CREATION
RISK
REPUTATION
CARBON / ENVIRONMENTAL FACTORS
RELIABILITY
RETURN / WARRANTY
FINANCING FEASIBILITY
INSURANCE FEASIBILITY
```

The user should receive a small number of understandable options with the true state of each option.

---

## 9. Local-first policy

Desk should prefer local supply/workforce when all material constraints remain acceptable.

A local match should receive a positive preference where it provides comparable or better:

- quality
- standards
- legality
- total value
- timing
- reliability
- risk

Local priority is not permission to lower standards.

Local capacity that currently fails required standards may be routed into:

```text
training → tooling → inspection → process improvement → certification → market access
```

Thus Desk can create demand for upgrading local capability rather than permanently excluding it.

---

## 10. Standards ladder

Every relevant good/service can carry an explicit quality state:

```text
UNVERIFIED
OBSERVED
BASIC
VERIFIED
STANDARD
PREMIUM
CERTIFIED
SPECIALIZED
```

The exact labels can be configured by domain. They do not replace regulator-issued certificates.

For industrial supply, the Desk may coordinate:

- specification matching
- sample testing
- laboratory testing
- inspection
- factory audit
- production QA
- packaging requirements
- certification
- batch traceability
- documentation

Substandard goods are surfaced honestly or excluded according to policy; they are not made falsely equivalent to compliant goods.

---

## 11. Full trade value chain

```text
SENSE
 ↓
INTENT
 ↓
DISCOVER
 ↓
IDENTIFY PARTICIPANTS
 ↓
VERIFY
 ↓
CLASSIFY / STANDARDIZE
 ↓
VALUE / PRICE
 ↓
COMPARE SUBSTITUTES
 ↓
MATCH / AGGREGATE
 ↓
RFQ / NEGOTIATE / AUCTION / ALLOCATE
 ↓
CONTRACT
 ↓
FINANCE / CREDIT / ADVANCE
 ↓
INSURE / GUARANTEE
 ↓
SOURCE / PRODUCE / SORT / PROCESS
 ↓
INSPECT / CERTIFY
 ↓
STORE / CUSTODY
 ↓
CONSOLIDATE
 ↓
MOVE
 ↓
CUSTOMS / BORDER / TAX
 ↓
DELIVER
 ↓
INSPECT / ACCEPT
 ↓
RETURN / REPAIR / REFUND / CLAIM if needed
 ↓
SETTLE / RECONCILE
 ↓
REVIEW / PULSE
 ↓
REVALUE / REUSE / RECOVER
 ↓
NEXT MARKET STATE
```

The Desk may enter or exit this chain at any stage.

---

## 12. MOQ and aggregation

MOQ is modeled as a constraint, not a hard stop.

Possible strategies:

- ready-stock purchase
- one-unit/low-MOQ sourcing
- mixed-SKU aggregation
- pooled demand
- group buying
- regional collection
- factory batch formation
- trading-company sourcing
- local production
- partial substitution
- staged production

The system calculates the threshold where aggregation actually improves total value after freight, handling, financing, insurance and delay.

---

## 13. Processing and industrialization

Desk can coordinate staged value creation:

```text
raw → sorted → graded → processed → finished → certified
```

It can also coordinate industrialization pathways:

```text
used machine
 → inspect
 → finance/install
 → operate
 → measure output
 → improve process
 → qualify market
 → finance better machine
 → scale
```

This turns procurement into a capability-development loop.

---

## 14. Finance and value forms

A transaction may use one or several lawful value legs:

- money
- bank/payment rail
- FX
- trade credit
- advance payment
- deferred payment
- barter
- reciprocal exchange
- service exchange
- cooperative contribution
- grant
- sponsorship
- CSR/impact allocation
- licensed digital-asset/stablecoin rail where legal
- tokenized representation where lawful

Desk must distinguish accounting reference value from legal tender or regulated financial instruments.

---

## 15. Logistics orchestration

Desk should compare:

- pickup
- courier
- road
- rail
- sea
- air
- multimodal
- consolidation
- warehousing
- lockers
- hub-and-spoke
- return routing
- backhaul
- specialized transport

Each option should expose:

```text
price
ETA
capacity
confidence
provider
insurance
tracking
restrictions
carbon data when available
failure/claims process
```

It should use existing logistics providers and common data standards wherever possible.

FIATA's 2026 eFBL work and GS1 EPCIS demonstrate current industry movement toward interoperable digital trade and shipment/event records; the Desk should integrate such rails rather than invent private duplicates.

---

## 16. Customs and border orchestration

For cross-border transactions, Desk should assemble the applicable process:

```text
HS classification
origin
valuation
permits
licenses
inspection
customs declaration
Form M / applicable national process
PAAR / applicable release evidence
charges/taxes
clearance
post-clearance records
```

It must maintain a live jurisdiction/policy source layer and a prohibition/restriction tracker.

The Nigeria Trade Portal already exposes tariff search, trader guidance, duties/taxes simulation, electronic documents and AI tariff search. Desk should link/orchestrate that infrastructure rather than replace it. citeturn739041search2turn739041search8

---

## 17. Insurance and protection

Protection may cover:

- cargo
- property
- credit
- product liability
- performance
- transit
- agriculture
- climate
- political risk
- cyber
- equipment

Where compulsory insurance applies, Desk must enforce the requirement through an appropriate licensed provider.

For pooled/fractional transactions, one master policy may cover the relevant consolidated shipment where the insurer and jurisdiction permit it; allocation to shares must be explicit.

---

## 18. Returns, disputes and recovery

A transaction is incomplete until the post-delivery state is known.

Support:

- inspection window
- evidence capture
- photo/video evidence
- serial/batch identity
- return authorization
- reverse logistics
- repair
- replacement
- partial refund
- full refund
- insurance claim
- mediation
- arbitration or court handoff where appropriate
- recovery/recommerce

Reviews are linked to verified transaction evidence. The system must distinguish opinion, factual evidence and adjudicated outcome.

---

## 19. Trust and reputation

Trust is multi-dimensional, not one star score.

Track separately:

```text
identity confidence
transaction history
quality consistency
fulfillment reliability
payment behavior
return behavior
claims history
communication
standards compliance
workmanship
counterparty disputes
```

A negative event should not automatically erase a participant's full history; the system preserves context and evidence.

---

## 20. Informal and assisted commerce

Desk must work with participants who do not have sophisticated software.

Capture channels can include:

- app/web
- WhatsApp
- voice
- SMS
- USSD
- agent/field officer
- market representative
- API
- bulk upload

The same canonical record is produced regardless of intake channel.

This is essential for artisans, farmers, market traders, repairers, transport operators and informal businesses.

---

## 21. International sourcing and export

The same Desk handles:

```text
WORLD → LOCAL
LOCAL → LOCAL
LOCAL → NATIONAL
NATIONAL → REGIONAL
AFRICA → AFRICA
AFRICA → WORLD
WORLD → WORLD through participating ecosystem rails
```

Demand may be tiny or industrial:

- one shirt
- one spare part
- ten bags
- a container
- tonnes of commodity
- an entire machine
- a workforce requirement
- recurring monthly supply

The quantity scale changes execution; it does not change the underlying economic object.

---

## 22. Local trade intelligence

Desk builds a supply/demand graph from permitted evidence:

```text
availability
+ price
+ inventory
+ requests
+ geography
+ seasonality
+ capacity
+ route cost
+ processing capacity
+ weather
+ infrastructure
+ transaction outcomes
```

It can identify:

- abundance zones
- deficit zones
- emerging shortages
- idle capacity
- viable backhaul
- consolidation opportunities
- processing bottlenecks
- route openings
- local substitutes

External sources remain labeled as external; Desk observations remain labeled as ecosystem observations.

---

## 23. Bottleneck and leakage engine

Every transaction should be tested for avoidable leakage:

- MOQ
- FX spread
- intermediary fees
- poor freight utilization
- empty backhaul
- storage idle time
- demurrage
- duplicate paperwork
- classification error
- quality failure
- counterparty default
- fraud
- return cost
- claim friction
- informal cash leakage
- missing inventory
- price opacity
- capacity underutilization
- failed handoff
- regulatory delay

The engine proposes alternatives and estimates the value recovered.

---

## 24. Existing-service integration principle

For each capability, Desk should prefer this order:

```text
EXISTING ECOSYSTEM CAPABILITY
        ↓ if absent
EXISTING EXTERNAL SERVICE / STANDARD
        ↓ if integration unavailable
PARTNER / HUMAN OPERATION
        ↓ if genuinely missing
NEW SHARED ECOSYSTEM CAPABILITY
        ↓ only when justified
NEW PRODUCT-SPECIFIC UI
```

This prevents product proliferation and keeps shared infrastructure reusable.

---

## 25. Decision interface

The user should not have to understand the entire value chain.

The default experience is:

```text
WHAT DO YOU NEED?
        ↓
WHERE?
        ↓
WHEN?
        ↓
WHAT MATTERS MOST?
        ↓
OPTIONS
```

Each option should state plainly:

```text
WHAT
FROM WHOM
WHERE
STANDARD / QUALITY
TOTAL COST / VALUE
WHEN
RISK
INSURANCE
RETURN TERMS
WHY THIS OPTION
```

Complexity remains in the ecosystem orchestration layer.

---

## 26. Canonical product conformance test

A Desk capability is conformant when:

1. it uses shared participant and authority identity;
2. it uses TIP's canonical object and market vocabulary;
3. it records provenance and evidence;
4. it separates state, status, eligibility, authority and certification;
5. it passes applicable policy and jurisdiction gates;
6. it records transactions through the canonical economic/IO layer;
7. it emits measurable outcomes to Pulse;
8. it can be reused by other ecosystem products;
9. it does not create an incompatible parallel ontology;
10. it can hand off to existing ecosystem or external services without losing lineage.

---

## 27. Product topology

Desk may expose multiple experiences while retaining one foundation:

```text
DESK
├── BUY
├── SELL
├── SOURCE
├── EXPORT
├── LOCAL EXCHANGE
├── SERVICES / SKILLS
├── PROCUREMENT
├── GROUP / FRACTIONAL ORDER
├── RECOVERY / CIRCULAR
├── LOGISTICS
├── FINANCE COORDINATION
├── INSURANCE COORDINATION
├── MARKET INTELLIGENCE
└── AGENT / MACHINE COMMERCE
```

These are views/workflows over shared capabilities, not independent economic systems.

---

## 28. Non-negotiable boundary

Desk is not allowed to optimize only for transaction volume.

Its objective is to maximize sustainable, lawful and evidence-backed value realization subject to constitutional authority, user intent, safety, standards, regulatory constraints, risk limits and ecosystem policy.

**The Desk is a composition in the Carbon Actual ecosystem: not a silo, not a replacement for the ecosystem, and not a competing ontology.**
