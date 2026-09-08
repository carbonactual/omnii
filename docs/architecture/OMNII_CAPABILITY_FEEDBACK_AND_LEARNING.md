# OMNII Capability Feedback & Learning

**Status:** Canonical architecture contract — 2026-09-08

## Purpose

Capability learning turns observed mission and provider outcomes into selection evidence for future routing. It is a feedback mechanism, not an authority mechanism.

## Loop

`CAPABILITY ROUTE → MISSION → EXECUTION → OBSERVATION → OUTCOME → LEARNING → SELECTION EVIDENCE → NEXT ROUTE`

## What may change

Learning may update or propose evidence about:

- historical success rate;
- provider reliability;
- observed latency;
- observed cost;
- failure frequency;
- mission-specific suitability;
- freshness of evidence;
- substitution performance after failure.

## What learning cannot change

Learning cannot:

- create authority;
- enlarge delegated scope;
- alter a mission objective;
- convert a blocked mission into a ready mission;
- turn a recommendation into permission;
- create or revoke a credential;
- redefine a canonical capability;
- make an unverified provider response into Actual state.

## Evidence discipline

Selection evidence is attributable to an outcome and should retain mission/provider/capability identity and observation time. Freshness and provenance are part of the evidence quality decision.

Negative outcomes remain valuable evidence. Failed capabilities are not silently removed from history, and successful outcomes do not create permanent trust.

## Provider resilience

The learning loop supports provider substitution. When multiple providers implement one canonical capability, historical evidence can guide selection while the canonical semantic identity remains unchanged.

Provider outages, rate limits and temporary degradation are runtime conditions. They do not change the canonical capability meaning.

## Relationship to Pulse

Capability learning is one input to the wider OMNII feedback/Pulse system. Pulse remains the broader value/feedback measurement layer. Capability learning must not be treated as a replacement for economic, evidentiary, authority or governance semantics.

## Stateless execution model

The runtime evaluator may compute a new signal from supplied history and new outcomes. Persistent learning storage is a separate governed data concern. This keeps routing reproducible and prevents hidden mutable state from silently changing authority.
