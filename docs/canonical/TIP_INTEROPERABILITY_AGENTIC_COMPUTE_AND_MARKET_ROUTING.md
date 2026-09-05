# TIP — Interoperability, Agentic Commerce, Compute Markets & Market Routing

**Ecosystem:** Carbon Actual / OMNII  
**Product:** TIP — Trade, Investment & Value Markets  
**Status:** CANONICAL EXTENSION — approved  
**Purpose:** Extend TIP from a universal market taxonomy and operating lifecycle into an interoperable market control plane that can route governed economic interactions across venues, settlement rails, jurisdictions, agents, machines and emerging capacity markets.

---

## 1. What this means for TIP

The external market is moving toward a common problem TIP already needs to solve: economic activity is becoming increasingly programmable, machine-mediated, cross-platform and multi-rail.

BIS Project Agorá has demonstrated a prototype for multi-currency wholesale payments using tokenised commercial-bank deposits and tokenised central-bank reserves, including atomic settlement. BIS and related work also identify fragmentation and lack of interoperability as major obstacles to tokenised finance. citeturn170982search36turn170982search8

Mastercard launched Agent Pay for Machines in June 2026 around credentialing, permissioning, machine-speed transactions and multi-rail settlement across cards, accounts and stablecoins. citeturn820884search0turn820884search2

CME has announced H100 and B200 compute futures based on GPU rental-rate indices, with a planned October 5, 2026 launch subject to regulatory review. citeturn187542search0turn187542search2

The architectural consequence is important:

> **TIP should not merely be a marketplace. TIP should be the governed control plane that determines what economic interaction is intended, which market/venue/mechanism is appropriate, which authority and policy permit it, which settlement rail can complete it, and how the resulting economic state feeds back into Value and Pulse.**

---

## 2. Strategic benefit to Carbon Actual / OMNII

This extension gives the ecosystem six compounding advantages:

```text
1. ONE ECONOMIC IDENTITY
2. MANY VENUES / MANY RAILS
3. GOVERNED HUMAN + AGENT EXECUTION
4. REAL-TIME CAPACITY / MACHINE MARKETS
5. JURISDICTION-AWARE ACTIVATION
6. COMPLETE VALUE + LEAKAGE OBSERVABILITY
```

The product therefore moves from merely helping someone trade or invest to providing infrastructure for **economic orchestration**.

---

## 3. Interoperability as a canonical concern

TIP must treat interoperability as an independent architectural layer.

### Interoperability domains

```text
IDENTITY INTEROPERABILITY
AUTHORITY INTEROPERABILITY
DATA INTEROPERABILITY
MESSAGE INTEROPERABILITY
MARKET INTEROPERABILITY
ORDER / EXECUTION INTEROPERABILITY
ASSET / TOKEN INTEROPERABILITY
CUSTODY INTEROPERABILITY
PAYMENT INTEROPERABILITY
SETTLEMENT INTEROPERABILITY
CLEARING INTEROPERABILITY
REPORTING INTEROPERABILITY
EVIDENCE / ORACLE INTEROPERABILITY
REGULATORY / COMPLIANCE INTEROPERABILITY
```

The principle is:

```text
CANONICAL TIP OBJECT
        ↓
ADAPTER
        ↓
EXTERNAL SYSTEM
```

Never:

```text
EXTERNAL SYSTEM
        ↓
NEW COMPETING TIP OBJECT MODEL
```

An adapter translates an external representation into the canonical TIP graph without changing the canonical meaning.

---

## 4. Interoperability adapter classes

TIP should support explicit adapters for:

```text
IDENTITY_ADAPTER
CREDENTIAL_ADAPTER
AUTHORITY_ADAPTER
MARKET_ADAPTER
VENUE_ADAPTER
ORDER_ADAPTER
EXECUTION_ADAPTER
CUSTODY_ADAPTER
PAYMENT_RAIL_ADAPTER
SETTLEMENT_RAIL_ADAPTER
CLEARING_ADAPTER
BANKING_ADAPTER
TOKENIZATION_ADAPTER
ORACLE_ADAPTER
DATA_FEED_ADAPTER
REPORTING_ADAPTER
TAX_ADAPTER
REGULATORY_ADAPTER
```

Each adapter should preserve:

```yaml
adapter_id:
provider:
protocol:
version:
source_system:
target_system:
identity_mapping:
object_mapping:
permission_mapping:
message_mapping:
settlement_mapping:
jurisdiction:
effective_from:
effective_to:
provenance:
health_status:
```

Adapters are implementation boundaries, not economic authorities.

---

## 5. Market Router

TIP should introduce a reusable **Market Router**.

The router receives a canonical intent and determines which legitimate market path can satisfy it.

```text
INTENT
 ↓
OBJECT / CAPABILITY / RIGHT
 ↓
PARTICIPANT
 ↓
JURISDICTION
 ↓
ELIGIBILITY
 ↓
TIME / LOCATION
 ↓
MARKET FORM
 ↓
VENUE OPTIONS
 ↓
MECHANISM OPTIONS
 ↓
SETTLEMENT OPTIONS
 ↓
RISK / COST / LIQUIDITY
 ↓
ROUTE
```

The router may compare:

```text
PRICE
TOTAL COST
LIQUIDITY
SLIPPAGE
LATENCY
FAILURE RATE
SETTLEMENT FINALITY
COUNTERPARTY QUALITY
COLLATERAL REQUIREMENT
JURISDICTION
DATA RESIDENCY
FEES
TAX
ENVIRONMENTAL COST
AUTHORITY
```

The route decision must be explainable and auditable.

---

## 6. Agentic Commerce Layer

AI agents and machines become economic participants without becoming independent legal principals by default.

Canonical model:

```text
HUMAN / ENTITY PRINCIPAL
        ↓
DELEGATED AUTHORITY
        ↓
AGENT IDENTITY
        ↓
VERIFIABLE CREDENTIAL
        ↓
INTENT
        ↓
POLICY
        ↓
MARKET DISCOVERY
        ↓
NEGOTIATION / EXECUTION
        ↓
SETTLEMENT
        ↓
AUDIT / PULSE
```

### Agent capability record

```yaml
agent_id:
principal_id:
credential_id:
authority_scope:
market_scope:
object_scope:
spending_limit:
transaction_limit:
frequency_limit:
counterparty_rules:
jurisdiction_rules:
settlement_rules:
expiry:
revocation_status:
policy_version:
```

Agent credentials should be separate from authority. A credential proves or attests to identity/capability; the authority policy determines what the agent may actually do.

Mastercard's current machine-payment architecture explicitly separates credentialing, permissioning, transacting and settling. TIP adopts that same separation while keeping it implementation-neutral. citeturn820884search0turn820884search6

---

## 7. Verifiable Intent

TIP should support a portable **Verifiable Intent** object.

```yaml
intent_id:
principal_id:
agent_id:
purpose:
objective:
allowed_objects: []
allowed_markets: []
allowed_venues: []
max_transaction_value:
max_period_value:
allowed_payment_rails: []
allowed_currencies: []
counterparty_constraints: []
risk_constraints: []
jurisdiction_constraints: []
valid_from:
valid_until:
approval_reference:
policy_hash:
revocation_endpoint:
```

An external platform may satisfy this intent, but the TIP record remains the canonical authority trail.

---

## 8. Machine-to-machine markets

TIP must treat machine commerce as a first-class market participant pattern:

```text
MACHINE → MACHINE
AGENT → MACHINE
MACHINE → AGENT
AGENT → AGENT
HUMAN → AGENT → MACHINE
```

Potential machine-native objects include:

```text
API CALL
MODEL INFERENCE
GPU-HOUR
CPU-HOUR
STORAGE-GB-HOUR
BANDWIDTH-GB
ENERGY-KWH
ROBOT-HOUR
SATELLITE-DATA REQUEST
AUTONOMOUS DELIVERY SLOT
AUTONOMOUS VEHICLE CAPACITY
```

These can use:

```text
MICRO-PAYMENT
PAY-PER-USE
SUBSCRIPTION
RESERVATION
STREAMING
OUTCOME-BASED
AGENT-NEGOTIATED
```

The same economic lifecycle applies.

---

## 9. Compute as a market domain

Compute should be promoted from a capability example into a full market family.

### Compute objects

```text
GPU
CPU
TPU / ACCELERATOR
MEMORY
STORAGE
NETWORK
RACK
DATACENTER CAPACITY
POWER CAPACITY
COOLING CAPACITY
INFERENCE CAPACITY
TRAINING CAPACITY
MODEL SERVING CAPACITY
EDGE COMPUTE
QUANTUM COMPUTE CAPACITY
ROBOTICS COMPUTE CAPACITY
```

### Compute market forms

```text
SPOT COMPUTE
RESERVED COMPUTE
DAY-AHEAD COMPUTE
FORWARD COMPUTE
SUBSCRIPTION COMPUTE
USAGE COMPUTE
AUCTIONED COMPUTE
CAPACITY COMPUTE
INTERRUPTIBLE COMPUTE
FIRM COMPUTE
BURST CAPACITY
STREAMING INFERENCE
AGENTIC COMPUTE PROCUREMENT
COMPUTE FUTURES / DERIVATIVES WHERE LAWFUL
```

CME's announced H100 and B200 rental-index futures show that compute pricing can now become a financial risk-management object as well as a service/capacity object. citeturn187542search0turn187542search2

TIP must keep separate:

```text
PHYSICAL / SERVICE CAPACITY
        ≠
REFERENCE INDEX
        ≠
DERIVATIVE CONTRACT
        ≠
TRADING POSITION
```

---

## 10. Capacity market expansion

The same model extends beyond compute:

```text
ENERGY CAPACITY
BATTERY CAPACITY
GRID CAPACITY
TRANSPORT CAPACITY
PORT CAPACITY
WAREHOUSE CAPACITY
MANUFACTURING CAPACITY
WORKFORCE CAPACITY
HOSPITALITY CAPACITY
EVENT CAPACITY
TELECOM CAPACITY
SPECTRUM CAPACITY
SATELLITE CAPACITY
DATA CAPACITY
WATER CAPACITY WHERE LEGALLY PERMITTED
```

For each capacity market TIP should model:

```text
TOTAL CAPACITY
AVAILABLE CAPACITY
RESERVED CAPACITY
COMMITTED CAPACITY
USED CAPACITY
INTERRUPTIBLE CAPACITY
FIRM CAPACITY
LOCATION
TIME WINDOW
QUALITY / SLA
PRICE
PENALTY
METERING
SETTLEMENT
```

---

## 11. Programmable settlement layer

TIP should support programmable settlement without making blockchain mandatory.

Canonical pattern:

```text
CONDITION
 ↓
EVIDENCE
 ↓
VERIFICATION
 ↓
TRIGGER
 ↓
PAYMENT / TRANSFER
 ↓
FINALITY
```

Examples:

```text
PAY WHEN DELIVERY IS VERIFIED
PAY WHEN CUSTOMS CLEARANCE IS VERIFIED
RELEASE ESCROW WHEN QUALITY PASSES
PAY PER GPU-HOUR CONSUMED
PAY WHEN SERVICE LEVEL IS MET
PAY WHEN CARBON OUTCOME IS VERIFIED
RELEASE MILESTONE CAPITAL WHEN CONSTRUCTION PROOF IS ACCEPTED
```

This is consistent with current BIS exploration of programmable tokenised settlement and conditional payment logic. citeturn170982search7turn170982search8

---

## 12. Settlement rail abstraction

TIP should choose settlement from a set of eligible rails:

```text
BANK TRANSFER
CARD
PAYMENT SYSTEM
RTGS
TOKENISED DEPOSIT
CENTRAL BANK MONEY
CBDC WHERE AVAILABLE
STABLECOIN WHERE LEGALLY / OPERATIONALLY ELIGIBLE
SECURITIES TRANSFER
COMMODITY DELIVERY
IN-KIND SETTLEMENT
INTERNAL LEDGER
ATOMIC DIGITAL SETTLEMENT
```

Selection criteria include:

```text
LEGAL STATUS
COUNTERPARTY ACCEPTANCE
FINALITY
CURRENCY
COST
LATENCY
LIQUIDITY
REVERSIBILITY
CUSTODY
JURISDICTION
AML / SANCTIONS
DATA / PRIVACY
```

TIP therefore becomes settlement-rail agnostic while remaining settlement-aware.

---

## 13. Regulatory / jurisdiction adapter

Regulation must be represented as policy inputs, not buried in application code.

Canonical dimensions:

```text
JURISDICTION
REGULATOR
PRODUCT CLASSIFICATION
PARTICIPANT ELIGIBILITY
LICENSE
PERMIT
KYC / KYB
AML / CFT
SANCTIONS
TAX
MARKET-CONDUCT RULES
CONSUMER PROTECTION
DATA RESIDENCY
PRIVACY
REPORTING
CAPITAL / MARGIN RULES
SETTLEMENT RULES
```

The adapter returns:

```text
ALLOWED
ALLOWED_WITH_CONDITIONS
REQUIRES_APPROVAL
REQUIRES_LICENSE
RESTRICTED
PROHIBITED
UNKNOWN
```

No market is activated solely because TIP can model it.

---

## 14. Event and prediction market safety boundary

TIP can model event/prediction market structures without assuming they are universally permissible.

The current CFTC regulatory process illustrates why jurisdictional policy must remain dynamic: in March 2026 the CFTC issued an advance notice of proposed rulemaking on prediction markets and event contracts, addressing classification, public-interest questions and regulatory requirements. citeturn187542search1turn187542search24

Therefore:

```text
MARKET FORM = PREDICTION
        ≠
AUTOMATIC PERMISSION
```

Activation requires the jurisdiction/policy adapter and the applicable authority.

---

## 15. Reference market construction patterns

### Pattern A — Cross-border trade

```text
BUYER INTENT
 → IMPORT / EXPORT OBJECT
 → SELLER MATCH
 → CONTRACT
 → CUSTOMS / CLEARANCE
 → DELIVERY EVIDENCE
 → CONDITIONAL SETTLEMENT
 → RECONCILIATION
 → PULSE
```

### Pattern B — Agent buys compute

```text
AI AGENT INTENT
 → COMPUTE CAPABILITY
 → MARKET ROUTER
 → GPU RESERVATION / SPOT
 → CREDENTIAL + SPENDING LIMIT
 → USAGE METER
 → MICRO / PERIODIC SETTLEMENT
 → PERFORMANCE / COST FEEDBACK
```

### Pattern C — Compute hedge

```text
EXPECTED GPU CONSUMPTION
 → CAPACITY FORECAST
 → PHYSICAL PROCUREMENT
 +
REFERENCE INDEX / HEDGE WHERE LAWFUL
 → RISK OFFSET
 → ACTUAL USAGE
 → SETTLEMENT
 → HEDGE PERFORMANCE
```

### Pattern D — Tokenised DvP

```text
TOKENISED ASSET
 +
ELIGIBLE SETTLEMENT ASSET
 → AUTHORITY
 → LOCK / RESERVE
 → DELIVERY-VERSUS-PAYMENT
 → ATOMIC SETTLEMENT
 → FINALITY
 → REPORTING
```

### Pattern E — Conditional supplier payment

```text
SUPPLIER CONTRACT
 → DELIVERY
 → INSPECTION
 → VERIFIED EVIDENCE
 → RELEASE CONDITION
 → SETTLEMENT
```

---

## 16. Economics and anti-leakage observability

Interoperability gives TIP a new ability: compare the complete economic cost of different market paths.

For every routed interaction preserve:

```text
GROSS VALUE
DIRECT PRICE
FEES
SPREAD
SLIPPAGE
FX COST
TAX
DUTY
FINANCING COST
COLLATERAL COST
ENERGY COST
COMPUTE COST
LATENCY COST
FAILURE COST
RECOVERY COST
NET VALUE
OUTCOME
```

This allows Carbon Actual to identify:

```text
VALUE CREATED
VALUE TRANSFERRED
VALUE CONSUMED
VALUE LOST
VALUE LEAKAGE
VALUE RECOVERED
```

The system must not assume that the cheapest quoted price is the best route; total lifecycle value and risk matter.

---

## 17. Market health and route intelligence

TIP should continuously calculate market-path observations:

```text
ROUTE_SUCCESS_RATE
SETTLEMENT_SUCCESS_RATE
AVERAGE_LATENCY
FAILURE_RATE
DISPUTE_RATE
RECOVERY_RATE
FEE_LOAD
SLIPPAGE
LIQUIDITY
COUNTERPARTY PERFORMANCE
CAPACITY UTILIZATION
AGENT POLICY VIOLATIONS
PRICE QUALITY
OUTCOME QUALITY
```

Pulse can consume these observations to evaluate the actual economic usefulness of a market, venue, mechanism, rail or agent.

---

## 18. Security and revocation

Every external integration should support:

```text
KEY / CREDENTIAL ROTATION
REVOCATION
SUSPENSION
RATE LIMIT
SPEND LIMIT
MARKET LIMIT
COUNTERPARTY BLOCK
EMERGENCY KILL SWITCH
REPLAY PROTECTION
IDEMPOTENCY
PROVENANCE
AUDIT LOG
```

A security event should never silently rewrite the underlying economic history.

Phoenix may consume security/risk events to isolate or revoke compromised actors or paths while preserving historical evidence.

---

## 19. Canonical machine-readable routing record

```yaml
route_id:
intent_id:
object_id:
principal_id:
agent_id:
market_id:
market_form_ids: []
venue_id:
mechanism_id:
regulatory_decision:
authority_decision:
risk_decision:
settlement_rail:
settlement_asset:
currency:
pricing_basis:
expected_cost:
expected_latency:
liquidity_observation:
confidence:
selected_at:
expires_at:
route_version:
adapters: []
provenance:
```

---

## 20. New conceptual TIP domains / facets

The extension introduces these reusable concepts without requiring new standalone products:

```text
INTEROPERABILITY
ADAPTER
ROUTER
VERIFIABLE_INTENT
AGENT_CREDENTIAL
DELEGATED_AUTHORITY
MACHINE_PARTICIPANT
SETTLEMENT_RAIL
SETTLEMENT_ASSET
PROGRAMMABLE_CONDITION
REGULATORY_ADAPTER
JURISDICTION_POLICY
COMPUTE_CAPACITY
CAPACITY_MARKET
USAGE_METER
REFERENCE_INDEX
MARKET_PATH
ROUTE_OBSERVATION
```

Recommended IDs:

```text
TIP:INFRASTRUCTURE:MARKET_ROUTER:1
TIP:INFRASTRUCTURE:SETTLEMENT_RAIL:1
TIP:AGENT:VERIFIABLE_INTENT:1
TIP:AGENT:DELEGATED_AUTHORITY:1
TIP:AGENT:CREDENTIAL:1
TIP:MARKET:COMPUTE_CAPACITY:1
TIP:MARKET:CAPACITY:1
TIP:MARKET:REFERENCE_INDEX:1
TIP:INTEROPERABILITY:ADAPTER:1
TIP:REGULATION:JURISDICTION_POLICY:1
TIP:ROUTING:MARKET_PATH:1
```

---

## 21. Architectural expansion

TIP can now serve as a common denominator for:

```text
TRADE
INVESTMENT
FINANCING
MARKETPLACES
PROCUREMENT
SERVICES
SUBSCRIPTIONS
CAPACITY
COMPUTE
ENERGY
TRANSPORT
PROPERTY
ENVIRONMENT
CARBON
DATA
AI
AGENTS
TOKENIZED ASSETS
DIGITAL RIGHTS
PUBLIC ALLOCATION
INTERNAL ENTERPRISE MARKETS
CROSS-BORDER COMMERCE
MACHINE-TO-MACHINE COMMERCE
```

The same core is retained:

```text
OBJECT
+ RELATION
+ MARKET FORM
+ INTENT
+ AUTHORITY
+ ROUTE
+ CONTRACT
+ POSITION
+ FULFILLMENT
+ SETTLEMENT
+ EVIDENCE
+ ACCOUNTING
+ PULSE
```

---

## 22. Design invariant

> **TIP must be able to connect markets without becoming dependent on any one market, payment network, blockchain, bank, agent framework, regulator, venue, protocol or vendor.**

Interoperability is therefore treated as a constitutional architectural capability, while each external rail remains an adapter with its own authority, legal status, risk and lifecycle.

---

## 23. Boundary of what is built

This document establishes the canonical architecture and vocabulary.

It does **not** claim that every external settlement rail, regulated market, compute derivative, tokenized instrument or agent payment network is already connected to Carbon Actual / OMNII.

The build target is the reusable control plane and adapter contract so that such integrations can be added without redesigning TIP.
