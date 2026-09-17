# OMNII Digital Access Gap Register

This register captures access and transfer failures that ordinary internet interfaces commonly hide.

| Gap | What can go wrong | Required treatment |
|---|---|---|
| Local file ambiguity | user thinks upload means provider can access the whole device | distinguish selected resource, scope, handle and actual transfer |
| Directory overreach | directory capability exposes more than intended | explicit scope, recursive boundaries and revalidation |
| Persistent handle | remembered file/directory access outlives original intent | monitor persistence and revoke/revalidate |
| Origin-private confusion | site stores files locally without the user seeing normal files | expose origin storage separately from user filesystem |
| Upload copy opacity | uploaded data is replicated or transformed invisibly | trace transfer, copies, derivatives and processing |
| Download trust gap | downloaded artifact executes or is used without integrity/rights context | verify origin, integrity, type, version and policy |
| Download residue | deleting a downloaded item leaves application/cache/index copies | track local and residual state where observable |
| OTP interception | code is relayed or entered into the wrong origin | bind authentication evidence to relying party/session/context |
| OTP replay | valid code is reused | single-use and expiry state; record replay attempts |
| OTP purpose confusion | authentication code is used for a different transaction | show intended action and relying party |
| Approval laundering | user approves vague request that later expands | approval must be scope/context bound |
| Permission drift | technical permission survives changed intent | continuous scope and lifecycle reconciliation |
| Extension overreach | browser extension can access pages/data beyond user's understanding | inventory extension authority and background capabilities |
| Clipboard leakage | copied data is consumed by another application/site | treat clipboard access as sensitive capability |
| Device access ambiguity | camera/mic/location/device access remains active | represent permission, active use and revocation separately |
| Access-history gap | provider shows login history but not meaningful data access | reconstruct reads/writes/exports/shares when evidence exists |
| Metadata leakage | filename, EXIF, path, timestamps or embedded metadata reveals information | inspect/classify metadata before transfer |
| Media derivative gap | thumbnail/transcript/preview/embedding survives source change | model derivatives as dependencies/residual state |
| Browser-to-agent gap | agent can act using browser capabilities without clear principal | preserve principal, SEAL, capability and action evidence |
| Offline queued action | upload/payment/edit executes after authority changes | revalidate before commit |
| Cross-origin storage confusion | embedded content gains storage access under browser policy | expose top-level/embedded relationship and permission context |
| Access-vs-ownership confusion | technical access is treated as ownership | keep ownership, authority, access and possession distinct |
| Approval-vs-authentication confusion | login/OTP interpreted as consent for a consequential action | require action-specific approval where policy demands |
| Request-vs-authority confusion | any caller can ask, but request is mistaken for permission | evaluate authority independently |
| Silent local persistence | application retains state after apparent logout | inspect storage, sessions, cache and service-worker state |
| Local deletion illusion | user deletes visible file but application copy remains | expose known residual copies and uncertainty |
| Provider-side access opacity | staff, systems, agents or subprocessors access uploaded data | expose access evidence where provider supplies it |
| Rights/license blindness | downloaded media is treated as unrestricted | retain license/rights/usage context |
| Integrity ambiguity | file changes between source, transfer and local use | hash/version/provenance where feasible |
| Malicious content | upload/download contains executable or harmful content | validate, scan, isolate and record result |
| Resource exhaustion | huge upload/download consumes storage/bandwidth/cost | enforce quotas, limits and explicit high-impact confirmation |
| Partial transfer | interrupted transfer produces ambiguous state | resumable/idempotent transfer and reconciliation |
| Duplicate transfer | retry creates duplicate uploads/payments/actions | idempotency and causal evidence |
| Access after revocation | provider or local component retains usable capability | verify revocation and record residual uncertainty |
| Recovery escalation | recovery path grants broader access than original authority | recovery is governed authority, not a bypass |

## Priority

Prioritize gaps that can materially affect identity, authority, privacy, security, money, data integrity, continuity, liability, or the user's ability to understand and exit.
