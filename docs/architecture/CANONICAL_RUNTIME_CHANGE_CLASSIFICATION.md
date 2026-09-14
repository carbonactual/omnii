# Canonical Runtime Change Classification

Every proposed architectural or implementation change MUST be classified before affecting canonical structures.

| Class | Meaning | Authority effect | Required handling |
|---|---|---|---|
| `CLARIFICATION` | Explains existing semantics without changing them | None | Link to canonical source and preserve existing identifier |
| `IMPLEMENTATION` | Changes code/infrastructure beneath a stable contract | None | Tests + compatibility verification |
| `CAPABILITY_EXTENSION` | Adds reusable capability under an existing family | Extends | Registry + capability manifest + contract tests |
| `DOMAIN_BRANCH` | Adds product/institution/domain composition | Branch-only | Product manifest + canonical traceability |
| `AMENDMENT` | Changes a frozen constitutional concept/boundary | Explicit constitutional change | Amendment record + review + updated frozen package |
| `HISTORICAL` | Preserves superseded material | None | Keep lineage; never treat as current authority |
| `EXPERIMENTAL` | Unproven implementation or idea | None | Isolated from canonical authority |

## Non-regression rule

A later conversation, implementation or document cannot become authoritative merely because it is newer. It must enter through one of these classifications and retain explicit lineage.

## Rename/merge rule

A rename preserves the canonical identifier and records aliases. A merge records each source as `supersedes`/`superseded_by` lineage and identifies the canonical destination. Deletion is not a substitute for traceability.

## Duplicate rule

A second implementation of a universal primitive must be classified as adapter, branch, successor, experiment or historical artifact. If it claims to be canonical, CI must reject it until its authority is explicitly established.
