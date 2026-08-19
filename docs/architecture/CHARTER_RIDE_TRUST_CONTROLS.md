# CHARTER — Ride Trust, Service Integrity & Ownership Pathway

**Status:** Canonical movement-control specification
**Domain:** Transport / movement
**Boundary:** Charter controls movement integrity. IO remains the value-movement boundary.

## Problem

A booking is not trustworthy merely because a request was matched. The physical movement must remain consistent with the accepted service, vehicle, operator, safety state and agreed journey conditions.

## 1. Commitment integrity

Once a movement commitment is accepted, the committed terms become part of the journey state.

A provider may not silently replace the commitment with an offline demand. Any legitimate change must be represented as an explicit change request containing:

- reason;
- affected journey/leg;
- changed capability;
- changed conditions;
- affected parties;
- authority/policy basis;
- acceptance or rejection;
- resulting state.

The system must distinguish provider cancellation from rider cancellation and from platform/network failure.

## 2. No coercive exchange

Transport cannot be conditioned on sexual activity, intimacy, companionship, gifts, favors or any other non-transport exchange.

A rider or operator can trigger a discreet safety report and recovery workflow without being required to negotiate with the other party.

This is a safety and dignity control, not an economic primitive.

## 3. Vehicle truth

The vehicle presented for a journey must correspond to the capability requested and accepted.

Relevant checks can include:

- identity/registration;
- make/model/class;
- seating/capacity;
- accessibility;
- air conditioning where required by the service class;
- safety equipment;
- inspection/roadworthiness;
- insurance/compliance evidence;
- maintenance readiness;
- configuration/modification state.

A failed or stale requirement can block assignment or trigger substitution.

## 4. Pre-pickup verification

The rider and operator should be able to verify the intended movement through canonical references such as:

```text
PERSON
+ DRIVER
+ VEHICLE
+ PLATE/IDENTIFIER
+ JOURNEY
+ PICKUP
+ DESTINATION
+ SERVICE CLASS
```

PIN/confirmation mechanisms can be composed where supported.

## 5. In-trip integrity

During execution, Charter can monitor movement state and detect exceptions such as:

- unexpected stop;
- route divergence;
- prolonged delay;
- vehicle/capability mismatch;
- trip abandonment;
- safety event;
- loss of required readiness;
- destination change.

Detection does not automatically imply wrongdoing. It creates an evidence-backed exception for appropriate response.

## 6. Recovery

```text
EXCEPTION
 → PROTECT PEOPLE
 → PRESERVE JOURNEY STATE
 → ASSESS
 → CONTACT / ESCALATE
 → SUBSTITUTE OR RECOVER
 → COMPLETE / CANCEL
 → RECORD EVIDENCE
```

Recovery may involve another vehicle, driver, tow/recovery capability, public transport, emergency services or authorized institutional resources.

## 7. Service quality as capability evidence

Ratings are not the sole source of truth. Service integrity can combine:

- accepted-versus-executed commitment;
- pickup completion;
- cancellation pattern;
- vehicle inspection;
- maintenance readiness;
- safety incidents;
- route/journey evidence;
- verified complaints;
- recovery events;
- training/qualification status.

Claims should retain provenance and confidence.

## 8. Driver and rider fairness

The same integrity layer protects both sides.

### Provider protections

- unsafe rider escalation;
- harassment reporting;
- unauthorized passenger reporting;
- fraudulent incident handling;
- safe cancellation/recovery;
- documented legitimate change requests.

### Rider protections

- no hidden fare renegotiation;
- no coercive exchange;
- correct vehicle class;
- verified operator/vehicle;
- safety escalation;
- replacement/recovery when service fails.

## 9. Vehicle ownership pathway

Charter may represent a vehicle's operational pathway without owning the value logic:

```text
QUALIFIED USE
 → VERIFIED WORK
 → ELIGIBILITY
 → RESERVE / SAVINGS REQUIREMENT
 → MAINTENANCE READINESS
 → OWNERSHIP PROGRAM
 → TRANSFER / OWNERSHIP STATE
```

The movement system records qualifying activity and operational requirements. **IO** handles savings, settlement, financing, payment, purchase and other value movement.

No mandatory percentage, monetary amount or financial product is hard-coded into Charter.

## 10. Fleet truth

A fleet record should make it possible to answer:

> What vehicle is this, where is it, what condition is it in, what can it do, who is authorized to operate it, what journeys is it assigned to, and what evidence supports those claims?

## 11. Institutional oversight

Authorized regulators and institutions can receive the movement evidence required by applicable law and policy through explicit interfaces. Charter does not grant authority merely because an integration exists.

## 12. Architectural invariant

> **A confirmed ride is a movement commitment, not an invitation to renegotiate, coerce, substitute an inferior capability, or move the transaction outside the governed journey.**
