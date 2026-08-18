# OMNII DEPENDENCY REGISTRY

Runtime index for explicit dependency edges.

## Operations
`declare → validate → discover → resolve → authorize → bind → monitor → replace/fail`

Dependencies are resolved by type, version, compatibility, strength, lifecycle, authority, and provenance. Required dependency failure is surfaced to the state and execution runtimes.

## Safety
Cycles, dangling targets, incompatible versions, unauthorized bindings, and unavailable required dependencies are detectable states, not hidden runtime errors.