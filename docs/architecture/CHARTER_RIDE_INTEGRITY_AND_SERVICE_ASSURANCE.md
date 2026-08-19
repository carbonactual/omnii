# CHARTER — Ride Integrity & Service Assurance

**Status:** Canonical Charter composition specification
**Domain:** On-demand and scheduled transport
**Boundary:** Charter owns movement/service orchestration. Economic settlement, savings and ownership financing remain outside Charter in IO and the applicable canonical financial/product systems.

## Problem

Transport marketplaces can fail even when matching works. A confirmed trip can become an offline negotiation, a vehicle can materially differ from the selected class, a driver or rider can pressure the other party, or a trip can become unsafe or unusable after acceptance.

Charter must therefore govern the **integrity of the movement contract**, not merely discover a vehicle.

## 1. Fare commitment without fare ownership

Once a trip is confirmed, Charter records the agreed movement terms and exposes an immutable reference to them.

The driver/operator cannot unilaterally replace the agreed movement terms at pickup.

Legitimate changes require an explicit in-system change event, visible to the affected parties, with the applicable authority/policy permitting the change.

Charter does **not** calculate, hold, settle or own money. Any monetary authorization, adjustment, escrow, settlement, savings or financing is delegated to IO.

### Integrity states

```text
REQUESTED
 → OFFERED
 → ACCEPTED
 → CONFIRMED
 → PICKUP_VERIFIED
 → IN_PROGRESS
 → COMPLETED
```

An attempted off-system renegotiation, refusal after acceptance, or unauthorized fare change becomes an operational integrity event rather than an invisible side agreement.

## 2. Anti-off-platform coercion

The journey interface must support a one-action report for:

- driver demands a higher amount;
- driver requests off-platform payment;
- driver asks rider to cancel and pay directly;
- driver refuses the confirmed trip unless terms change;
- rider attempts an unauthorized off-platform arrangement.

The system should preserve the trip, communication/evidence permitted by policy, location/state and outcome for review.

This directly addresses a documented ride-hailing problem in Nigeria: reporting has described drivers asking riders to pay materially above the platform amount or cancel the platform trip. Uber and Bolt both provide mechanisms for handling extra/off-platform payment requests. 

## 3. Safety and sexual coercion boundary

No passenger is required to provide sexual activity, companionship, personal services or any other intimate act in exchange for transport.

Likewise, no driver/operator may request or condition transport on such conduct.

The product must provide:

- immediate trip termination/escalation path;
- discreet safety reporting;
- emergency assistance path;
- evidence preservation subject to law and privacy controls;
- account/operator review;
- protection against retaliation;
- alternative movement/recovery where appropriate.

This is a **safety and human-dignity control**, not a payment feature.

## 4. Vehicle/service class integrity

A selected movement class must have a verifiable service profile.

Examples:

```text
LUXURY
 → required vehicle class
 → required condition
 → required climate control
 → required cleanliness
 → required capacity
 → required identification
 → required operator qualification
```

A vehicle that arrives materially below the confirmed service specification must be detectable and reportable.

Vehicle readiness can include:

- roadworthiness;
- inspection validity;
- insurance/required documentation;
- working safety equipment;
- climate control where promised;
- doors/windows/seats;
- tyres and essential mechanical condition;
- cleanliness/service condition;
- required accessories;
- correct vehicle identity/plate;
- correct class/configuration.

Existing market practice demonstrates the importance of this layer: Uber's Nigeria requirements include roadworthiness/inspection documentation and, for UberX, a working air conditioner and good vehicle condition; Lagos authorities have also required e-hailing vehicle inspections because of safety and vehicle-condition concerns. 

## 5. Pickup verification

At pickup, Charter can verify the movement contract against the real-world state:

```text
DRIVER ID
 + VEHICLE ID
 + REGISTRATION
 + TRIP ID
 + SERVICE CLASS
 + LOCATION
 + READINESS
 = PICKUP ELIGIBILITY
```

A mismatch should trigger confirmation, substitution or safety escalation rather than silently proceeding.

## 6. Driver and rider protection

Integrity must be bilateral.

Drivers/operators need protection against:

- unsafe riders;
- unauthorized passengers;
- abusive/threatening conduct;
- destination manipulation;
- unsafe loading;
- fraudulent trip claims;
- requests to violate law or operating restrictions.

Riders need protection against:

- coercion;
- harassment;
- unsafe vehicles;
- identity mismatch;
- unauthorized route/destination changes;
- forced offline payment;
- discriminatory refusal;
- unsafe driving.

## 7. Reliability score is not a single rating

Charter should preserve evidence dimensions rather than collapse service quality into one number.

Possible dimensions:

- acceptance reliability;
- pickup reliability;
- cancellation behavior;
- punctuality;
- vehicle readiness;
- specification compliance;
- safety events;
- route integrity;
- incident/recovery history;
- customer/driver reports;
- evidence confidence.

These become signals for matching, eligibility, inspection and recovery rather than a simplistic popularity score.

## 8. Driver economics without Charter owning economics

A driver refusing a trip because the underlying operating conditions are unsustainable is a real ecosystem signal. Charter should capture operational facts such as distance, deadhead, route conditions, wait, vehicle readiness and cancellation behavior.

Any compensation, incentives, savings, reserve, insurance or ownership mechanism is handed to IO or the appropriate financial/product system.

This keeps Charter from reproducing an economic primitive while still allowing the transport system to become economically healthier.

## 9. Mandatory savings / ownership path

Where a Charter product requires that each eligible vehicle journey contribute toward a savings, maintenance reserve or ownership pathway, Charter records the **obligation/reference and qualifying transport event**.

It does not hold or move the funds.

Conceptually:

```text
QUALIFYING MOVEMENT EVENT
        ↓
SAVINGS / RESERVE OBLIGATION
        ↓
IO
        ↓
SAVINGS / OWNERSHIP / MAINTENANCE PRODUCT
```

This allows a vehicle operator or driver to have a pathway from use → reserve → maintenance → eventual ownership without putting financial logic inside the transport primitive.

## 10. Short ownership path

A future Charter product may compose:

```text
DRIVER / OPERATOR
 → VERIFIED VEHICLE
 → QUALIFYING WORK
 → MAINTENANCE RESERVE
 → OWNERSHIP PATHWAY
 → OWNED ASSET
```

The transport layer supplies verified usage, condition and operational history. IO supplies the value movement.

## 11. Recovery when integrity fails

If the confirmed movement cannot be safely or honestly delivered:

```text
FAILURE
 ↓
PROTECT PERSON
 ↓
PRESERVE TRIP STATE
 ↓
REPORT / EVIDENCE
 ↓
FIND SUBSTITUTE CAPABILITY
 ↓
RECOMPOSE JOURNEY
 ↓
COMPLETE / ESCALATE
```

The rider should not be forced to negotiate privately with the failing operator to obtain the originally requested service.

## 12. Constitutional boundary

Charter does not become a payment processor, bank, lender, insurer, employment authority, police authority or court.

It coordinates transport facts, movement state, service integrity, safety, evidence, matching and recovery through existing OMNII primitives and explicit handoffs.

## Architectural invariant

> **A confirmed movement must remain a trustworthy movement commitment: no unilateral renegotiation, no coerced exchange, no hidden service degradation, and no abandonment without a visible recovery path.**
