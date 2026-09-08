# OMNII Contradiction Resolution Doctrine — Canonical

**Status: CANONICAL**  
**Date: 2026-09-08**

## Rule

A contradiction is not automatically a defect. It may represent history, scope variation, provider semantics, implementation lag, or a genuine constitutional conflict.

## Authority precedence

`Constitution/Human Authority → canonical architecture → canonical registries/contracts → runtime contracts → implementation → observed runtime/data → historical/proposed material`

Within the same authority class, the applicable explicit supersession/versioning rule decides. Timestamp alone is insufficient.

## Resolution lifecycle

`detect → preserve → classify → identify authority → decide → record decision → mark superseded/retained → propagate → re-run conformance`

## Allowed outcomes

- **superseded** — prior definition remains historical evidence but no longer governs.
- **retained** — both records remain valid because scope/jurisdiction differs.
- **scoped** — each definition is valid under an explicit context.
- **provider-specific** — external/provider behavior is kept below canonical semantics.
- **implementation-drift** — implementation is behind the governing contract.
- **constitutional-conflict** — requires human/governance intervention.
- **unresolved** — preserved and blocked from unsafe promotion.

## Non-destructive history

Do not erase contradictory or obsolete artifacts solely to make the repository appear consistent. Preserve provenance and attach a resolution record.

## Enforcement

Any conformance system MUST distinguish:

`current canonical`
`current implementation`
`historical`
`proposed`
`deprecated`
`unknown`

No agent may resolve a constitutional conflict by itself. Agents may detect, classify, summarize and propose; authority remains governed.
