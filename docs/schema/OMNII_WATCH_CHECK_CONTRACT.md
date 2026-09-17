# OMNII Watch / Check Contract

**Schema:** `omnii://schemas/watch-check/v1`

## Purpose

A watch/check describes how the ecosystem continuously observes a condition involving an existing canonical object, state, relationship, dependency, policy, trust state, settlement, liability, or lifecycle.

It is an **implementation contract**, not a new canonical truth object.

A check can be scheduled, event-triggered, state-triggered, threshold-triggered, dependency-triggered, or explicitly invoked. Its output must flow into existing canonical Event/Evidence/State semantics.

## Required fields

| Field | Meaning |
|---|---|
| `id` | Stable identifier for the check definition |
| `subject` | Canonical object, relationship, dependency, or scope being observed |
| `condition` | Observable condition being evaluated |
| `trigger` | Event, schedule, state change, threshold, dependency change, or manual trigger |
| `severity` | Consequence level of the finding |
| `authority` | Authority required for consequential response |
| `evidence` | Evidence required to support the finding |
| `response` | Observe, notify, recommend, confirm, authorize, block, or escalate behavior |

Optional fields carry policy, dependency, provenance, lifecycle, and implementation metadata.

## Canonical behavior

A check follows:

`observe → validate → establish provenance → classify risk → resolve authority → constrain capability → respond → record event/evidence → reconcile`

A check must not silently mutate canonical state merely because it detected a condition. Consequential state changes require the same authority and execution rules as any other action.

## Examples

The same contract covers:

- subscription renewal approaching;
- free trial nearing conversion;
- recurring charge failed;
- unwanted subscription still active after cancellation request;
- domain registration nearing expiry;
- TLS certificate nearing expiry;
- DNS or nameserver change detected;
- package/dependency vulnerable or stale;
- application/model version changed;
- terms or policy changed;
- accessibility regression detected;
- provider outage or dependency degradation;
- stale credential or authenticator;
- permission/authority drift;
- suspicious account/session/device change;
- payment or settlement mismatch;
- duplicate/replayed event;
- missing provenance/evidence;
- portability export missing semantics;
- agent action exceeds delegated capability;
- ad exposure conflicts with declared consent/policy;
- media rights or license approaching expiry;
- obligation or liability approaching a lifecycle boundary.

## Human attention policy

The response mode must be selected according to consequence and authority:

`observe silently → notify → recommend → request confirmation → require human authorization → block → escalate`

This avoids turning the ecosystem into a notification generator while still preserving human control over consequential changes.

## Provider neutrality

The watcher may observe provider APIs, webhooks, DNS, certificate transparency sources, payment notifications, application logs, browser events, device state, or external standards. Those are evidence/adapter inputs; they do not become the canonical source merely because the check consumes them.

## Failure behavior

A failed or unavailable check must not silently manufacture a positive assertion. The system must distinguish:

- confirmed condition;
- condition cleared;
- stale observation;
- insufficient evidence;
- provider unavailable;
- check itself failed.

This distinction prevents monitoring failure from being mistaken for a safe state.
