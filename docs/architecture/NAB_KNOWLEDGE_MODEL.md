# NAB — Unified Movement Knowledge Model

## Knowledge domains

NAB relates:

```text
PERSON / AGENT
ASSET
INFRASTRUCTURE
ORGANIZATION
AUTHORITY
ROUTE
JOURNEY
DOCUMENT
COMPLIANCE RECORD
EVENT
EVIDENCE
STATE
CAPABILITY
```

These are references to existing OMNII canonical objects where they already exist, not replacements for them.

## Key relationships

- person operates asset;
- organization owns/operates asset;
- authority regulates asset/person/route;
- asset is located at place;
- capability is provided by asset or qualified agent;
- journey uses route and capability;
- document authorizes or identifies an actor/asset;
- compliance record constrains or clears an actor/asset;
- event changes or reports state;
- evidence supports an event/state claim.

## Real-time state

Each current-state assertion should carry:

- subject;
- state;
- effective time;
- observed/received time;
- source;
- freshness/expiry expectation;
- confidence/status;
- authority context where applicable.

## Query examples

NAB should support questions such as:

- Which eligible movement capabilities are currently available here?
- Which assets have the required capacity?
- Which routes are currently restricted?
- Which certificates are expired or nearing expiry?
- Which assets are due for inspection?
- Which operators have the required qualification?
- Which journeys are affected by a current disruption?
- What evidence supports the current state?

## Source-of-truth rule

Where another OMNII domain is canonical for a fact, NAB stores the relationship/reference and relevant operational projection rather than silently becoming a competing source.
