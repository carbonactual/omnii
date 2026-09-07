# Ecosystem Experience & Natural Habitat Design Doctrine v1

Status: Draft Canonical design contract on the ecosystem boundary branch.

## 1. Purpose

Carbon Actual is a living ecosystem, not a collection of basic screens. Its experience layer must communicate relationships among nature, habitat, place, people, activity, infrastructure, resources, movement, value, and continuity.

The design system is therefore an operating layer for meaning, orientation, state, and interaction—not decoration added after engineering.

## 2. Natural habitat ↔ place ↔ ecosystem

The ecosystem recognizes natural habitat and place as first-class context.

```text
NATURE / HABITAT
        ↕
      PLACE
        ↕
     ACTIVITY
        ↕
      PEOPLE
        ↕
      VALUE
        ↕
    ECOSYSTEM
```

A place may contain natural systems, organisms, human communities, built infrastructure, cultural activity, economic activity, transport, resources, events, and environmental conditions. Products should preserve these relationships rather than flattening them into isolated records.

## 3. Audubon relationship

The Audubon-inspired design language establishes a visual and conceptual relationship between living species, habitats, geography, observation, stewardship, and human participation.

Audubon is a design reference and ecological storytelling layer. It does not imply ownership of Audubon Society intellectual property, logos, proprietary assets, or brand identity.

Where appropriate, ecosystem products may use original bird, habitat, landscape, field-guide, cartographic, and natural-history visual language while respecting applicable rights.

## 4. Living-system interaction

Products must behave like systems that are alive and continuously changing where the underlying state actually changes.

Preferred interaction qualities include:

- spatial continuity;
- meaningful motion;
- state-aware transitions;
- progressive disclosure;
- responsive feedback;
- contextual visualization;
- layered depth;
- intelligent micro-interactions;
- adaptive navigation;
- rich information hierarchy;
- graceful loading, empty, failure, recovery, and offline states;
- accessibility and reduced-motion accommodations.

The system must never use animation merely to decorate a screen or obscure a slow operation.

## 5. Motion doctrine

Motion should explain meaning.

Examples:

```text
VALUE MOVES       → motion communicates transfer
PULSE PROPAGATES   → motion communicates feedback
TERMINAL INTAKE    → motion communicates arrival/sorting
INDEX PROMOTION    → motion communicates recognition/tokenization
BECOMING           → motion communicates continuous formation
ASH                → motion communicates residual/contained state
MAP / HABITAT      → motion communicates spatial context and change
```

Motion may use Framer Motion or equivalent open-standard/free implementation paths when technically appropriate. A product must retain a functional experience without relying on animation libraries.

## 6. Experience quality floor

The ecosystem does not target basic, generic, template-like, or CRUD-first experiences as its design standard.

The minimum design ambition is:

**world-class institutional infrastructure + living-system interaction + rigorous information architecture + accessibility + performance + responsive behavior + visual coherence.**

A simple interface may be correct when the task itself is simple, but it must not be generic, careless, visually dead, or disconnected from ecosystem context.

## 7. State expression

Experience layers should expose meaningful ecosystem state without fabricating activity.

Valid state representations include:

```text
loading
ready
active
changing
awaiting-human-authority
blocked
failed
recovering
settled
contained
archived
becoming
```

Interfaces must not simulate real activity when no underlying activity exists.

## 8. Universal ecosystem relationship

Design should preserve the distinction among constitutional layers:

```text
OMNII   → constitutional meaning and universal contracts
ABBA    → intelligence, capability, orchestration, direction
HAPI    → human participation and authority relationship
IO      → movement / interaction
PULSE   → feedback
TERMINAL→ minted-object intake / holding / sorting
TOKENIZE→ recognition of eligible value
INDEX   → tokenized recognized-value layer
ROOT    → HAPI-specific depth and lineage
ACTUAL  → qualified visible/current representation
BECOMING→ continuous formation and curation
ASH     → retained residual / unsafe / unresolved state
```

Visual design may differ by product, but these meanings must remain stable.

## 9. Spatial and environmental design

Where location, territory, movement, ecology, property, transport, agriculture, events, infrastructure, or environmental impact matter, products should prefer spatial representations over unnecessary lists.

Maps, field views, habitat views, timelines, flows, networks, relationships, and layered canvases should be used when they improve understanding.

Natural context must not be reduced to decoration. It should influence what information is shown, how it is grouped, and how change is understood.

## 10. Accessibility

High-fidelity design does not override accessibility.

Every motion-rich experience must support reduced-motion preferences. Color, animation, sound, or spatial depth must not be the sole carrier of meaning. Keyboard navigation, readable typography, semantic structure, touch usability, contrast, captions/transcripts where applicable, and understandable error/recovery states remain required.

## 11. Performance

Experience quality includes runtime performance.

Prefer progressive loading, asset optimization, lazy loading, efficient rendering, incremental data retrieval, resilient network handling, and graceful degradation.

Visual richness must not become an excuse for excessive payloads or unnecessary computation.

## 12. Product inheritance

Every product and domain implementation inherits this doctrine unless a more specific, equally strong design contract is approved.

Products may establish their own visual identity, but they must preserve:

- natural/place context where relevant;
- ecosystem semantic distinctions;
- meaningful motion;
- accessibility;
- performance;
- truthful state expression;
- non-generic design quality;
- free/open or replaceable core implementation paths.

## 13. Design law

> **Build the ecosystem as a living, intelligible environment—not as a pile of screens.**

> **Use motion to express state, space to express relationships, natural context to express place, and visual hierarchy to express value and meaning.**
