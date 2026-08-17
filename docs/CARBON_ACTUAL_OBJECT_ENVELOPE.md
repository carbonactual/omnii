# Carbon Actual Universal Object Envelope

**Status:** Canonical kernel contract

Every Carbon Actual object is addressable through one universal envelope. Domain-specific schemas extend the envelope; they do not replace it.

## Required envelope

```yaml
id: globally-stable identifier
type: canonical object type
version: schema version
status: lifecycle status
created_at: timestamp
updated_at: timestamp
provenance:
  source: source reference
  class: source-derived | attested | measured | inferred | model-generated | user-declared | imported | unknown
  evidence: evidence references
  confidence: optional confidence value
authority:
  subject: authority reference
  scope: authority scope
  delegation: optional delegation reference
permissions:
  read: policy reference
  write: policy reference
  execute: policy reference
relationships: []
extensions: {}
```

## Identifier rule

Identifiers must be stable enough to survive provider migration and product evolution. Provider-specific IDs may be retained as aliases but must not become the universal identity.

## Type rule

`type` identifies the canonical contract. Implementations may add subtype information through extensions.

## Version rule

Schema version and object lifecycle version are distinct. Migration must preserve provenance and relationships.

## Unknown-field rule

Consumers must preserve unknown extensions where technically possible. A newer object must not be destroyed merely because an older consumer cannot interpret every field.

## Lifecycle

Universal lifecycle states:

`draft → proposed → verified → active → suspended → deprecated → archived`

Objects may define additional states, but those states must map to the universal lifecycle semantics.

## Relationship rule

Relationships are typed references. A relationship must identify its subject, predicate, object, provenance and lifecycle where relevant.

## Authority rule

Identity does not imply authority. Operations requiring authority must resolve an applicable SEAL, delegation, policy or other authorized mechanism.

## Provenance rule

Material claims must retain source lineage. Model-generated or inferred information must never silently appear as measured or source-derived fact.

## Extension rule

New domains extend the object envelope rather than modifying constitutional invariants. This is the mechanism that allows Carbon Actual to accommodate future entity classes and capabilities.

## Deletion rule

Deletion is a governed lifecycle operation. Where legal or policy requirements permit deletion, the system should retain the minimum lawful audit/provenance record necessary to preserve integrity without retaining unnecessary personal data.

## Portability

An object should be exportable with its identity, type, version, provenance, relationships and relevant permissions so it can migrate between implementations without losing its meaning.
