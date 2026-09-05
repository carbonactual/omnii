# TIP Rights, Access, Status & Specialized Markets

**Ecosystem:** Carbon Actual / OMNII  
**Product:** TIP — Trade, Investment & Value Markets  
**Status:** CANONICAL EXTENSION — approved  
**Purpose:** Extend TIP beyond conventional assets, capabilities and infrastructure to rights, permissions, access, status, certificates, positions, collateral, repossession, locations and specialized real-world economic objects.

---

## 1. Fundamental Extension

TIP must distinguish four related but different concepts:

```text
THING / RESOURCE
       ↓
RIGHT / ACCESS / STATUS
       ↓
CLAIM / POSITION / CERTIFICATE
       ↓
CONTRACT / COLLATERAL / FINANCING
       ↓
TRANSACTION / USE / OUTCOME
```

A person does not need to own an object for an economically meaningful right, access permission, certificate, reservation, position or contractual interest to exist.

Therefore a TIP Market Object may represent a **right, permission, entitlement, status, location, evidence, access relationship, claim or obligation** even where the underlying object itself is not transferred.

No such object is automatically tradable or financeable. Legal character, transferability, authority, privacy, public-interest constraints and jurisdiction remain separate controls.

---

## 2. Access Markets

Access itself can have economic value.

Examples:

- access to infrastructure
- access to data where lawful
- API access
- MCP/tool access
- software access
- AI model access
- compute access
- storage access
- network/bandwidth access
- energy access
- charging access
- warehouse access
- land access
- office access
- apartment access
- hotel/accommodation access
- transport access
- vessel/charter access
- event access
- facility access
- membership access
- educational access
- healthcare access
- professional expertise access
- public-service access where legally and ethically appropriate.

Access may be:

```text
ONE-TIME
TIME-LIMITED
RECURRING
SUBSCRIPTION
METERED
CAPACITY-RESERVED
CONDITIONAL
ROLE-BASED
PURPOSE-BASED
```

An access right must retain its relationship to the underlying resource and its expiry, limitations and authority.

---

## 3. Clearance & Eligibility Markets

**Clearance** is a status/capability that can determine whether a person, asset, shipment, vehicle, facility, transaction or activity may proceed.

Examples include:

- customs clearance
- import/export clearance
- security clearance
- regulatory clearance
- environmental clearance
- planning/development approval
- operational certification/clearance
- aviation/maritime clearance
- vehicle clearance
- event clearance
- health/inspection clearance where legally applicable
- market admission/eligibility
- product conformity clearance
- financial market eligibility.

Clearance should be represented as a **time-bound, authority-issued status/evidence object**, not as ownership.

```text
SUBJECT
  ↓
APPLICATION / ASSESSMENT
  ↓
DECISION
  ↓
CLEARANCE / REFUSAL / CONDITIONAL STATUS
  ↓
VALIDITY WINDOW
  ↓
REVIEW / REVOCATION / EXPIRY
```

Clearance records must preserve issuing authority, scope, conditions, evidence references and validity period.

---

## 4. Certificates & Verifiable Evidence

A certificate is an evidence/status representation, not automatically the underlying asset.

TIP should represent:

- certificates of ownership/registration
- title-related certificates
- inspection certificates
- quality certificates
- origin certificates
- conformity certificates
- professional credentials
- training/education credentials
- sustainability/environmental certificates
- carbon-related certificates
- laboratory/test certificates
- insurance certificates
- warehouse receipts/certificates
- vessel/aircraft certificates
- building/property certificates
- licences
- permits
- accreditations
- membership credentials.

Each certificate should maintain:

```text
certificate_id
subject
issuer
authority
claim
scope
evidence
issue_date
expiry_date
status
revocation_state
jurisdiction
verification_method
provenance
linked_market_objects
```

A certificate may unlock access, eligibility, financing or market participation without itself being a tradable instrument.

---

## 5. Position as a First-Class Object

**Position** is broader than an accounting balance.

TIP should represent:

- ownership position
- investment position
- trading position
- FX position
- commodity position
- collateral position
- credit position
- liquidity position
- exposure position
- risk position
- contractual position
- inventory position
- queue/reservation position
- capacity position
- environmental position
- geographic/territorial position where legally meaningful
- operational position
- market-making position.

A position is therefore an **economic state relative to one or more Market Objects, obligations or markets**.

Minimum attributes may include:

```text
position_id
principal
market_object
quantity
unit
side
entry/reference state
current state
exposure
collateral
margin
cost basis
valuation
realized/unrealized state
rights
obligations
risk
jurisdiction
status
```

Position must support partial ownership/exposure, short/long relationships where permitted, netting, hedging and aggregation without conflating them with title.

---

## 6. Collateral Markets

Collateral is a **risk-control relationship**, not merely an asset classification.

TIP should support:

- cash collateral
- securities collateral
- commodity collateral
- inventory collateral
- warehouse-receipt collateral
- receivable collateral
- equipment collateral
- vehicle collateral
- property collateral
- intellectual-property-related collateral where legally valid
- project cash-flow collateral
- guarantees
- other eligible security interests.

The collateral lifecycle is:

```text
ELIGIBLE ASSET / CLAIM
        ↓
VALUATION
        ↓
PLEDGE / CONTROL
        ↓
HAIRCUT / LIMIT
        ↓
MONITORING
        ↓
REVALUATION
        ↓
RELEASE / REALIZATION / SUBSTITUTION
```

Collateral must remain linked to ownership, custody, valuation, encumbrance and the secured obligation.

---

## 7. Repo / Repurchase Transactions

**Repo** must be recognized as a distinct financing/market mechanism.

Canonical structure:

```text
PARTY A
  ↓ sells / transfers eligible security
PARTY B
  ↓ provides cash

FUTURE AGREED REPURCHASE
  ↓
RETURN OF SECURITY / CASH
```

TIP must support, where legally permitted:

- repo
- reverse repo
- securities lending/borrowing
- collateral substitution
- haircuts
- margin calls
- maturity/rollover
- close-out
- netting
- settlement
- collateral valuation.

Repo is not simply “selling an asset.” The system must retain the financing relationship and repurchase obligation.

---

## 8. Reservation, Queue & Priority Positions

Economic value can exist in a **place in a queue or reservation**.

Examples:

- warehouse slot
- port slot
- berth
- airport slot where transferable/assignable
- charging slot
- accommodation reservation
- event reservation
- production slot
- manufacturing capacity reservation
- compute reservation
- cloud capacity reservation
- hospital appointment where legally transferable only if applicable
- service appointment
- logistics booking.

TIP should model:

```text
RESOURCE / CAPACITY
      ↓
RESERVATION
      ↓
PRIORITY / TIME WINDOW
      ↓
USE / TRANSFER / RELEASE
```

Transferability must always be determined by applicable rules.

---

## 9. Location & Space Rights

Location can be an economic primitive independently from ownership.

Examples:

- land parcel
- apartment unit
- office unit
- warehouse position
- parking space
- storage locker
- berth
- docking position
- campsite
- event space
- agricultural plot
- mining concession area
- grazing area
- right-of-way
- easement
- access corridor
- broadcast/spectrum-related spatial rights where applicable.

A location object should distinguish:

```text
GEOGRAPHY
BOUNDARY
TITLE / OWNERSHIP
POSSESSION
LEASE
EASEMENT
ACCESS
OCCUPANCY
RESERVATION
USE RIGHT
CAPACITY
RESTRICTION
```

---

## 10. Grave Plots & Memorial Rights

A grave plot is a specialized real-world **location + right + service + continuity** object.

TIP should be capable of representing, where lawful and culturally appropriate:

- cemetery plot
- burial right
- interment right
- memorial space
- mausoleum space
- family plot
- perpetual/term-use rights
- maintenance obligations
- memorial services
- transfer/inheritance rules where permitted.

It must distinguish:

```text
LAND / CEMETERY
      ↓
PLOT
      ↓
BURIAL / MEMORIAL RIGHT
      ↓
SERVICE / MAINTENANCE
      ↓
RECORD / FAMILY / CONTINUITY
```

A burial or memorial right must not be treated as an ordinary speculative financial instrument simply because it has a price. Public policy, cultural practice, dignity, inheritance, transferability and cemetery rules take precedence.

This is an example of why TIP is a universal economic ontology rather than a speculative trading catalogue.

---

## 11. Skills, Credentials & Human Capability Positions

A **skill** is distinct from a person, job and credential.

TIP should represent:

- skill
- competency
- qualification
- licence
- certification
- professional standing
- experience
- availability
- capacity
- reputation/evidence
- service offer
- employment/contract position.

Lifecycle:

```text
LEARNING
 ↓
SKILL
 ↓
EVIDENCE / CREDENTIAL
 ↓
CAPABILITY
 ↓
SERVICE OFFER
 ↓
CONTRACT
 ↓
DELIVERY
 ↓
PERFORMANCE / PULSE
 ↓
REPUTATION
```

Human beings must never be reduced to commodities by this model. TIP represents **voluntarily offered capabilities and contractual/service relationships**, subject to dignity, labour rights, law and consent.

---

## 12. Rights & Permissions

TIP should have a general **Rights Layer** covering:

- ownership
- possession
- access
- use
- lease
- licence
- easement
- franchise
- distribution right
- commercial right
- copyright licence
- royalty entitlement
- voting/governance right
- redemption right
- conversion right
- purchase option
- renewal right
- cancellation right
- transfer right
- inheritance-related right
- environmental/use entitlement where legally recognized.

Rights must be represented independently of the underlying object.

---

## 13. Repossession, Default & Recovery

TIP must also represent the opposite side of collateral and financing: **default and recovery**.

```text
OBLIGATION
   ↓
BREACH / DEFAULT
   ↓
NOTICE / CURE
   ↓
ENFORCEMENT PATH
   ↓
REPOSSESSION / REALIZATION WHERE LAWFUL
   ↓
SALE / SETTLEMENT / RECOVERY
   ↓
REMAINDER / RELEASE
```

Repossession is a controlled legal/operational action, not an autonomous AI power. Human/legal authority and jurisdiction-specific procedures govern it.

---

## 14. Status Markets

Many economically important states are neither assets nor services.

TIP should represent statuses such as:

- active
- inactive
- approved
- pending
- cleared
- restricted
- pledged
- encumbered
- reserved
- occupied
- available
- under maintenance
- in transit
- in production
- quarantined
- disputed
- suspended
- expired
- retired
- revoked
- recovered.

Status changes generate Pulse and can alter eligibility, valuation, risk, access and market availability.

---

## 15. Specialized Object Rule

The following categories must therefore be treated as native TIP concepts rather than edge cases:

```text
ASSET
RESOURCE
CAPABILITY
SERVICE
RIGHT
ACCESS
PERMISSION
STATUS
CERTIFICATE
POSITION
CLAIM
CONTRACT
OBLIGATION
COLLATERAL
INVENTORY
LOCATION
RESERVATION
CAPACITY
SKILL
KNOWLEDGE
REPUTATION / EVIDENCE
EVENT
OUTCOME
REPRESENTATION
```

This list is extensible. New object types must compose with the same identity, authority, provenance, valuation, risk, eligibility, transaction, Pulse and lifecycle primitives.

---

## 16. Canonical Rule

> **TIP must be able to represent not only what someone owns, but what someone may access, use, claim, provide, reserve, certify, finance, pledge, occupy, license, perform, transfer, or is obligated to do.**

This extension prevents TIP from becoming an asset-only trading system and keeps the architecture capable of representing the full economic reality of people, organizations, markets, infrastructure, rights and obligations.
