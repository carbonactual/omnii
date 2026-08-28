# OMNII Institutional Finance & Commerce Atlas

**Status: CANONICAL REUSABLE DOMAIN ATLAS**

## Purpose

Provide reusable institutional finance, commerce, procurement, subscription, payment, value and settlement capabilities without creating institution-specific financial architectures.

## Registry families

Budget; fund; allocation; commitment; purchase requirement; solicitation; RFQ/RFP; bid; supplier; quotation; award; purchase order; contract; delivery; acceptance; invoice; receivable; payable; payment instruction; receipt; refund; fee; tariff; price; grant; financing; subscription; membership dues; payroll reference; settlement; reconciliation; ledger; financial control; dispute; chargeback; adjustment; tax/levy reference.

## Universal finance lifecycle

```text
need → budget/quote → commitment → authorization → procurement/contract → execution → delivery/acceptance → invoice → validation → payment → reconciliation → settlement → reporting → audit
```

## Subscription lifecycle

```text
offer → eligibility → signup → consent/terms → billing schedule → charge → receipt → service access → renewal → pause/cancel → refund/settlement → audit
```

## Controls

Support separation of duties, approval thresholds, spending limits, idempotency, duplicate detection, source-of-truth designation, reconciliation, exception cases, evidence and audit.

Detect duplicate payment, orphan payment, unmatched invoice, unapproved expenditure, expired authority, budget overrun, split-payment anomalies, stale commitment, failed settlement and reconciliation differences.

## Universal links

Finance records link to identity, authority, institution, contract, procurement, workflow, execution, evidence, reconciliation, ledger, settlement and Pulse/Value. Financial records never become proof of an operational outcome by themselves.

## Portability

Payment providers, banking rails, tax providers, invoicing systems and accounting products remain adapters. Regulated financial activity remains subject to applicable licensing and jurisdiction.

## Deployment

A deployment may configure local currencies, taxes, fees, charts of accounts, approval matrices, payment providers, settlement rules and reporting without changing the universal capability contract.
