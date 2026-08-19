# OMNII Assistance & Resource Circulation

## Status

**LOCKED — canonical architecture contract**

This layer defines the universal capability behind transport/charter assistance, roadside support, lending, rental, relay, return, and reciprocal resource circulation.

## Principle

> Need meets available capacity. Capacity may be physical, human, temporal, financial, informational, or operational. Fulfilment may be free, paid, rented, borrowed, deposited, reciprocal, sponsored, insured, or returned elsewhere.

## Scope

A request is not restricted to a predefined roadside-service catalogue. The system resolves a need against available capabilities and resources.

Examples include:

- battery rental, charging, jump-start, or battery swap
- tools, equipment, diagnostics, compressors, jacks, and spare parts
- mechanics, operators, recovery personnel, and other human assistance
- tow trucks, ambulances, recovery vehicles, convoy vehicles, and support fleets
- passenger relocation and vehicle substitution
- asset or part relay through an already-moving traveller or vehicle
- temporary lending and rental
- return obligations fulfilled at another node, town, city, route, or time
- free community assistance
- paid commercial assistance
- sponsored, insured, subsidized, or membership-covered assistance
- reciprocal assistance where value is returned later

## Universal resolution model

```text
NEED
  -> REQUIREMENT
  -> AVAILABLE CAPABILITY / RESOURCE
  -> LOCATION + TIME + ROUTE + URGENCY
  -> AVAILABILITY + AUTHORITY + SAFETY
  -> TERMS
       free | paid | rent | borrow | deposit | reciprocal
       sponsored | insured | subsidized | return-elsewhere
  -> COORDINATION
  -> FULFILMENT
  -> RETURN / RELAY / SETTLEMENT
  -> FEEDBACK / PROVENANCE
```

## Resource circulation

An asset does not have to return to its origin. A tool, battery, component, vehicle, or other resource may move through a network according to demand and availability. Return may be satisfied at a different registered node or through a later relay.

Example: a diagnostic tool in Ibadan can be lent for a need in Lagos, carried by an already-bound traveller, used there, and subsequently returned to Ibadan or redirected to another node where demand exists.

## Transport / Charter relationship

Charter/Transport owns the domain-specific coordination of movement, including vehicles, operators, passengers, routes, stops, traffic, recovery, emergency movement, and convoy operations.

Assistance & Resource Circulation is the reusable economic/capability primitive beneath that domain. Other ecosystem products may consume the same primitive without duplicating it.

## Constitutional boundaries

- No capability is assumed merely because a resource exists.
- Availability is distinct from authority to provide the resource or service.
- Urgency can affect matching priority but does not silently bypass safety or authority constraints.
- Terms are explicit and form part of the fulfilment contract.
- Every material fulfilment should preserve provenance and feedback.
- Free and paid fulfilment are both first-class states; payment is not the definition of assistance.
- Return obligations can be spatially and temporally separated from the original fulfilment.
- The abstraction remains modality-neutral: road, rail, sea, air, and future mobility environments can use the same primitive.

## Canonical abstraction

The durable primitive is **ASSISTANCE**: a coordinated response in which an identified need is matched to an authorized available capability/resource under explicit terms.

Roadside assistance is one application, not the primitive itself.
