# TIP — Market Operating System

**Ecosystem:** Carbon Actual / OMNII  
**Product:** TIP — Trade, Investment & Value Markets  
**Status:** CANONICAL EXTENSION — approved  
**Purpose:** Provide the executable operating model connecting TIP taxonomy, markets and marketplaces to orders, offers, contracts, positions, settlement, accounting, evidence, disputes, recovery and machine/agent execution.

---

## 1. Why this layer exists

TIP already defines what economic objects are, the roles they may play, the market forms through which they may participate and the broad trading/investment/financing domains.

The remaining architectural gap is the **operating layer** that turns those classifications into an auditable economic lifecycle.

TIP therefore needs one reusable operating model rather than separate transaction engines for trading, marketplaces, procurement, subscriptions, capacity, services, financing, tokenized assets or agent commerce.

The canonical principle is:

> **One economic object graph. One market operating model. Many market forms, interfaces, participants, jurisdictions and settlement rails.**

This layer does not create permission to transact. Classification, authority, law, eligibility, risk and policy remain prerequisites.

---

## 2. Canonical transaction lifecycle

Every TIP economic interaction should be representable as a stateful lifecycle:

```text
INTENT
  ↓
DISCOVERY
  ↓
OFFER / REQUEST / QUOTE
  ↓
ELIGIBILITY
  ↓
ORDER / BID / ASK / RESERVATION
  ↓
MATCH / ALLOCATION / ACCEPTANCE
  ↓
CONTRACT / AGREEMENT
  ↓
POSITION / OBLIGATION / RIGHT
  ↓
CLEARING / NETTING / COLLATERAL
  ↓
FULFILLMENT / DELIVERY / USAGE / PERFORMANCE
  ↓
SETTLEMENT
  ↓
RECONCILIATION
  ↓
ACCOUNTING / REPORTING
  ↓
MEASUREMENT / PULSE
  ↓
REVALUE / RENEW / TRANSFER / RECOVER / RETIRE
```

Not every market uses every state. The lifecycle is composable rather than mandatory as one linear workflow.

---

## 3. Canonical economic interaction objects

TIP should recognize these as reusable transaction-layer objects:

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
CONTRACT
LEG
POSITION
EXPOSURE
OBLIGATION
RIGHT
CLAIM
COLLATERAL
MARGIN
INVOICE
DELIVERY
USAGE_RECORD
PERFORMANCE_RECORD
SETTLEMENT
PAYMENT
TRANSFER
RECONCILIATION
ADJUSTMENT
DISPUTE
REMEDY
RECOVERY
RETIREMENT
```

Each object must have a stable identity and provenance and should reference the underlying TIP object rather than copying it.

---

## 4. Intent as a first-class object

Intent may originate from:

```text
HUMAN
ENTERPRISE
INSTITUTION
AGENT
AI CREW
APPLICATION
MACHINE
AUTOMATION
SYSTEM POLICY
```

An intent should specify, where applicable:

```yaml
intent_id:
actor_id:
principal_id:
agent_id:
purpose:
objective:
market_scope:
object_scope:
quantity:
unit:
quality:
location:
time_window:
budget:
price_constraint:
risk_constraint:
settlement_preference:
jurisdiction:
expiry:
authority_basis:
consent_basis:
policy_version:
```

Prompt trading is an interface into this layer, not an alternative permission system.

---

## 5. Discovery and market selection

TIP should be able to select an appropriate market, marketplace, venue and mechanism from the object and intent graph.

Selection inputs may include:

```text
OBJECT
CAPABILITY
RIGHT
CLAIM
MARKET FORM
LOCATION
TIME
COUNTERPARTY
LIQUIDITY
PRICE
QUALITY
SERVICE LEVEL
RISK
JURISDICTION
AUTHORITY
SETTLEMENT RAIL
```

A request can be routed to multiple venues and mechanisms without changing the canonical economic object.

Example:

```text
Need = 100 GPU-hours

Candidate forms:
- spot
- reservation
- day-ahead capacity
- auction
- bilateral contract
- subscription
- agent-mediated purchase
```

The system chooses or recommends the market form; it does not silently change the user's economic objective.

---

## 6. Offer, quote, bid, ask and order semantics

These must remain distinct:

- **Offer:** proposition to supply or grant.
- **Request:** proposition seeking supply or access.
- **Quote:** stated terms responding to a request.
- **Bid:** willingness to buy under stated terms.
- **Ask:** willingness to sell or provide under stated terms.
- **Order:** instruction to a market/venue to execute defined terms.
- **Reservation:** temporary right to capacity or access without transferring underlying ownership.

Each executable instruction must preserve:

```text
WHO
FOR WHOM
WHAT
HOW MUCH
UNIT
PRICE / FORMULA
WHEN
WHERE
VALIDITY
CONDITIONS
AUTHORITY
RISK LIMIT
SETTLEMENT
CANCELLATION
```

---

## 7. Matching and allocation

TIP should support several independent matching modes:

```text
EXACT MATCH
PARTIAL MATCH
PRICE/TIME PRIORITY
PRO-RATA
AUCTION
REVERSE AUCTION
RFQ
NEGOTIATION
COMPATIBILITY MATCH
CONSTRAINT MATCH
COMBINATORIAL MATCH
BATCH MATCH
CONTINUOUS MATCH
RESERVATION
SCHEDULING
QUEUE ALLOCATION
POOL ALLOCATION
RULE-BASED PUBLIC ALLOCATION
```

A match is evidence of compatible terms, not automatically a completed settlement.

For partial/combinatorial markets, the system must preserve unmatched and residual quantities.

---

## 8. Contract formation

Contract formation must be modeled separately from matching.

The contract object can include:

```text
PARTIES
PRINCIPAL / AGENT
OBJECTS
RIGHTS
OBLIGATIONS
PRICE
FORMULA
QUANTITY
QUALITY
DELIVERY
PERFORMANCE
TIME
TERMINATION
RENEWAL
DEFAULT
REMEDIES
COLLATERAL
INSURANCE
GOVERNING LAW
DISPUTE TERMS
SETTLEMENT TERMS
EVIDENCE REQUIREMENTS
```

For agentic execution, the contract must retain the human/entity authority chain that permitted the agent to enter it.

---

## 9. Position and exposure ledger

A trade or contract may create one or more positions.

TIP should represent:

```text
LONG
SHORT
NET
GROSS
DELIVERABLE
CASH
RECEIVABLE
PAYABLE
CREDIT
DEBIT
CAPACITY
RIGHT
OBLIGATION
COLLATERAL
MARGIN
CONTINGENT
```

A composite position may contain multiple legs while maintaining references to each component.

The system must prevent double-counting when the same economic exposure is represented simultaneously as:

```text
UNDERLYING
CONTRACT
POSITION
TOKEN
COLLATERAL
REPORTING REPRESENTATION
```

---

## 10. Clearing and netting

Where appropriate, TIP should separate:

```text
TRADE CAPTURE
CLEARING
NOVATION
NETTING
MARGIN
COLLATERAL
SETTLEMENT
```

Supported patterns include:

- bilateral clearing
- central counterparty models where applicable
- multilateral netting
- payment netting
- delivery netting
- portfolio margining
- collateral substitution
- variation margin
- initial margin
- close-out netting where legally enforceable.

Clearing treatment is market- and jurisdiction-specific.

---

## 11. Delivery, usage and performance

Settlement does not always mean transfer of a financial instrument.

TIP must handle:

```text
PHYSICAL DELIVERY
DIGITAL DELIVERY
SERVICE DELIVERY
CAPABILITY CONSUMPTION
ENERGY DELIVERY
DATA DELIVERY
LABOUR / TIME DELIVERY
ACCESS DELIVERY
CAPACITY CONSUMPTION
ENVIRONMENTAL OUTCOME
MILESTONE
PERFORMANCE
```

A performance record may trigger:

```text
PAYMENT
RELEASE OF ESCROW
MILESTONE
BONUS
PENALTY
RENEWAL
DEFAULT
REMEDY
PULSE UPDATE
```

---

## 12. Settlement is a first-class subsystem

Settlement must distinguish:

```text
OBLIGATION CREATED
OBLIGATION DUE
PAYMENT INSTRUCTION
PAYMENT AUTHORIZATION
PAYMENT SENT
PAYMENT RECEIVED
DELIVERY CONFIRMED
SETTLED
FAILED
REVERSED
DISPUTED
RECOVERED
```

Settlement should support:

```text
DELIVERY VERSUS PAYMENT (DvP)
PAYMENT VERSUS PAYMENT (PvP)
ATOMIC SWAP
ESCROW
CONDITIONAL RELEASE
MILESTONE RELEASE
NET SETTLEMENT
GROSS SETTLEMENT
REAL-TIME SETTLEMENT
BATCH SETTLEMENT
DEFERRED SETTLEMENT
STREAMING SETTLEMENT
```

For cross-border transactions, currency, conversion, sanctions, tax, jurisdiction and settlement-finality rules must be explicit.

---

## 13. Money and settlement-asset abstraction

TIP must not hard-code one payment rail.

A settlement asset may be represented as:

```text
CASH
BANK DEPOSIT
CENTRAL BANK MONEY
TOKENISED DEPOSIT
CBDC / CENTRAL BANK TOKEN
STABLECOIN
E-MONEY
PAYMENT TOKEN
SECURITIES / COLLATERAL
COMMODITY DELIVERY
IN-KIND VALUE
INTERNAL LEDGER UNIT
OTHER LAWful SETTLEMENT REPRESENTATION
```

A settlement asset is not automatically equivalent to money merely because it is tokenized.

The system must preserve:

```text
UNIT OF ACCOUNT
ISSUER
LEGAL CLAIM
REDEMPTION
PARITY
FINALITY
NETWORK
CUSTODY
JURISDICTION
ELIGIBILITY
```

Current financial-infrastructure work reinforces this separation: BIS describes tokenised deposits as bank liabilities represented on programmable ledgers and highlights atomic cross-border settlement using tokenised central-bank reserves and tokenised commercial-bank deposits. citeturn272018search0turn272018search1

---

## 14. Multi-currency and FX

TIP should support:

```text
CURRENCY
CURRENCY_PAIR
FX_RATE
REFERENCE_RATE
SPOT_FX
FORWARD_FX
SWAP_FX
CROSS_CURRENCY_FUNDING
HEDGED_CURRENCY_EXPOSURE
```

Every monetary observation must preserve:

```text
currency
unit
rate_source
timestamp
price_direction
conversion_method
confidence
```

Currency conversion must never silently rewrite original amounts.

---

## 15. Accounting event model

Every economically material event should be capable of generating accounting/reporting entries without assuming that TIP itself is the user's accounting system.

Canonical event types include:

```text
COMMITMENT
ACCRUAL
RECEIVABLE
PAYABLE
FUNDING
REPAYMENT
SALE
PURCHASE
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
COLLATERAL_POSTED
COLLATERAL_RETURNED
DEFAULT
WRITE_OFF
RECOVERY
```

Each event should support:

```yaml
event_id:
timestamp:
actor:
principal:
source_object:
source_contract:
accounting_dimension:
quantity:
unit:
amount:
currency:
valuation_method:
recognition_basis:
provenance:
```

TIP remains separate from any particular national accounting standard; jurisdictional accounting rules are policy/configuration layers.

---

## 16. Fees, commissions, taxes and leakage controls

The economic flow must represent all material deductions separately:

```text
GROSS VALUE
- MARKET FEE
- BROKER FEE
- PLATFORM FEE
- PAYMENT FEE
- CUSTODY FEE
- TAX
- DUTY
- COMMISSION
- FINANCING COST
- INSURANCE COST
- OTHER CONTRACTUAL COST
=
NET SETTLEMENT
```

This is important for Carbon Actual's anti-leakage objective: a system must expose every material value movement instead of hiding it inside a single net number.

Every fee should identify:

```text
WHO CHARGED IT
WHO PAYS IT
WHY
RATE / FORMULA
TAX TREATMENT
CONTRACT BASIS
```

---

## 17. Evidence and verification layer

A transaction should be able to attach evidence such as:

```text
IDENTITY EVIDENCE
AUTHORITY EVIDENCE
OWNERSHIP EVIDENCE
PRICE EVIDENCE
DELIVERY EVIDENCE
QUALITY EVIDENCE
INSPECTION
CERTIFICATE
ORIGIN
PROVENANCE
METER DATA
GPS / LOCATION DATA
TIME STAMP
SIGNATURE
ORACLE OBSERVATION
AUDIT RECORD
```

Evidence should preserve:

```text
SOURCE
METHOD
TIME
HASH / INTEGRITY REFERENCE
CONFIDENCE
VERIFIER
JURISDICTION
EXPIRY
```

Machine-generated evidence must remain distinguishable from independently verified evidence.

---

## 18. Oracle and external-data boundary

TIP may consume external observations but must distinguish:

```text
OBSERVATION
DATA FEED
ORACLE
VERIFIED FACT
MODEL INFERENCE
PREDICTION
DECISION
```

No model-generated prediction should silently become a verified fact.

For outcome/event markets, the settlement rule must specify the authoritative observation source before the market is activated.

---

## 19. Corporate and lifecycle events

Tradable/investable objects can change without a new user-initiated trade.

TIP should model:

```text
DIVIDEND
INTEREST PAYMENT
COUPON
SPLIT
CONSOLIDATION
MERGER
ACQUISITION
SPIN-OFF
RIGHTS ISSUE
REDEMPTION
MATURITY
EXPIRY
ROLLOVER
RECALL
CONVERSION
CALL
PUT
DEFAULT
RESTRUCTURING
BANKRUPTCY
LIQUIDATION
RETIREMENT
```

These events may alter positions, contracts, ownership, valuation, eligibility or settlement requirements.

---

## 20. Dispute, exception and recovery lifecycle

A production market system must represent failure rather than assuming every transaction settles perfectly.

Canonical exception states:

```text
PENDING
DELAYED
PARTIAL
FAILED
REJECTED
CANCELLED
EXPIRED
DEFAULTED
DISPUTED
FROZEN
REVERSED
RECOVERING
RECOVERED
WRITTEN_OFF
```

Dispute flow:

```text
ISSUE
 ↓
EVIDENCE
 ↓
TEMPORARY CONTROL
 ↓
COUNTERPARTY RESPONSE
 ↓
REVIEW
 ↓
DECISION
 ↓
REMEDY / ADJUSTMENT
 ↓
SETTLEMENT / RECOVERY
 ↓
CLOSURE
```

Controls must preserve the original transaction and append the correction; they should not rewrite historical truth.

---

## 21. Atomicity and idempotency

High-volume systems must safely retry operations.

Every externally material operation should support:

```text
IDEMPOTENCY_KEY
REQUEST_ID
TRANSACTION_ID
EVENT_ID
PARENT_EVENT_ID
CAUSATION_ID
CORRELATION_ID
```

Settlement-critical operations should be designed so that a retry cannot create duplicate economic effects.

Where a market requires true atomic exchange, atomicity must be expressed explicitly rather than inferred from application success.

---

## 22. Machine and agent execution

TIP should support:

```text
HUMAN → MARKET
HUMAN → AGENT → MARKET
AGENT → MARKET
AGENT → AGENT
MACHINE → MACHINE
```

Agent execution must preserve:

```text
PRINCIPAL
AGENT IDENTITY
VERIFIABLE CREDENTIAL
INTENT
DELEGATED AUTHORITY
SPENDING LIMIT
MARKET LIMIT
COUNTERPARTY LIMIT
TIME LIMIT
JURISDICTION
POLICY VERSION
EXECUTION RECORD
```

The architecture should support metered, continuous and very small machine transactions. Current payment-industry infrastructure is explicitly moving toward permissioned, programmatic, high-frequency machine payments across multiple rails, reinforcing this as an infrastructure requirement rather than a speculative UI feature. citeturn526860search0turn526860search3

Agent authority must remain revocable and bounded.

---

## 23. Prompt trading integration

Prompt trading compiles natural-language intent into the same canonical objects:

```text
PROMPT
 ↓
INTENT
 ↓
NORMALIZED TERMS
 ↓
AMBIGUITY CHECK
 ↓
MARKET DISCOVERY
 ↓
SIMULATION / BACKTEST
 ↓
RISK / ELIGIBILITY / AUTHORITY
 ↓
ORDER / ALLOCATION / CONTRACT
 ↓
EXECUTION
 ↓
POSITION
 ↓
SETTLEMENT
 ↓
PULSE / LEARNING
```

A prompt must never bypass:

```text
AUTHORITY
LEGALITY
ELIGIBILITY
RISK
SETTLEMENT
AUDIT
```

---

## 24. Capital protection and trading policy

Trading strategies must be subordinate to an explicit risk constitution.

The configurable policy layer may include:

```text
MAX_TRADE_EXPOSURE
MAX_PORTFOLIO_CONCENTRATION
MAX_LEVERAGE
MAX_DAILY_LOSS
MAX_WEEKLY_LOSS
MAX_DRAWDOWN
MIN_LIQUIDITY_RESERVE
COUNTERPARTY_LIMIT
MARKET_ELIGIBILITY
VOLATILITY_LIMIT
SLIPPAGE_LIMIT
AUTOMATIC_KILL_SWITCH
```

The user's previously specified example policy of no more than 10% per trade and stopping trading after a 100% daily profit remains a **policy preset**, not a universal TIP invariant and not a promise of profitability.

Progression/regression can change risk limits only through the configured policy engine and validated performance evidence.

---

## 25. Market-data and reference-data contract

Every market needs a shared reference-data model.

Canonical reference objects include:

```text
INSTRUMENT
MARKET
VENUE
COUNTERPARTY
ISSUER
CURRENCY
UNIT
CALENDAR
SESSION
BENCHMARK
INDEX
REFERENCE_RATE
PRICE
QUOTE
TRADE_PRINT
ORDER_BOOK_SNAPSHOT
CURVE
VOLATILITY_SURFACE
INVENTORY
SUPPLY
DEMAND
```

Observations should carry:

```text
source
timestamp
venue
method
unit
currency
bid
ask
mid
last
volume
quality
confidence
```

TIP should retain historical observations instead of replacing them with a latest value.

---

## 26. Market clock and temporal integrity

Time is an economic primitive.

The operating layer should support:

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

Where markets operate across regions, timezone and daylight-saving transitions must be explicit.

A temporal market must not confuse market-clock time with system-processing time.

---

## 27. Unit, quantity and measurement integrity

Every quantity must preserve:

```text
value
unit
precision
measurement_method
measurement_source
timestamp
quality
conversion_rule
```

Conversions must be deterministic and versioned.

Examples:

```text
kg ↔ tonne
kWh ↔ MWh
GPU-hour ↔ accelerator-hour
litre ↔ cubic metre
room-night ↔ room-hour
labour-hour ↔ service unit
carbon tonne ↔ verified instrument unit
```

The platform must never silently compare incompatible units.

---

## 28. Legal and jurisdiction boundary

Every market action is evaluated in context:

```text
JURISDICTION
 ↓
LEGAL BASIS
 ↓
PARTICIPANT STATUS
 ↓
OBJECT STATUS
 ↓
AUTHORITY
 ↓
LICENSE / REGISTRATION
 ↓
ELIGIBILITY
 ↓
MARKET RULES
 ↓
EXECUTION
```

Support for a market form in the taxonomy does not mean the market may be launched everywhere.

For example, event/prediction contracts are actively subject to regulatory scrutiny in the United States, including 2026 CFTC rulemaking activity. TIP therefore requires jurisdiction-specific activation and cannot treat every prediction/event market as universally permissible. citeturn526860search2turn526860search4turn526860search6

---

## 29. Tokenization boundary

Tokenization is a representation and execution method, not a substitute for underlying legal reality.

The canonical chain is:

```text
UNDERLYING OBJECT / RIGHT / CLAIM
        ↓
LEGAL / CONTRACTUAL BASIS
        ↓
AUTHORIZED REPRESENTATION
        ↓
TOKEN / DIGITAL RECORD
        ↓
TRANSFER / FRACTIONALIZATION
        ↓
SETTLEMENT
```

A token must preserve:

```text
UNDERLYING_REFERENCE
RIGHTS
CLAIMS
ISSUER
CUSTODY
TRANSFER_RESTRICTIONS
REDEMPTION
JURISDICTION
PROVENANCE
```

Current BIS work highlights tokenization as a developing financial-market infrastructure while stressing settlement, interoperability, governance and legal clarity. citeturn272018search0turn272018search6

---

## 30. Compute, capacity and infrastructure markets

Capacity must be treated as a measurable economic object:

```text
CAPACITY
+ UNIT
+ LOCATION
+ AVAILABILITY WINDOW
+ QUALITY
+ PERFORMANCE
+ PRICE
+ RESERVATION
+ SLA
+ SETTLEMENT
```

Examples:

```text
GPU-hour
CPU-hour
storage-GB-month
bandwidth-Mbps-hour
battery-MWh
power-MW
charging-window
warehouse-pallet-day
machine-hour
hotel-room-night
vehicle-hour
vessel-day
manufacturing-slot
```

This is increasingly relevant to AI infrastructure: current reporting describes GPU rental-price futures emerging as compute demand and price volatility grow. TIP should therefore represent both the physical/usage market and possible financial exposure to its pricing, without assuming that every such instrument is currently standardized or lawfully available in every jurisdiction. citeturn272018news37

---

## 31. No-waste / residual market integration

Unconsumed or impaired economic capacity should not disappear from the graph.

Residuals may become:

```text
ASH CANDIDATE
RECOVERABLE INVENTORY
IDLE CAPACITY
FAILED ORDER
UNUSED SUBSCRIPTION
RETURNED GOODS
BY-PRODUCT
RECYCLED INPUT
RECOVERY CLAIM
SALVAGE
REPAIR OPPORTUNITY
REUSE OPPORTUNITY
```

The lifecycle should preserve the original provenance and establish a new state/representation rather than deleting the history.

---

## 32. Pulse integration

After execution and settlement, TIP should emit observations into the wider Carbon Actual feedback model:

```text
ACTIVITY
 ↓
INPUTS / COSTS
 ↓
OUTPUTS
 ↓
OUTCOME
 ↓
MEASURED FEEDBACK
 ↓
PULSE
 ↓
VALUE / RISK / PERFORMANCE OBSERVATION
 ↓
NEXT STATE
```

Pulse must not be treated as a price oracle by default.

It measures feedback/outcome and may inform value assessment, prioritization, risk or future market design.

---

## 33. Audit and event-sourced history

The system must preserve an append-only economic history for material events.

Canonical history should support:

```text
WHO
WHAT
WHEN
WHY
UNDER WHAT AUTHORITY
BASED ON WHICH VERSION
USING WHICH DATA
WHICH POLICY
WHICH MARKET RULE
WHICH COUNTERPARTY
WHAT RESULTED
WHAT CHANGED
```

Corrections should append compensating events instead of rewriting prior economic events.

---

## 34. Identities and graph references

TIP should use references to the wider Carbon Actual identity/authority graph:

```text
PERSON
LEGAL_ENTITY
ACCOUNT
AGENT
MACHINE
WALLET
CUSTODIAN
MARKET
VENUE
CONTRACT
OBJECT
RIGHT
CLAIM
POSITION
```

The same actor may have different roles in different markets, but the underlying identity should not be duplicated.

---

## 35. Security and operational controls

Every production market implementation should address:

```text
AUTHENTICATION
AUTHORIZATION
KEY MANAGEMENT
SECRETS
RATE LIMITING
FRAUD DETECTION
MARKET ABUSE MONITORING
ANOMALY DETECTION
REPLAY PROTECTION
IDEMPOTENCY
DATA INTEGRITY
DISASTER RECOVERY
BUSINESS CONTINUITY
ROLLBACK / COMPENSATION
KILL SWITCH
AUDIT ACCESS
```

Operational convenience must never weaken authority or settlement integrity.

---

## 36. Canonical market execution envelope

A market execution record should be conceptually expressible as:

```yaml
execution_id:
intent_id:
market_id:
marketplace_id:
venue_id:
mechanism_id:
participant_ids: []
principal_id:
agent_id:
object_ids: []
rights: []
claims: []
order_id:
match_id:
contract_id:
position_ids: []
quantity:
unit:
price:
price_formula:
currency:
temporal_window:
delivery_terms:
settlement_terms:
collateral_terms:
risk_snapshot:
eligibility_snapshot:
authority_snapshot:
evidence_ids: []
policy_version:
status:
created_at:
updated_at:
```

This is a logical canonical envelope, not a requirement for one database schema.

---

## 37. Market operating graph

The operating layer can be understood as a graph:

```text
IDENTITY
   │
AUTHORITY
   │
INTENT
   │
MARKET DISCOVERY
   │
OFFER / ORDER
   │
MATCH
   │
CONTRACT
   ├───────────────┐
POSITION          OBLIGATION
   │                   │
RISK              COLLATERAL
   │                   │
   └────── CLEARING ──┘
             │
         FULFILLMENT
             │
         SETTLEMENT
             │
      RECONCILIATION
             │
       ACCOUNTING
             │
        EVIDENCE
             │
           PULSE
             │
          LIFECYCLE
```

This graph becomes the reusable substrate for trading, investment, financing, commerce, capability, rights, infrastructure, environmental and future markets.

---

## 38. What TIP must never conflate

The architecture must preserve these distinctions:

```text
OBJECT ≠ REPRESENTATION
OWNERSHIP ≠ CUSTODY
RIGHT ≠ ACCESS
ACCESS ≠ ELIGIBILITY
CERTIFICATE ≠ AUTHORITY
STATUS ≠ PERMISSION
PRICE ≠ VALUE
VALUE ≠ RETURN
FORECAST ≠ FACT
ORDER ≠ TRADE
TRADE ≠ CONTRACT
CONTRACT ≠ POSITION
POSITION ≠ OWNERSHIP
COLLATERAL ≠ PAYMENT
PAYMENT ≠ SETTLEMENT FINALITY
TOKEN ≠ UNDERLYING
AGENT ≠ PRINCIPAL
MATCH ≠ SETTLEMENT
ACCOUNTING ENTRY ≠ ECONOMIC OBJECT
PULSE ≠ PRICE
```

These boundaries are architectural invariants.

---

## 39. Implementation consequence

Future TIP implementations should consume this operating model instead of creating separate transaction state machines for each market category.

The implementation may expose specialized experiences:

```text
TRADING TERMINAL
INVESTMENT
MARKETPLACE
PROCUREMENT
FINANCING
SUBSCRIPTION
CAPACITY RESERVATION
SERVICE MARKET
CARBON MARKET
DATA MARKET
AI MARKET
AGENT MARKET
TOKENIZED MARKET
```

But these interfaces must converge on the same canonical economic objects, relationship graph, authority model, lifecycle, settlement model and evidence trail.

---

## 40. Current architecture observations

The following developments reinforce the operating-model direction:

1. Tokenised settlement infrastructure is moving toward programmable, cross-border atomic settlement while regulators emphasize legal clarity, interoperability, governance and resilience. citeturn272018search0turn272018search1turn272018search6
2. Machine/agent commerce is developing explicit credentialing, permissioning, transaction and settlement infrastructure, including high-frequency and micro-value transactions. citeturn526860search0turn526860search3
3. Event/prediction contracts continue to evolve under active regulatory scrutiny, so legal eligibility must be part of activation rather than a post-hoc check. citeturn526860search2turn526860search4turn526860search6
4. AI infrastructure is producing new capacity and pricing exposures, including emerging financial instruments tied to GPU rental prices, making capacity/time/price linkage increasingly important to TIP. citeturn272018news37

These observations are signals for architecture, not claims that any particular market should be launched by TIP.

---

## 41. Canonical rule

> **Every legitimate TIP market must be able to trace an economic interaction from authorized intent, through discovery, terms, matching, contracting and position creation, through fulfillment, settlement and accounting, to evidence, Pulse and lifecycle recovery — while preserving the distinction between the object, its rights, its market representation, its exposure and the authority that permits action.**

This operating layer is therefore the execution bridge between the TIP Master Taxonomy and every future TIP market.
