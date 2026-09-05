# TIP — Unconventional, Structured, Temporal & Emergent Markets

**Ecosystem:** Carbon Actual / OMNII  
**Product:** TIP — Trade, Investment & Value Markets  
**Status:** CANONICAL EXTENSION — approved  
**Purpose:** Extend TIP beyond conventional asset-class markets to unusual, structured, time-sensitive, contingent, outcome-based, allocation, access, capacity, event and future market forms.

---

## 1. Why This Extension Exists

A complete market architecture cannot be defined only by naming what is traded.

Markets also differ by:

- what triggers exchange
- when value is exchanged
- how price is formed
- whether the outcome is certain or contingent
- whether the object is bundled or decomposed
- whether capacity rather than ownership is exchanged
- whether the market is continuous, periodic or event-based
- whether the market allocates scarce resources rather than merely discovers a price
- whether the transaction is bilateral, multi-party, pooled or agent-mediated
- whether the market is physical, digital, environmental, informational or hybrid.

TIP therefore treats **market form** as a separate taxonomy dimension from the underlying Market Object.

---

## 2. Market-Form Facets

Any TIP market may receive one or more of these facets:

```text
SPOT
FORWARD
FUTURE
OPTIONAL / CONTINGENT
EVENT_DRIVEN
PREDICTION
TEMPORAL
RECURRING
STREAMING
RESERVATION
CAPACITY
USAGE
ALLOCATION
AUCTION
NEGOTIATED
BILATERAL
MULTILATERAL
P2P
PEER_TO_POOL
POOL_TO_PEER
ORDER_BOOK
RFQ
TENDER
MATCHING
SUBSCRIPTION
OUTCOME_BASED
FORMULA_PRICED
INDEX_LINKED
BUNDLED
COMBINATORIAL
SYNTHETIC
STRUCTURED
SECONDARY
DISTRESSED
RECOVERY
AGENTIC
MACHINE_NATIVE
FEDERATED
DECENTRALIZED
HYBRID
```

These facets describe the market's operating form and do not themselves determine legality or regulatory status.

---

## 3. Temporal / Time Markets

Time itself can be a market dimension.

TIP must be capable of representing:

### Immediate / Intraday

- real-time markets
- intraday markets
- continuous markets
- same-session markets
- near-term inventory markets

### Scheduled

- day-ahead
- week-ahead
- month-ahead
- seasonal
- annual
- multi-year forward capacity

### Recurring

- recurring subscriptions
- recurring service capacity
- rolling contracts
- scheduled replenishment
- recurring procurement
- recurring financing

### Time-Sliced

- machine-hour markets
- labour-hour markets
- room-night markets
- GPU-hour markets
- bandwidth-time markets
- battery-duration markets
- charging-window markets
- delivery-slot markets
- appointment/booking markets

### Lifecycle / Expiry

- maturity markets
- expiring-right markets
- renewal markets
- lease-expiry markets
- license-renewal markets
- retirement markets
- end-of-life markets

Time-sensitive markets should preserve:

```text
start_time
end_time
availability_window
cutoff_time
settlement_time
expiry
renewal
recurrence
priority
lateness_penalty
```

---

## 4. Event & Prediction Markets

TIP should represent event-linked markets where lawful.

Examples include:

- weather-event contracts
- economic-event contracts
- market-statistic events
- operational milestone contracts
- delivery-event contracts
- production-output events
- sports/event contracts where legally permitted
- political/event contracts where legally permitted
- prediction markets
- forecasting markets
- information markets

The CFTC describes event contracts as instruments tied to future event outcomes and notes their use for forecasting, planning and hedging as well as speculation. citeturn259187search0

TIP must distinguish:

```text
FORECASTING
PREDICTION
HEDGING
INSURANCE
SPECULATION
GAMING / GAMBLING
```

because the economic purpose and legal treatment can differ materially by jurisdiction.

---

## 5. Outcome Markets

Some markets price or compensate for a measured result rather than a physical object.

Examples:

- performance contracts
- outcome-based services
- energy-efficiency outcomes
- emissions-reduction outcomes
- verified environmental outcomes
- service-level outcomes
- delivery-performance contracts
- productivity outcomes
- healthcare outcomes where legally and ethically appropriate
- development outcomes
- milestone-linked contracts

The market object is therefore the **defined outcome and its verification method**, not necessarily the underlying asset.

---

## 6. Allocation Markets

Not every market primarily discovers a price. Some primarily allocate scarce resources.

Examples:

- electricity capacity allocation
- spectrum allocation
- airport slots
- landing/takeoff slots
- shipping slots
- port berths
- road/congestion capacity
- water allocations where permitted
- emissions allowances
- compute capacity
- GPU allocation
- warehouse space
- manufacturing slots
- hospital/medical capacity where appropriate
- public procurement allocations
- social/program funding allocations

Allocation can be performed through:

- auction
- quota
- lottery where lawful
- priority rules
- merit/risk ranking
- reservation
- scheduling
- matching
- bilateral allocation
- algorithmic allocation.

---

## 7. Reservation & Booking Markets

Reservation is a market form when access is scarce and time-bound.

Examples:

- hotel rooms
- apartments
- event venues
- restaurant capacity
- transport seats
- cargo space
- vessel charter slots
- vehicle hire
- warehouse space
- infrastructure access
- compute reservations
- GPU reservations
- power/flexibility reservations
- professional appointments
- equipment booking
- land-use reservations

A reservation should be represented separately from ownership and from the underlying asset.

---

## 8. Queue, Priority & Congestion Markets

Scarcity can be allocated through time priority or congestion pricing.

TIP should support models such as:

- first-come-first-served allocation
- priority queues
- paid priority
- congestion pricing
- dynamic access pricing
- peak/off-peak pricing
- demand throttling
- admission markets
- booking-priority systems

These are especially relevant to:

- transport
- telecommunications
- cloud infrastructure
- electricity
- healthcare capacity
- venues
- public infrastructure
- compute services.

---

## 9. Structured / Multi-Leg Markets

TIP should support market forms where several linked components must be evaluated together.

Examples include:

- multi-leg trades
- spread packages
- pairs/baskets
- bundled contracts
- package auctions
- combinatorial auctions
- basket exposure
- index baskets
- structured investment products
- structured financing
- cross-asset strategies
- cross-market hedges
- collateralized bundles
- supply-chain bundles

The platform must maintain both:

```text
COMPONENT LEG
and
COMPOSITE POSITION
```

without double-counting value, exposure or collateral.

---

## 10. Combinatorial Markets

Some market participants demand combinations rather than individual objects.

Examples:

```text
A + B + C together
A OR B
A requires B
A only if C is available
minimum quantity across a bundle
maximum total cost across a bundle
```

TIP should therefore support combinatorial bidding, package matching and constraint-based allocation where technically and legally appropriate.

---

## 11. Synthetic / Replicated Exposure Markets

A participant may seek economic exposure without directly owning the underlying object.

Possible structures include:

- index exposure
- basket exposure
- derivative exposure
- synthetic positions
- total-return-style exposures where permitted
- reference-linked contracts
- proxy exposure
- tokenized representations of claims

The architecture must distinguish:

```text
UNDERLYING
EXPOSURE
LEGAL CLAIM
CONTRACT
POSITION
```

A synthetic exposure must not be mistaken for ownership of the underlying object.

---

## 12. Information & Forecast Markets

Information can have exchange value when it is lawfully provided and independently useful.

Market forms include:

- data marketplaces
- intelligence markets
- forecasting markets
- research markets
- expert markets
- signal markets
- benchmark markets
- licensed knowledge markets
- information-request markets

Quality dimensions should include:

```text
accuracy
freshness
provenance
coverage
confidence
independence
licensing rights
privacy status
verification
```

---

## 13. Attention, Audience & Media Inventory Markets

Where lawful and ethically appropriate, TIP can represent market structures around:

- advertising inventory
- sponsorship inventory
- media placement
- creator inventory
- audience access
- event sponsorship
- naming rights
- broadcast rights
- distribution rights
- attention/campaign capacity

These should be represented as **rights/capabilities/capacity**, not as ownership of persons or personal attention by default.

---

## 14. Reputation & Trust Markets

TIP may represent economic relationships influenced by verified reputation.

Examples:

- reputation-backed access
- credential-backed service markets
- verified-provider markets
- guarantee-backed marketplaces
- trust-score-based matching
- performance-history-based allocation

A reputation score is evidence, not automatically a financial asset.

---

## 15. Identity, Credential & Clearance Markets

Where lawfully transferable or commercially usable, the market may involve:

- professional credentials
- certifications
- clearances
- permits
- licenses
- compliance status
- accreditation
- quality certification
- inspection results
- verified origin/provenance

TIP must distinguish:

```text
CERTIFICATE
STATUS
RIGHT
ACCESS
MARKET ELIGIBILITY
```

A credential may enable market access without itself being transferable or monetizable.

---

## 16. Location & Spatial Markets

Location can itself determine economic rights and access.

Examples:

- land
- burial/grave plots
- parking spaces
- docking/berthing
- warehouse locations
- retail locations
- event locations
- telecom/site locations
- spectrum/geographic allocation
- route slots
- development rights
- airspace/access permissions where legally recognized

TIP should support spatial indexing and time-bound location rights.

---

## 17. Environmental Constraint & Compliance Markets

Some markets exist because participants must meet a constraint.

Examples:

- emissions allowances
- renewable attributes
- carbon instruments
- biodiversity instruments
- environmental restoration obligations
- water allocations where lawful
- pollution/reduction compliance mechanisms
- environmental performance markets.

These are distinct from ordinary commodity trading because the market may exist primarily to satisfy a regulatory, contractual or environmental constraint.

---

## 18. Risk, Protection & Contingency Markets

Markets may exchange exposure to uncertainty rather than ownership of an asset.

Examples:

- insurance
- reinsurance
- catastrophe risk
- weather risk
- crop risk
- cargo risk
- credit risk
- political risk
- cyber risk
- longevity risk
- mortality risk where permitted
- performance guarantees
- contingent compensation.

The canonical relationship is:

```text
RISK
 ↓
TRIGGER / CONDITION
 ↓
EXPOSURE
 ↓
PREMIUM / PRICE
 ↓
COLLATERAL / RESERVE
 ↓
EVENT
 ↓
PAYOUT / LOSS
```

---

## 19. Recovery, Distress & Resolution Markets

Economic objects can move into special markets after impairment or default.

Examples:

- distressed-debt markets
- non-performing-loan markets
- recovery claims
- liquidation markets
- salvage markets
- repossession sales
- returned-goods markets
- surplus inventory
- bankruptcy/restructuring claims where lawful
- secondary collateral markets
- recycling/recovery markets

The architecture should preserve the object's original provenance and claim hierarchy.

---

## 20. Internal / Enterprise Markets

Markets do not always occur between independent legal entities.

TIP should be capable of representing internal economic allocation such as:

- internal capital markets
- transfer pricing
- internal service markets
- chargeback systems
- shared-service allocation
- compute chargeback
- departmental capacity allocation
- internal carbon pricing
- project resource markets
- corporate treasury allocation.

These may be accounting/allocation mechanisms rather than public markets.

---

## 21. Public & Social Allocation Markets

Some allocation systems combine economic mechanisms with public-purpose rules.

Examples:

- public procurement
- grant competitions
- concession awards
- infrastructure concessions
- development-resource allocation
- social-impact funding
- public-private project selection
- scarce public-resource allocation.

Public-interest objectives, eligibility and procurement law remain authoritative.

---

## 22. Lifecycle & Transformation Markets

A market can emerge every time an object changes state.

Example:

```text
RAW MATERIAL
 → PROCESSING
 → INTERMEDIATE PRODUCT
 → FINISHED PRODUCT
 → USED PRODUCT
 → REPAIR
 → REFURBISH
 → SECONDARY SALE
 → RECOVERY
 → RECYCLED INPUT
```

TIP should preserve transformation lineage so markets can form around every legitimate downstream state.

---

## 23. Micro / Continuous / Streaming Markets

TIP should support extremely small and high-frequency transactions:

- API calls
- AI inference calls
- data requests
- machine-to-machine purchases
- per-token/per-compute-unit services
- micro-payments
- energy micro-transactions
- usage-based infrastructure
- pay-per-result services.

Current payment infrastructure is moving toward machine-speed and even sub-cent machine-to-machine transactions, reinforcing the need for a market model that can support high-volume programmatic exchange. citeturn259187search6

---

## 24. Agentic & Machine-Native Markets

TIP must support:

```text
HUMAN → MARKET
HUMAN → AGENT → MARKET
AGENT → MARKET
AGENT → AGENT
MACHINE → MACHINE
```

Agents may perform:

**discovery → comparison → negotiation → purchase → contract → payment → fulfillment → reconciliation**

subject to authority and policy.

Academic work now explicitly defines **agentic markets** as environments where autonomous AI agents conduct search, evaluation, negotiation and transaction decisions. citeturn259187search2turn259187search5

---

## 25. Future Market Forms

TIP should remain open to market types that do not yet have mature standardized implementations.

Examples:

- autonomous procurement markets
- agent-to-agent service markets
- machine resource markets
- AI reasoning markets
- AI knowledge markets
- AI capability markets
- compute futures
- inference-capacity markets
- data licensing markets
- digital-twin markets
- simulation markets
- synthetic-environment markets
- robotics capacity markets
- autonomous transport capacity markets
- satellite-data/capacity markets
- space-service markets
- advanced environmental markets
- programmable rights markets
- autonomous treasury markets
- machine-credit markets
- real-time collateral markets.

These are architecture targets, not assertions that every listed market currently exists at scale or is legally available.

---

## 26. Market Formation Engine

TIP should be able to construct a market from five independent dimensions:

```text
WHAT IS BEING EXCHANGED?
        ↓
WHO CAN PARTICIPATE?
        ↓
WHEN CAN IT BE EXCHANGED?
        ↓
HOW IS IT PRICED / ALLOCATED?
        ↓
WHAT HAPPENS AFTER THE MATCH?
```

This yields a reusable market definition:

```text
Market Object
+ Participant Model
+ Temporal Model
+ Matching / Allocation Mechanism
+ Price / Terms Model
+ Contract Model
+ Settlement Model
+ Risk Model
+ Evidence / Verification Model
+ Jurisdiction / Policy
```

---

## 27. Market Design Guardrail

A market form is not automatically a permissible market.

Before activation TIP must determine:

```text
LEGAL BASIS
REGULATORY STATUS
PARTICIPANT ELIGIBILITY
UNDERLYING RIGHTS
MARKET INTEGRITY
CONSUMER PROTECTION
PRIVACY
AML / SANCTIONS
TAX
SETTLEMENT
RISK
```

For prediction/event, environmental, financial and other regulated markets, TIP must support jurisdiction-specific activation rather than assuming global permission.

---

## 28. Master Taxonomy Integration

These market forms must be registered as **Market Form facets** in `TIP_MASTER_TAXONOMY.md` rather than creating independent taxonomies.

The Market Form facet can therefore combine with:

```text
OBJECT
MARKET
VENUE
MECHANISM
TIME
PARTICIPANTS
RIGHTS
CONTRACT
POSITION
FINANCING
RISK
SETTLEMENT
```

Example:

```text
GPU capacity
+ capacity market
+ marketplace
+ day-ahead reservation
+ auction
+ usage settlement
+ AI-agent participant
```

or:

```text
Carbon outcome
+ environmental market
+ verified marketplace
+ milestone contract
+ outcome pricing
+ registry-backed evidence
+ retirement settlement
```

---

## 29. Canonical Rule

> **TIP must model not only what is traded, but every legitimate way markets can form, allocate, price, time, bundle, condition, reserve, forecast, insure, finance, settle and evolve around economic value.**

The goal is not to predict every future product name. The goal is to make the architecture capable of representing the economic reality from which future markets emerge.
