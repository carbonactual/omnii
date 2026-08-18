# OMNII CAPABILITY REGISTRY

Runtime registry of executable capabilities available to authorized subjects.

## Capability Record
Identity, capability type, provider, interface, input/output contract, version, resource requirements, authority requirements, lifecycle, provenance, and policy constraints.

## Resolution
Capability discovery answers what exists and is compatible. Authorization separately determines what a subject may invoke.

## Lifecycle
`candidate → verified → available → restricted → suspended → retired`

## Invariant
Capability never implies authority. Provider availability never implies safety or permission.