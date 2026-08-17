# Carbon Actual Providence + Provenance Contract

**Status:** Canonical kernel contract

Carbon Actual explicitly distinguishes **Providence** from **Provenance**.

## Providence

Providence describes the originating, providing, provisioning, stewardship and contextual source of a resource, capability, opportunity, relationship or value.

It asks:

> From what source, provision, stewardship context or enabling circumstance does this exist or become available?

Providence may include:

- origin
- provider
- provisioning context
- stewardship
- source of support
- enabling resources
- originating institution/environment
- continuity context
- conditions of provision

Providence is not automatically ownership.

## Provenance

Provenance describes the evidence lineage and transformation history of an object, assertion, event, credential, resource or value claim.

It asks:

> What evidence shows where this came from, who/what changed it, and how did it reach its present state?

Provenance may include:

- creator/issuer
- source record
- transformation history
- custody
- timestamps
- signatures/attestations
- imported-from references
- model/tool generation
- evidence chain

## Why both exist

Two things may share provenance but have different providence.

Two things may share providence but have different provenance.

Example:

A person receives a credential from an institution.

- **Provenance:** evidence of who issued the credential, the assessment, records and transformations.
- **Providence:** the institution/program/resources/context through which the educational opportunity was provided and sustained.

## Canonical relationship

```text
                    OBJECT / EVENT / VALUE
                         /         \
                        /           \
               PROVIDENCE          PROVENANCE
                  |                    |
       provision + stewardship     evidence + lineage
                  \                    /
                   \                  /
                    TRUST / CONTEXT / VALUE
```

## Registry requirement

Providence and Provenance must be independently addressable. A future implementation may physically co-locate them, but the semantic distinction must remain explicit.

## Privacy

Neither concept authorizes unrestricted disclosure. Providence and Provenance records must follow data minimization, selective disclosure, consent and applicable legal requirements.

## Value integration

Value analysis may use both:

`Providence → what enabled/provided the capability or resource`

`Provenance → what evidence establishes the contribution or state`

This helps prevent the ecosystem from confusing **source of provision** with **proof of occurrence**.

## Unknowns

If Providence or Provenance cannot be established, the record remains explicitly unknown or partially established. The system must not manufacture certainty.
