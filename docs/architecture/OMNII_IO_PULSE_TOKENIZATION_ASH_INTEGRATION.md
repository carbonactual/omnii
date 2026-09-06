# OMNII IO + Pulse + Tokenization + ASH Integration

**Status:** Implemented shared substrate / conformance reference

This document records the implemented boundary between the economics kernel and the security/assurance layer.

## Canonical flow

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

ASH protects consequential transitions across the flow. It does not define the economic meaning of the underlying value.

## Implemented contracts

| Contract | Implementation |
| --- | --- |
| Mint record | `packages/omnii-economics/src/mint.mjs` |
| Token representation | `packages/omnii-economics/src/tokenization.mjs` |
| Rights | `packages/omnii-economics/src/rights.mjs` |
| IO transition | `packages/omnii-economics/src/transition.mjs` |
| ASH assurance | `packages/omnii-economics/src/assurance.mjs` |
| Runtime assurance boundary | `packages/omnii-runtime/src/io-transition-runtime.ts` |
| Persistent IO/ASH records | `supabase/migrations/20260906105000_io_pulse_tokenization_ash_integration.sql` |
| Contract/conformance tests | `packages/omnii-economics/tests/economics.test.mjs` |

## Invariants

- Minting creates a canonical record; it does not automatically create a token.
- Tokenization references an underlying/minted object and does not automatically create ownership or authority.
- Ownership, custody, possession, control, access, use, claim, obligation, liability and authority remain distinct rights/states.
- ASH may allow, deny, challenge, hold, quarantine or escalate a transition without silently rewriting its economic references.
- Revocation, correction, reversal and supersession preserve historical traceability.
- Token classes remain extensible; blockchain remains optional infrastructure.
- Negative, residual, depleted, redundant, harmful and uncertain states remain observable rather than being silently discarded.
- Agent execution remains attributable to a principal and remains bounded by authority/policy checks at the runtime boundary.

## Provider boundary

The contracts are provider-neutral. Supabase/Postgres provides a reference persistence implementation. External identity, credential, ledger, payment, blockchain and settlement systems are adapters and must not redefine OMNII constitutional semantics.
