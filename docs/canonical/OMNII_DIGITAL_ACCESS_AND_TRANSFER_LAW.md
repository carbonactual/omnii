# OMNII Digital Access & Transfer Law

## Status

Canonical architectural law.

## Purpose

Digital access is not equivalent to possession, visibility, download, upload, authentication, or ownership. A web page, browser, application, agent, extension, provider, or device MUST NOT be assumed to have authority over a person's local or remote resources merely because a technical mechanism can reach them.

## Universal access contract

Any access request SHOULD be represented through the existing universal dimensions:

`principal → identity → authority → intent → requested capability → target → scope → context → policy → user mediation → approval → execution → result → evidence → liability → continuity → exit`

The system MUST distinguish:

- requested access from granted access;
- granted access from active access;
- read from write;
- one-time access from persistent access;
- file access from directory access;
- local access from provider-side access;
- metadata access from content access;
- access to a copy from access to the source;
- authentication from authorization;
- authorization from approval for a particular high-impact action.

## Local resources

Browser and application capabilities that can expose local files, directories, storage, device state, clipboard, camera, microphone, location, notifications, downloads, bookmarks, credentials, or other user resources MUST be treated as governed capabilities.

Where a browser requires an explicit picker or permission, the user's selection and resulting handle/permission state SHOULD become evidence. Persistent handles, remembered permissions, extensions, native bridges, background workers, and delegated agents MUST NOT be silently treated as equivalent to a fresh user decision.

Origin-private storage and other application-controlled storage MUST be distinguished from user-visible local files. A user-facing view SHOULD explain the difference between:

`my visible file → selected file access → application copy → browser-origin storage → cache/derivative → provider copy`

## Request / authorization / approval

A request is an assertion of desired capability. Authorization establishes whether the principal may perform the capability under policy. Approval is a human or governed decision when policy requires explicit confirmation.

A request MUST NOT be treated as approval.

An approval MUST identify, where available:

`who → what → target → why → scope → duration → conditions → consequence`

Approval SHOULD expire or be revalidated when the target, scope, authority, risk, material terms, or consequential outcome changes.

## Uploads

An upload is a transfer boundary, not merely a UI event.

Required conceptual lifecycle:

`request → select → authorize → approve if required → transfer → verify → scan → classify → transform → store → replicate → share → process → derive → retain → export → revoke/delete → reconcile residual state`

The ecosystem SHOULD expose provider-side transformations, derivatives, copies, metadata extraction, indexing, previews, OCR, transcription, embeddings, moderation, virus scanning, backups, and downstream sharing when observable.

## Downloads

A download is an acquisition boundary.

The body SHOULD preserve:

`source → requester → authority → URL/origin → artifact identity → integrity → version → license/rights → download event → local destination → execution/use → updates → deletion/retention`

A downloaded file MUST NOT automatically be assumed trustworthy, current, licensed, safe, or authorized for execution.

## OTPs and authentication codes

One-time passwords, recovery codes, magic links, verification codes, approval codes, push approvals, and similar authenticators are sensitive authentication state.

They MUST be treated as credentials/authenticator outputs rather than ordinary messages. The ecosystem SHOULD record purpose, relying party, issuance, expiry, use/replay status, delivery channel, and revocation where available, while never unnecessarily retaining secret values.

An OTP supplied to a user does not itself prove that the surrounding request is legitimate. The relying party, origin, session, transaction context, intended action, and authority MUST remain part of the security decision.

## Access history

Where evidence exists, the ecosystem SHOULD reconstruct:

`requested → granted/denied → activated → accessed → changed → shared → revoked → expired`

This applies to local files, cloud files, accounts, sessions, credentials, APIs, browser permissions, extensions, devices, media, and agent/tool access.

## Security boundary

External content, files, URLs, downloaded artifacts, browser records, uploads, API responses, webhooks, advertisements, extensions, retrieved documents, and agent outputs are untrusted inputs until validated under the existing security law.

## No competing primitive

This law does not create an Access Object, Upload Object, Download Object, OTP Object, or Approval Object. These are interaction manifestations represented through the existing canonical dimensions and event/evidence contracts.
