# TIP — Master Taxonomy v1.2 Addendum

**Ecosystem:** Carbon Actual / OMNII  
**Product:** TIP — Trade, Investment & Value Markets  
**Status:** CANONICAL EXTENSION — approved  
**Purpose:** Register the operating-layer primitives that must sit beside the existing TIP Master Taxonomy v1.1 so market execution, settlement and reporting use the same universal vocabulary.

---

## 1. Why an addendum is required

TIP Master Taxonomy v1.1 already classifies market objects, capabilities, rights, claims, contracts, trading, investment, financing, capital, risk, collateral, markets, value chains, environment, digital representations, infrastructure, data, participants, status, lifecycle and market forms.

The operating-system layer adds a missing but orthogonal dimension: **how an economic interaction is instantiated, executed, settled, corrected and learned from**.

This addendum registers that dimension without changing the underlying constitutional ontology.

---

## 2. New canonical operating classes

The following classes are first-class TIP operating objects:

```text
INTENT
REQUEST
LISTING
OFFER
QUOTE
BID
ASK
RFQ
RFP
TENDER
ORDER
RESERVATION
ALLOCATION
MATCH
AGREEMENT
LEG
EXECUTION
POSITION
EXPOSURE
OBLIGATION
INVOICE
DELIVERY
USAGE_RECORD
PERFORMANCE_RECORD
CLEARING_EVENT
NETTING_EVENT
COLLATERAL_EVENT
SETTLEMENT
PAYMENT
TRANSFER
RECONCILIATION
ADJUSTMENT
DISPUTE
REMEDY
RECOVERY
RETIREMENT_EVENT
```

These are operating-layer objects and should reference existing canonical objects rather than duplicate them.

---

## 3. New canonical event classes

Economic state changes should be represented as append-only events where practical:

```text
ORDER_CREATED
ORDER_ACCEPTED
ORDER_REJECTED
ORDER_CANCELLED
ORDER_EXPIRED
MATCH_CREATED
ALLOCATION_CREATED
CONTRACT_FORMED
CONTRACT_AMENDED
POSITION_OPENED
POSITION_CHANGED
POSITION_CLOSED
MARGIN_CALLED
COLLATERAL_POSTED
COLLATERAL_RELEASED
DELIVERY_STARTED
DELIVERY_CONFIRMED
USAGE_RECORDED
PERFORMANCE_VERIFIED
PAYMENT_AUTHORIZED
PAYMENT_SENT
PAYMENT_RECEIVED
SETTLEMENT_COMPLETED
SETTLEMENT_FAILED
SETTLEMENT_REVERSED
RECONCILED
DISPUTE_OPENED
DISPUTE_RESOLVED
REMEDY_APPLIED
DEFAULT_DECLARED
RECOVERY_STARTED
RECOVERY_COMPLETED
ASSET_RETIRED
```

An event records a transition; it does not become the underlying economic object merely because it references one.

---

## 4. New relationship vocabulary

The existing master relationship set should be extended conceptually with:

```text
INITIATED_BY
AUTHORIZED_BY
DELEGATED_BY
REQUESTED_AS
OFFERED_AS
QUOTED_AS
BID_FOR
ASK_FOR
ORDERS
RESPONDS_TO
MATCHES
ALLOCATES
FORMS_CONTRACT
CREATES_POSITION
CREATES_OBLIGATION
CREATES_RIGHT
CREATES_CLAIM
SETTLES
DELIVERS
MEASURES_USAGE
VERIFIES_PERFORMANCE
CLEARS
NETS_WITH
MARGINED_BY
SECURES
PAYS
RECEIVES_PAYMENT
RECONCILES
ADJUSTS
DISPUTES
REMEDIES
RECOVERS
SUPERSEDES
CAUSES
CORRECTS
DERIVES_ACCOUNTING_EVENT
TRIGGERS
```

Relationships that can change must retain direction, provenance and effective dates.

---

## 5. Settlement-asset vocabulary

Settlement should use an explicit settlement-asset class/facet rather than assuming every monetary instrument is identical.

```text
CASH
BANK_DEPOSIT
CENTRAL_BANK_MONEY
TOKENISED_DEPOSIT
CBDC
STABLECOIN
E_MONEY
PAYMENT_TOKEN
SECURITY
COMMODITY_DELIVERY
IN_KIND_VALUE
INTERNAL_LEDGER_UNIT
```

Associated attributes include:

```text
issuer
legal_claim
unit_of_account
redemption
parity
finality
network
custody
jurisdiction
eligibility
```

---

## 6. Accounting/reporting event vocabulary

TIP should expose economic events to accounting/reporting systems without becoming a substitute for every accounting framework.

Canonical event facets include:

```text
COMMITMENT
ACCRUAL
RECEIVABLE
PAYABLE
FUNDING
REPAYMENT
FEE
TAX
INTEREST
DIVIDEND
ROYALTY
DEPRECIATION
IMPAIRMENT
REVALUATION
REALIZED_GAIN
REALIZED_LOSS
UNREALIZED_CHANGE
WRITE_OFF
RECOVERY
```

Jurisdictional accounting standards remain configuration/policy layers.

---

## 7. Canonical state machine facets

Operating objects may carry state facets such as:

```text
DRAFT
PENDING
ACTIVE
PARTIALLY_FILLED
MATCHED
CONTRACTED
IN_FULFILLMENT
DELIVERED
SETTLEMENT_PENDING
SETTLED
FAILED
REVERSED
DISPUTED
FROZEN
DEFAULTED
RECOVERING
RECOVERED
RETIRED
EXPIRED
CANCELLED
```

These are distinct from the Master Taxonomy's broader classification/status/eligibility concepts.

---

## 8. Market clock primitives

Time-sensitive market operations should use:

```text
EVENT_TIME
INGESTION_TIME
EFFECTIVE_TIME
ORDER_TIME
MATCH_TIME
CONTRACT_TIME
DELIVERY_TIME
SETTLEMENT_TIME
EXPIRY_TIME
RENEWAL_TIME
REPORTING_TIME
```

A market clock must be versioned when its session rules or timezone behavior change.

---

## 9. Measurement primitives

Every measurable economic flow should preserve:

```text
quantity
unit
precision
measurement_method
measurement_source
measurement_time
conversion_rule
quality
confidence
```

This permits TIP to model physical, digital, service, labour, environmental, energy, compute and capacity markets through one measurement discipline.

---

## 10. Operating identity

The operating layer should assign stable identifiers to interactions without replacing the identity of underlying economic objects.

Recommended forms:

```text
TIP:INTENT:<SLUG>:<VERSION>
TIP:ORDER:<SLUG>:<VERSION>
TIP:MATCH:<SLUG>:<VERSION>
TIP:EXECUTION:<SLUG>:<VERSION>
TIP:POSITION:<SLUG>:<VERSION>
TIP:SETTLEMENT:<SLUG>:<VERSION>
TIP:PAYMENT:<SLUG>:<VERSION>
TIP:EVENT:<SLUG>:<VERSION>
```

The underlying object remains separately identified.

---

## 11. Canonical market stack

TIP now has a five-layer classification-to-execution stack:

```text
LAYER 1 — OBJECT
What exists?

LAYER 2 — RELATION / RIGHT / CLAIM
What legal/economic relationship exists?

LAYER 3 — MARKET FORM
How can it be allocated, priced, exchanged or accessed?

LAYER 4 — OPERATING LIFECYCLE
How is intent converted into order, match, contract, position, fulfillment and settlement?

LAYER 5 — FEEDBACK / VALUE
What happened, what was created/consumed, what was the outcome, and what does Pulse observe?
```

This is the canonical TIP bridge from ontology to executable economic infrastructure.

---

## 12. Design invariant

> **A market implementation may specialize its interface, venue, mechanism, settlement rail or participant model, but it must not invent a second economic identity or transaction ontology for the same underlying object.**

This prevents TIP from fragmenting into unrelated trading, marketplace, procurement, financing, subscription, AI, carbon, asset and service systems.
