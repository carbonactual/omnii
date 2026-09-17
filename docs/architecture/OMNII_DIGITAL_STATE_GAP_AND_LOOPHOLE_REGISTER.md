# OMNII Digital State Gap & Loophole Register

## Purpose

Identify ways that ordinary internet state can escape user comprehension, authority, provenance, continuity or exit while still affecting the human.

| Gap / loophole | Failure pattern | Required treatment |
|---|---|---|
| Terms opacity | long or changing terms obscure material effects | version, diff, explain, evidence, effective-date tracking |
| Consent laundering | generic consent reused for unrelated activity | scope-bound consent mapped to purpose and capability |
| Permission drift | granted capability expands or survives beyond intent | monitor scope, duration, dependency and revocation |
| Session orphaning | logout does not visibly invalidate every relevant session | reconstruct sessions and revocation state |
| Recovery escalation | recovery channel gains more authority than original account owner intended | recovery treated as governed authority path |
| Hidden federation | sign-in provider exposes assertions to multiple relying parties | record principal, relying party, assertion and scope |
| Browser residue | state survives logout or account deletion | identify local state classes and expected lifetime |
| Cache persistence | cached content survives app/provider state changes | track cache ownership, freshness and invalidation |
| Tracking indirection | URLs, pixels or scripts correlate activity without obvious cookies | represent storage/access technologies as a broader class |
| Fingerprinting | identity inferred without conventional identifier | distinguish observation, inference and asserted identity |
| Shadow profiling | provider constructs inferred interests/risk/persona | label inferred state and provenance separately from supplied facts |
| Metadata leakage | filenames, EXIF, document metadata, timing or network metadata expose information | inspect and classify metadata before sharing |
| Derivative persistence | thumbnails, OCR, embeddings, transcripts, previews survive source deletion | map derivatives as dependencies and residual state |
| Data copy opacity | downstream recipients receive copies without visible path | maintain sharing/provenance chain where evidence exists |
| Delete illusion | UI says deleted while backups, replicas or caches persist | expose deletion lifecycle and residual uncertainty |
| Export illusion | raw download omits relationships/history/permissions | portability requires semantic continuity |
| Upload transformation | provider modifies content silently | record transformation, tool, timestamp and result |
| AI memory residue | source deletion does not clarify retained summaries or embeddings | represent derived AI state and deletion status |
| Prompt-context injection | external documents alter agent behavior | treat retrieved content as untrusted data until policy validation |
| Agent authority drift | delegation survives changed human intent | continuously reconcile principal, SEAL, capability and scope |
| Notification persistence | push/background subscription survives changed preference | track channel, recipient, authority and expiry |
| Recommendation opacity | ranking/personalization materially affects experience | record explainable signals where available |
| Review laundering | unverified opinion becomes treated as fact | preserve author, evidence, provenance and dispute status |
| Moderation opacity | content/action removed without understandable record | preserve policy version, event, evidence and appeal path |
| API token residue | integration continues after human thinks access was removed | inspect tokens, webhooks, credentials, scopes and expiry |
| Webhook replay | delayed event executes against new state | bind events to state/version/authority and enforce idempotency |
| Offline execution | queued action executes after authority or condition changed | revalidate before commit |
| Concurrency loss | two systems independently mutate one object | record causal order, conflict and resolution |
| Resource-cost opacity | hidden compute, storage, bandwidth or transaction costs accumulate | represent cost and liability before high-impact execution |
| Provider disappearance | dependency disappears and leaves state inaccessible | continuity and portability preserve semantics and evidence |
| Domain dependency blindness | domain, DNS, cert, mail and service relationships are implicit | dependency graph is visible and watchable |
| Accessibility exclusion | important controls are unavailable to some users | accessibility is capability and lifecycle state, not decoration |
| Localization mismatch | currency/time/unit/jurisdiction mismatch creates wrong action | bind action to explicit context |
| Audit incompleteness | only successful actions are recorded | record important successes, failures and exceptional conditions |
| Evidence tampering | logs or history can be altered without visible indication | provenance and integrity protection |
| False certainty | unknown state presented as fact | require confidence/status such as observed, asserted, inferred, disputed or unknown |

## Priority rule

A gap is ecosystem-relevant when it can materially alter identity, authority, data, money, privacy, security, continuity, portability, liability, or the human's ability to understand or exit a digital relationship.

## Cross-layer rule

Every gap is addressed across prevention, observation, explanation, authorization, execution, evidence, recovery and exit using the existing universal body.
