# OMNII Digital State & Transparency Catalog

This catalog extends the Internet Strain Catalog into the hidden and poorly explained state that surrounds ordinary internet use.

| Area | Coverage | Typical hidden failure / gap |
|---|---|---|
| Terms & policy | versions, effective dates, acceptance, changes, conflicts, jurisdiction | user cannot tell which terms governed an action |
| Privacy notices | purposes, categories, retention, sharing, rights | notice exists but practical data flow is opaque |
| Consent | purpose, scope, evidence, withdrawal, expiry | one click interpreted as blanket authority |
| Accounts | creation, linking, lockout, suspension, closure | orphaned or inaccessible accounts |
| Sessions | login, device, token, expiry, logout, revocation | stale or unknown sessions remain active |
| Authenticators | passwords, passkeys, MFA, keys, recovery factors | forgotten authenticators or unsafe recovery |
| Federation | IdP, assertions, relying parties, scope | one identity used across services without visible downstream access |
| Permissions | prompt, grant, deny, expiry, revocation | permission persists or changes without comprehension |
| Browser storage | cookies, localStorage, sessionStorage, IndexedDB | state survives longer than expected |
| Cache | HTTP cache, CacheStorage, service-worker cache | stale or deleted content remains locally |
| Tracking | pixels, tags, scripts, URL decoration, fingerprinting | activity shared or correlated invisibly |
| Privacy signals | GPC, DNT, site preferences | user preference not understood or mapped to downstream policy |
| Bookmarks | saved URL, metadata, target state, portability | saved intent silently decays |
| Search state | history, saved searches, ranking context | search behavior persists or is used for profiling |
| Uploads | transfer, scan, transform, derivative, replication | file is copied or transformed without clear explanation |
| Downloads | origin, integrity, local persistence, execution | downloaded artifact outlives user expectation |
| Media | metadata, thumbnails, codecs, transcoding, rights | derivative copies and rights states become disconnected |
| Telemetry | analytics, diagnostics, crash data, device signals | operational data becomes secondary profiling data |
| Notifications | push tokens, channels, frequency, content | background contact continues after intent changed |
| Advertising | exposure, targeting, attribution, sponsored content | ad interaction and transaction linkage is invisible |
| Profiles | segments, inferred interests, risk/reputation scores | inferred data mistaken for volunteered facts |
| Data sharing | recipient, purpose, legal/technical basis, downstream copy | user cannot see where data travelled |
| Access history | reads, writes, exports, sharing, administrative access | sensitive access cannot be reconstructed |
| Deletion | request, processing, backups, caches, replicas, downstream | delete button gives false finality |
| Portability | export, semantics, relationships, history, permissions | export is only raw data without meaning |
| Credentials | issuance, use, rotation, revocation, recovery | stale credentials survive provider changes |
| Verifiable credentials | issuer, holder, verifier, disclosure, status | excessive attributes disclosed |
| DIDs / identifiers | controller, verification methods, endpoints, rotations | identifier continuity obscured by key or provider changes |
| Recommendations | inputs, ranking signals, personalization | user cannot understand why content appeared |
| Reviews | author, evidence, provenance, moderation, appeal | opinion becomes treated as canonical fact |
| Moderation | action, rule, evidence, appeal, reinstatement | enforcement state is unexplained or irreversible |
| AI context | prompts, retrieved documents, tools, memory, outputs | external content changes agent behavior |
| Agent authority | principal, delegation, capability, scope, expiry | delegated agency outlives intended purpose |
| AI memory | retained context, embeddings, summaries, derived profile | deletion of source does not clearly remove derivative state |
| API state | tokens, quotas, schemas, webhooks, retries | technical integration continues after human intent changes |
| Domain state | registration, renewal, DNS, DNSSEC, certificates | service breaks because dependent state was invisible |
| Device state | installed apps, permissions, keys, local databases | provider believes device state that no longer matches reality |
| Extensions | permissions, access to data, background capability | browser extensions become hidden privileged actors |
| Offline state | local edits, queued actions, cached data | delayed actions execute after authority or state changed |
| Synchronization | conflict, merge, replay, idempotency | duplicate or stale actions create divergent truth |
| Recovery | factors, delegates, emergency access, succession | recovery path becomes an authority escalation path |
| Exit | cancellation, revoke, export, closure, residual state | user exits an account but digital dependencies remain |

## Classification rule

Each row is represented using existing canonical dimensions. The catalog is descriptive coverage, not a new ontology.

## Required user-facing principle

Desk SHOULD make important hidden state inspectable, explainable, attributable and actionable without implying that the user's display is itself the canonical source of truth.
