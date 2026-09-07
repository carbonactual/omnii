# OMNII Universal Settlement & Clearing Layer

**Status:** CANONICAL COMPOSITION LAYER — 2026-09-07  
**Authority:** subordinate to the OMNII Constitution and canonical value/IO semantics

## Purpose

Provide a universal mechanism for reconciling obligations, rights, credits, debits, deliveries, returns and value transitions across money and non-money exchange.

Settlement is not identical to payment. A payment is one possible settlement instrument.

## Core model

`Commitment → Obligation → Fulfillment → Valuation → Netting → Settlement Instruction → Settlement → Reconciliation → Finality`

## What can settle

The layer supports open-world value classes including:

`money, currency, token, credit, debt, equity, royalty, property, goods, services, time, capacity, capability, access, rights, licenses, permits, memberships, subscriptions, data rights, attention, reputation, opportunity and other governed value`

The system must not assume that every exchange is denominated in a currency.

## Obligation ledger

Every material exchange may create one or more obligations with:

`obligor + beneficiary + instrument/value_type + quantity + conditions + due_time + jurisdiction + priority + evidence + status`

Obligations are first-class records and may be linked to contracts, orders, invoices, funding, collateral, deliveries or other IO events.

## Clearing

Clearing determines what is owed among parties and may perform:

- matching and offsetting
- aggregation
- netting
- reconciliation
- conditional release
- collateral checks
- multi-party settlement routing
- exception handling

No clearing operation may erase the underlying transaction history.

## Settlement instruments

Supported instruments remain provider-neutral:

`bank transfer, card, wallet, token transfer, escrow, credit, voucher, coupon, barter, service exchange, advance, favor/CSR commitment, asset transfer, entitlement transfer, royalty allocation`

Provider-specific adapters belong beneath the interoperability boundary.

## Finality

Settlement states must distinguish:

`proposed → authorized → instructed → pending → partially_settled → settled → reconciled → disputed → reversed/corrected`

Legal or provider-specific finality is represented explicitly and never inferred solely from an internal status.

## Fractionalization and decimalization

A value may be divided only when its rights and settlement rules permit division. Fractions are explicit claims over an underlying governed object/value and are not treated as independent reality without provenance to the underlying position.

## Escrow and conditional settlement

Escrow may hold value until declared conditions are satisfied. Conditions must identify evidence requirements, authorized release authority, expiration and dispute path.

## Multi-party flows

The layer supports atomic-looking compositions across participants while accepting that external systems may settle asynchronously. A coordinator records the overall state and each leg independently.

## Corrections

Corrections are compensating records, not destructive edits. A correction retains:

`original event → reason → authority → correction event → downstream impact`

This integrates with IO and ASH/security records.

## Economic integration

Settlement consumes value observations and economic classifications but does not determine value by itself. Pulse may evaluate realized outcome versus value given, including asset/liability characterization under the ecosystem's economic doctrine.

## Fraud and anomaly controls

Settlement can be blocked, held or escalated by policy when identity, authority, provenance, limits, velocity, duplication, anomaly or reconciliation checks fail.

A risk hold is not a final rejection unless authorized by the applicable policy/authority.

## Cross-ecosystem settlement

Interoperability must preserve:

`source identity + source authority + ownership + provenance + terms + jurisdiction + settlement semantics`

Cross-ecosystem exchange never implies authority portability.

## Integration contract

`intent → offer/order/contract → obligation → fulfillment/evidence → valuation → clearing → instruction → settlement → reconciliation → outcome → Pulse`

Every material financial or non-financial value transition should be traceable back to its originating IO and authorization context.

## Conformance invariant

**Nothing is considered settled merely because a message was sent. Settlement requires an observable, attributable state and reconciliation path.**
