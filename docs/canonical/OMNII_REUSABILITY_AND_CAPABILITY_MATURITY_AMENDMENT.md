# OMNII Reusability & Capability Maturity Amendment

**Status:** CANONICAL AMENDMENT — 2026-09-16
**Parent:** `docs/superpowers/specs/2026-09-16-ecosystem-wide-common-capability-conformance-design.md`
**Authority:** OMNII canonical architecture

## 1. Purpose

This amendment clarifies the Carbon Actual rule that **everything built in the ecosystem is intended to be reusable**.

A product, domain, or deployment boundary does not make a capability permanently non-reusable. Product-specific placement is a current composition/context decision, not a permanent statement that the capability can never be promoted or reused elsewhere.

## 2. Canonical principle

> **Everything reusable; nothing unnecessarily duplicated.**

More explicitly:

> **Build once → use where valid → strengthen once → expose through a canonical contract → compose everywhere appropriate → promote maturity when proven → preserve domain context without trapping capability inside one product.**

## 3. Reusable by default

Every new implementation should be considered reusable by default.

The builder must therefore ask:

1. Can this be expressed using an existing common capability?
2. Can the new behavior itself be expressed as a reusable capability?
3. Can the implementation be separated from one product's presentation?
4. Can another product consume the same contract later?
5. What parts are genuinely domain configuration rather than capability semantics?
6. What reusable assets, schemas, workflows, adapters, tests or knowledge does this implementation create?

The answer must be recorded in the product/capability manifest.

## 4. Context is not ownership

The following distinctions are mandatory:

```text
where a capability is first used
≠
what the capability is

which product presents it
≠
which product semantically owns it

current domain configuration
≠
permanent non-reusability

provider implementation
≠
capability

product feature
≠
necessarily product-private semantics
```

A capability may originate inside a product and later be promoted into the shared fabric without invalidating the product's history.

## 5. Maturity instead of permanent product-specific classification

Do not use `product-specific` as a final semantic category.

Use maturity/context states such as:

- **local-use:** currently exercised in one product/context;
- **reusable-candidate:** designed so another context can consume it;
- **shared:** registered in the common capability fabric;
- **canonical:** stable reusable semantic contract;
- **deprecated:** retained for migration/provenance but no longer preferred;
- **experimental:** reusable hypothesis under controlled evaluation.

A local-use capability is still designed for extraction/reuse where appropriate.

## 6. Reusability dimensions

Reusability is not only code reuse. It includes:

- semantics;
- data/object models;
- schemas;
- events;
- workflows;
- policies;
- forms;
- UI components where appropriate;
- APIs;
- agent/tool interfaces;
- provider adapters;
- tests;
- conformance checks;
- knowledge packages;
- prompts/instructions where appropriate;
- physical procedures;
- human operating procedures;
- deployment packages;
- integrations;
- observability;
- security controls;
- recovery procedures;
- documentation.

A product may contribute reusable improvements in any of these forms.

## 7. Domain law remains contextual without becoming disposable

A domain-specific capability may depend on law, policy, regulation, institutional procedure or specialized semantics.

That does not make it permanently non-reusable.

Instead:

```text
UNIVERSAL CORE
+
DOMAIN SEMANTICS
+
JURISDICTION / POLICY CONFIGURATION
+
PRODUCT EXPERIENCE
```

The universal part should be extracted and shared; the bounded law/configuration stays attached to the appropriate domain boundary.

## 8. Capability promotion

Promotion is not a binary invention of a new primitive.

A capability can move through maturity as evidence accumulates:

```text
local-use
→ reusable-candidate
→ shared
→ canonical
```

Promotion should preserve:

- original provenance;
- parent capability;
- product history;
- compatibility identifiers;
- domain extensions;
- implementation adapters;
- conformance tests.

## 9. Back-propagation

When a product improves a reusable capability, the improvement should flow back into the common fabric where semantically valid.

```text
PRODUCT USE
→ OBSERVATION
→ IMPROVEMENT
→ GENERALIZATION
→ CONFORMANCE
→ SHARED CAPABILITY
→ OTHER PRODUCTS
```

The product is therefore both a consumer and a potential source of ecosystem capability.

## 10. No capability is trapped by its first surface

A capability first surfaced by SPOTIST may later be used by DESK, OMNI, NGIN, NAIRE, RITES, HAPI World or another product.

A capability first surfaced by DESK may later become useful to OMNI or another participant surface.

A capability first developed for NASC, NOUN Student Bot, BUNK, Logistico, RITES, NGIN or another deployment can be generalized where its semantics permit.

First-use context does not create permanent ownership.

## 11. Product boundaries still matter

Reusability does not mean every product becomes identical.

Products retain:

- domain purpose;
- user experience;
- local composition;
- specialized workflows;
- brand/presentation;
- domain configuration;
- legally required boundaries;
- deployment context;
- commercial packaging.

What is shared is the capability and its contract, not every product's entire experience.

## 12. Reuse test

For every substantial new implementation, evaluate:

```text
Could another product consume this?
Could an institution consume this?
Could a human workflow consume this?
Could an agent consume this?
Could a physical-world operation consume this?
Could a future unknown domain consume this?
```

The answer need not be yes today. The design should avoid unnecessary barriers to future reuse.

## 13. Universal promotion threshold

A capability may be promoted to the common registry when there is sufficient semantic stability and evidence of reusable value.

Multiple-domain use is strong evidence for promotion but is **not a mandatory prerequisite** when the capability is clearly designed as a universal contract from inception.

Likewise, a capability need not remain outside the common layer simply because only one product currently exercises it.

## 14. Conformance implications

Machine-verifiable tooling should distinguish:

- reuse eligibility;
- current maturity;
- canonical ownership;
- parent capability;
- domain extensions;
- provider implementation;
- product exposure;
- deployment configuration.

It must not reject a product merely because a capability is currently local-use, provided the capability is explicitly declared and does not contradict a higher-authority canonical contract.

## 15. Strengthening loop

The ecosystem improvement loop is:

```text
CREATE
→ USE
→ OBSERVE
→ TEST
→ GENERALIZE
→ DOCUMENT
→ REGISTER
→ COMPOSE
→ STRENGTHEN
→ REUSE
```

This is the intended mechanism for Carbon Actual to become stronger as it grows.

## 16. Relationship to existing canonical architecture

This amendment does not create another ontology or registry.

It clarifies the interpretation of:

- Universal Capability Ontology;
- Common Layer;
- Universal Capability Registry;
- Universal Composition Engine;
- Product Blueprint;
- Ecosystem Interaction & Handoff Protocol;
- capability/provider adapter contract;
- product conformance design.

Where another document uses language suggesting that a capability is permanently “product-specific” or permanently non-reusable, this amendment governs that interpretation unless a higher-authority constitutional document explicitly requires otherwise.

## 17. Frozen principle

> **Everything reusable in Carbon Actual should be designed so that valid parts can be strengthened once and reused across the ecosystem. Product boundaries organize experience and responsibility; they do not imprison capability.**
