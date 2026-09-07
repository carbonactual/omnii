# Integration-First Universal Interoperability Fabric

## Status

Approved architectural design.

## Goal

Make integration a constitutional capability of OMNII so independently governed identities, names, agents, capabilities, services, protocols, data sources, devices, products, and future technologies can interoperate through provider-neutral, replaceable adapters without allowing external systems to redefine OMNII semantics or authority.

## Core Principle

Integration is not a feature layered on top of the ecosystem. Integration is part of the ecosystem's universal operating fabric.

The ecosystem must be able to discover, resolve, verify, authorize, connect, execute, observe, prove, measure, substitute, revoke, and recover integrations while preserving constitutional boundaries.

## Constitutional Boundaries

OMNII owns universal integration contracts, identity relationships, resolution contracts, capability/composition contracts, authority boundaries, Proof/Pulse/Value semantics, lifecycle routing, security invariants, and integration provenance.

External systems remain independently governed. An external identity, name, protocol, provider, agent, API, SDK, CLI, registry, model, or service must never become authoritative merely because OMNII can resolve or connect to it.

`#` remains the identity bridge between HAPI and AI. `#` is not authority.

SEAL remains human authority: explicit, scoped, revocable, attributable, and auditable. Resolution and identity verification never silently grant SEAL authority.

## Universal Integration Model

An Integration is a governed relationship among independently defined entities, names, capabilities, protocols, services, datasets, agents, products, or external systems.

An Integration record must be able to represent:

- source and target;
- identity references;
- names and resolution methods;
- relationship type;
- protocol and transport;
- capabilities and constraints;
- authority requirements;
- credentials and workload identity references;
- data boundaries;
- jurisdiction;
- trust state;
- provenance and Proof;
- license and usage constraints;
- version and compatibility;
- health and availability;
- value, cost, risk, latency, and resource requirements;
- fallback and substitution options;
- revocation and quarantine state;
- Pulse and outcome history.

## Identity, Naming, and Resolution Mesh

DID, ENS, HNS, DNS, URI/URL, and other identity/name systems are complementary layers rather than interchangeable concepts.

### DID

DID is the decentralized identity/control layer. OMNII must support multiple DID methods through replaceable method adapters and resolution drivers rather than hard-coding one method.

`DID -> resolution -> DID Document/resources -> verification relationships`

DID control does not imply ecosystem authority.

### ENS

ENS is supported as a decentralized naming and resource-resolution adapter. Its resolver model, reverse resolution, text records, content hashes, multichain addresses, wildcard resolution, and DNS integration should be available through the integration fabric where compatible.

ENS resolution may resolve an external name or resource, but OMNII still performs independent verification, correlation, authority, and trust evaluation.

### HNS

Handshake/HNS is supported as a decentralized Internet naming/root-resolution adapter. Its DNS-compatible resolver architecture and proof-oriented light-client model are useful for decentralized name resolution and alternative root infrastructure.

HNS resolution is not treated as universal proof of identity or authority.

### DNS

DNS remains a first-class compatibility rail. DNSSEC-aware resolution, ordinary DNS resolution, reverse records, and DNS-to-other-name-system relationships may participate in the mesh.

### Resolution rule

`DISCOVER -> RESOLVE -> VERIFY -> CORRELATE -> PROVE -> AUTHORIZE -> INTEGRATE`

Never:

`RESOLVE -> TRUST`

## Capability and Protocol Fabric

A capability is constitutional and provider-neutral. Its implementations are replaceable.

The same capability may be exposed through:

- MCP for structured tool/data integration;
- A2A for agent-to-agent delegation;
- API for direct service calls;
- SDK for embedded/high-performance use;
- CLI for deterministic execution;
- WEB/browser interfaces for external-world interaction;
- local process/device interfaces for private or edge execution.

Protocol selection is runtime routing, not constitutional identity.

Default preference:

`FAST/DETERMINISTIC -> CLI`

`STRUCTURED TOOL/DATA -> MCP`

`AGENT DELEGATION -> A2A`

`DIRECT SERVICE -> API`

`EMBEDDED/PERFORMANCE -> SDK`

`BROWSER/EXTERNAL WORLD -> WEB`

`PRIVATE/EDGE -> LOCAL`

The router may choose another compatible path when privacy, authority, availability, value, risk, latency, cost, or capability quality requires it.

## Integration Registry

The integration fabric introduces a federated registry model containing:

- Identity Registry;
- Name Registry;
- Capability Registry;
- Protocol Registry;
- Provider Registry;
- Agent Registry;
- Service Registry;
- Adapter Registry;
- Resolver Registry;
- Credential Registry;
- Trust Registry;
- Proof Registry;
- License Registry;
- Version Registry;
- Health Registry;
- Value Registry;
- Integration Registry.

These are logically composable and may be physically distributed. No requirement exists for one monolithic database.

## Capability Trust Exchange

External capabilities enter through:

`DISCOVER -> IMPORT -> QUARANTINE -> LICENSE CHECK -> SECURITY SCAN -> DEPENDENCY/SBOM CHECK -> SIGNATURE/PROVENANCE CHECK -> SANDBOX TEST -> CAPABILITY TEST -> PULSE TEST -> POLICY/SEAL APPROVAL WHEN REQUIRED -> ADMITTED -> AVAILABLE`

Admission does not make a capability permanently trusted. Trust is continuously evaluated through health, Proof, Pulse, security findings, policy changes, version changes, and observed outcomes.

## Identity Correlation

One real-world or ecosystem entity may have multiple external identifiers. OMNII must never equate them solely by string similarity.

Correlation must be evidence-based:

`candidate -> resolution -> evidence -> relationship -> confidence -> Proof -> optional authoritative linkage`

Identity collision, impersonation, stale records, conflicting names, and revoked identifiers must remain representable states.

## ABBA Integration Role

ABBA remains the intelligence, discovery, routing, planning, capability-selection, and execution coordinator.

ABBA must not become the constitutional authority over identities, names, integrations, or human approval. It operates within OMNII contracts and routes through available capabilities.

No model provider is the permanent brain. Model access remains a replaceable intelligence rail with local and remote implementations.

## Terminal, Tokenization, Pulse, and Value

Integration activity is part of the existing economic/accountability fabric.

Meaningful integration attempts can produce outcomes and feedback including success, partial success, timeout, DNS failure, authentication failure, incompatibility, degraded performance, security rejection, and unexpected results.

The lifecycle remains:

`VALUE SENT -> FEEDBACK/PULSE -> MINT -> TERMINAL`

and only after curation/eligibility/recognition and explicit tokenization:

`TERMINAL -> CURATION -> TOKENIZATION -> INDEX`

Therefore:

`MINT != TOKENIZE`

`MINT -> TERMINAL`

`TOKENIZE -> INDEX`

A failed integration attempt may be economically accountable and minted while legitimately stopping at Terminal. Failure never becomes Index value merely because it was minted.

## Security

The integration fabric must support policy and authorization through provider-neutral mechanisms. OPA/Cedar-style policy adapters, workload identity such as SPIFFE-compatible identity, OpenBao-compatible secret management, Sigstore/Cosign-compatible signing, and in-toto-compatible supply-chain provenance may be integrated as replaceable implementations.

PHOENIX remains defensive containment and recovery only: revoke, disable, block, quarantine, preserve Proof, notify authorized humans, and recover. It must not attack external systems.

## Web and External World Integration

The fabric must accommodate search, fetch, crawl, browser automation, document parsing, PDF/table/image/audio/video extraction, structured extraction, monitoring, and change detection through replaceable adapters.

External access restrictions, authentication boundaries, DRM, paywalls, privacy, robots/access policies, terms, and jurisdiction remain enforced. Integration cannot be used to bypass them.

## Durability and Eventing

Integration execution must be compatible with stateless operation while supporting durable workflows where required.

Event streams, durable workflow engines, retries, idempotency, resumability, timeouts, cancellation, and compensation are implementation capabilities rather than constitutional dependencies.

The system should support NATS/JetStream-style eventing and Temporal-compatible durable execution as replaceable open-source adapters where useful.

## Memory and Observability

Integration history is observable through Proof, Pulse, Value, and operational telemetry.

OpenTelemetry-compatible tracing and open evaluation/observability systems may be integrated as replaceable adapters. Postgres/pgvector-compatible retrieval may support semantic memory without creating a new constitutional memory primitive.

## Experience and Natural Habitat

Integration must also appear in the ecosystem experience as a living relationship graph rather than a generic settings page.

The existing natural-habitat, geography, place, people, infrastructure, resource, activity, and value context remains first-class where relevant. Meaningful motion should communicate connection, resolution, routing, Pulse, Terminal intake, recognition, failure, recovery, and changing state.

Motion, transitions, spatial visualization, maps, accessibility, reduced-motion behavior, responsive design, performance, and world-class institutional design remain constitutional experience requirements. Audubon-inspired natural-history language remains a reference language and does not grant rights to proprietary assets or branding.

## Whitelabel and Integration Portability

Whitelabeling must separate:

- constitution;
- logic;
- capabilities;
- data;
- brand;
- UI;
- motion;
- language;
- jurisdiction;
- policy.

An integration should be portable between products and institutions without rebuilding the underlying capability.

## Failure and Recovery

Every integration route must define:

- timeout;
- retry policy;
- idempotency;
- cancellation;
- authentication failure;
- authorization failure;
- protocol mismatch;
- schema mismatch;
- unavailable provider;
- stale identity/name resolution;
- revoked credential;
- security rejection;
- partial completion;
- compensation/recovery;
- evidence capture;
- Pulse generation;
- Terminal routing.

Failure is an accountable state, not an invisible exception.

## Free/Open Core Constraint

The constitutional core must use free/open-source software, open standards, self-hostable infrastructure, or free public infrastructure wherever practical. Hosted/commercial providers may be implemented only as optional replaceable adapters and must not become constitutional dependencies.

## Compatibility and Future Safety

New protocols, naming systems, DID methods, agent standards, models, devices, registries, and future technologies must enter through adapters and registries rather than requiring constitutional rewrites.

Future, speculative, simulated, or unknown technologies remain separated by the existing horizon model:

`OLD | NOW | FUTURE | EMERGING | UNKNOWN_ALIEN`

External claims are never promoted into Actual merely because they are discoverable or machine-generated.

## Acceptance Criteria

1. Integration is represented as a first-class universal contract.
2. DID, ENS, HNS, DNS, URI/URL and future naming/identity systems can be represented without conflation.
3. Resolution is separated from verification, Proof, and authority.
4. MCP, A2A, API, SDK, CLI, WEB and LOCAL paths are replaceable protocol adapters.
5. Capabilities are provider-neutral and routable.
6. External capabilities pass through quarantine, provenance, security, policy, and capability testing before admission.
7. Identity correlation is evidence-based and supports conflicts/revocation.
8. Integration outcomes feed existing Value/Pulse/Proof and MINT->TERMINAL lifecycle semantics.
9. Tokenization remains explicit and is the only path into Index.
10. Integration failures remain accountable and can stop at Terminal.
11. Security containment remains defensive.
12. Experience and natural-habitat design contracts remain intact.
13. The architecture remains stateless by default while permitting durable execution where necessary.
14. Commercial providers remain replaceable adapters and do not become constitutional dependencies.
15. Existing OMNII product boundaries and BUNK extraction boundaries remain intact.
