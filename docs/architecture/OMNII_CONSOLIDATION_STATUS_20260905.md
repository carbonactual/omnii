# OMNII Consolidation Status — 2026-09-05

## Completed in this pass

- Re-swept the connected Carbon Actual GitHub repository estate and refreshed the source/repository classification.
- Added a canonical estate manifest covering first-party products, experimental surfaces, agent systems, workflow systems, and provider/framework repositories.
- Added a concrete source-artifact harvest ledger identifying product-specific code/functions/data/design artifacts and target placement.
- Preserved concrete source data snapshots from NASC and the Carbon Actual product-family registry with source revision and non-canonical provenance.
- Added HAPI World as a formal common denominator above OMNII’s constitutional substrate and below specialized product contexts.
- Added HAPI World participation schema and runtime package.
- Added reusable OMNII common capability runtime for identity, relationship, intent/capability, discovery, matching, context/availability, authority/authorization, evidence, value/PULSE and workflow/execution primitives.
- Added source artifact lineage/disposition runtime.
- Added evidence-based product adapter runtime.
- Added governed agent planning/evaluation/lifecycle runtime.
- Added a reconciliation decision record for duplicate/contradictory semantics.

## Source findings that materially changed the consolidation

### HAPI World
An older `CONSTITUTION.md` explicitly marks itself superseded by `CANON.md` and describes a different 13-layer structure. That older document is therefore reference material, not governing architecture. Its useful concepts—persistent AI world, memory/governance/security/synchronization anchors and human↔AI crossings—are retained only where compatible with current OMNII semantics.

### Product registry duplication
Product metadata exists in Carbon Actual, ABBA, OMNI and OMNII registries. OMNII is now the canonical product estate; other registries are source inputs/projections with lineage.

### Memory duplication
Continuum memory, HAPI World memory anchors, OMNI memory and SPARE ownership memory are the same capability family with different contexts. They are consolidated into one governed memory/knowledge capability rather than separate constitutional stores.

### Agent duplication
ABBA, RITES, Eve, Caveman, agent-skills and framework repos repeat planning, coordination, lifecycle, memory and execution concerns. These now converge under provider-independent governed agent contracts.

### Workflow duplication
NASC, ABBA automation, workflow and execution-rail systems repeat form intake, state transitions, task assignment, workers, automation and evidence. These are targeted for one common workflow fabric.

### Economic duplication
ABBA MAS defines extensive token/value formulas and state machines while OMNII already carries economic persistence/runtime. The stronger compatible economics are being consolidated without allowing tokenization to masquerade as ownership/authority/settlement.

## Remaining work

The repository-level semantic consolidation is substantially established, but the full code-level migration of every product-specific implementation is not yet complete. Remaining work is grouped in the implementation plan:

`docs/superpowers/plans/2026-09-05-repository-estate-consolidation.md`

The largest remaining block is wiring each built product's live implementation to these common packages and canonical Supabase/runtime paths, followed by automated estate-wide contradiction scanning and final CI verification.

## Verification truth

Pure runtime packages added in this pass have been exercised with local Node test harnesses. The full OMNII repository test suite has not been run in this environment because direct GitHub cloning is blocked by network/DNS restrictions; GitHub repository reads/writes remain available through the connected repository integration.
