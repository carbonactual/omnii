# OMNII IO / Value / Security Conformance

**Status:** Implemented shared substrate / conformance reference

This document is the implementation-facing index for the unified IO, Pulse, Value, transformation, tokenization, rights, ledger, settlement and ASH boundary.

## Canonical lifecycle

```text
Reality
→ Observation
→ Pulse
→ Feedback
→ Value
→ Mint
→ Democratization
→ Decentralization
→ Decimalization
→ Fractionalization
→ Tokenization
→ Ledgers
→ Blockchain (optional adapter)
→ Rights / Custody / Transfer / Exchange
→ Settlement
→ Use / Transformation / Recovery
→ Revalue
→ New Pulse
```

## Responsibilities

| Layer | Owns | Does not own |
| --- | --- | --- |
| Pulse | observed feedback and measurement | authority |
| Value | multidimensional value assessment | security authorization |
| IO / Mint | canonical value/object creation and movement | trust by itself |
| Transformation | democratization, decentralization, decimalization, fractionalization, tokenization ordering | constitutional ownership definitions |
| Tokenization | representation of an underlying minted object/right/state | automatic ownership or authority |
| Rights | ownership, custody, possession, control, access, use, claim, obligation, liability, authority as distinct states | token trust |
| Ledger | history and state-transition lineage | economic meaning |
| Settlement | realization of governed obligations/exchange | authority creation |
| ASH | identity, authorization, integrity, provenance, evidence, privacy, risk, fraud, revocation and recovery | economic valuation |
| Agent Authority | principal-bound delegated action scope | sovereign human authority |
| Lifecycle | correction, supersession, revocation, cancellation, reversal, restatement, recovery, retirement and transformation | destructive deletion of historical truth |

## Core invariants

1. Minting is not tokenization.
2. Tokenization is not ownership.
3. Tokenization is not trust.
4. Blockchain is not the definition of tokenization or security.
5. Authentication is not authorization.
6. Human authority is not inherited by AI merely from capability or intelligence.
7. Agent actions remain attributable to their principal.
8. Corrections preserve historical traceability.
9. Negative and residual value states remain observable rather than silently disappearing.
10. Every material transition can carry authority, provenance, evidence, value, rights, ledger, settlement and security references as applicable.

## Implemented modules

- `packages/omnii-economics/src/mint.mjs`
- `packages/omnii-economics/src/tokenization.mjs`
- `packages/omnii-economics/src/rights.mjs`
- `packages/omnii-economics/src/transition.mjs`
- `packages/omnii-economics/src/assurance.mjs`
- `packages/omnii-economics/src/agent-authority.mjs`
- `packages/omnii-economics/src/lifecycle.mjs`
- `packages/omnii-economics/src/integration.mjs`
- `packages/omnii-runtime/src/io-transition-runtime.ts`
- `supabase/migrations/20260906105000_io_pulse_tokenization_ash_integration.sql`
- `supabase/migrations/20260906111000_io_lifecycle_agent_assurance.sql`

## Product composition rule

BUNK, CHARTER, education, creator/media, exchange/trade, STOS, EMIRATE and future products consume these shared contracts. Product modules may add domain policy and UI behavior but must not redefine the universal IO, token, rights or ASH semantics.

## Provider boundary

Postgres/Supabase is a reference persistence implementation. External payment rails, identity systems, ledgers, token standards and blockchains are adapters behind the shared semantic contracts.
