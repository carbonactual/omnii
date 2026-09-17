# OMNII Internet Rights, Consent & Relationship Lifecycle

**Status:** canonical technical coverage contract.

## Purpose

The Internet Recycle Bin must cover not only files and technical objects, but also the rights, permissions, relationships and approvals that make digital objects usable, transferable, shareable, governable or economically actionable.

This contract covers copyright, patents and other rights interests; consent; partnership; ownership claims; transfer/assignment; licenses; approvals; delegated permissions; and related obligations.

It is **not** a universal legal system and does not determine jurisdiction-specific validity. Legal rules, registries and professional review remain domain/jurisdiction adapters and evidence sources.

## Core distinctions

```text
OWNERSHIP != ACCESS
OWNERSHIP != LICENSE
LICENSE != ASSIGNMENT
CONSENT != APPROVAL
APPROVAL != AUTHORITY
AUTHORITY != OWNERSHIP
PARTNERSHIP != OWNERSHIP
TRANSFER != COPY
TRANSFER != PAYMENT
REGISTRATION != CREATION
CLAIM != VERIFIED RIGHT
```

A system must preserve these distinctions rather than collapsing every positive permission into `owner=true` or every transfer into deletion of the former record.

## Universal lifecycle

```text
ASSERTED
  -> IDENTIFIED
  -> VERIFIED / DISPUTED / UNKNOWN
  -> ACTIVE
  -> LICENSED / CONSENTED / APPROVED / DELEGATED
  -> ASSIGNED / TRANSFERRED / PARTNERED / MODIFIED
  -> REVOKED / EXPIRED / TERMINATED / DISPUTED
  -> PRESERVED / ARCHIVED / RECOVERABLE
  -> PURGABLE / PURGED
```

A rights or relationship record may have multiple concurrent scopes. A transfer of one interest does not imply transfer of unrelated interests.

## Covered internet rights and relationship classes

### Copyright and creative rights

Track the relevant work, claimant/rightsholder, applicable jurisdiction, rights scope, license conditions, permitted uses, restrictions, attribution requirements, term, evidence and derivative relationships.

A copy of a work is not the same thing as ownership of the copyright. Rights may be licensed or transferred without destroying the underlying work record. WIPO describes assignment as transfer of ownership and licensing as permission to use while ownership remains with the owner. citeturn546341search6turn546341search7

### Patent and invention rights

Track the patent/application or other subject identifier, owner/interests, assignment or license instrument, scope, territory, term, recording/registration references, obligations and evidence.

Patent ownership can be transferred by assignment and patent rights can be licensed separately from full ownership; exact formalities depend on the governing jurisdiction. citeturn546341search0turn546341search3

### Consent

Consent is a scoped human/entity decision to permit an identified action, use, disclosure, relationship or processing purpose under stated conditions. Record:

`principal → recipient → purpose → scope → conditions → issued_at → expiry → withdrawal/revocation → evidence`

Consent must not be silently widened because a technical credential, account session or prior approval still exists.

### Approval

Approval is a governed decision on a specific request, action, state transition or proposal. Record the request, approver, authority scope, decision, conditions, time, evidence and material changes that may require re-approval.

Approval does not itself create ownership or unrestricted execution authority.

### Partnership and collaboration

A partnership/collaboration relationship records participants, roles, scope, obligations, contribution rights, decision rules, effective period, termination conditions and linked instruments.

A partnership relationship does not automatically transfer ownership of each participant's assets, intellectual property, accounts or data.

### Ownership

Ownership is an interest/claim over a subject, not simply possession of an account, file, credential, URL or copy. Track the claimed interest, basis, evidence, jurisdiction, effective dates, co-owners, encumbrances, disputes and transfer history.

### Transfer / assignment

A transfer changes the holder of a specified interest or responsibility. Record:

`from → to → subject → interest scope → instrument → authority → effective_at → conditions → evidence → resulting state`

Partial transfers must remain representable. The transfer of one right must not silently transfer unrelated rights or dependencies.

### License / delegated use

A license or delegation grants a bounded capability while ownership may remain elsewhere. Track scope, purpose, territory/context, duration, revocation, sublicensing/transfer conditions, obligations and evidence.

## Recycle Bin integration

Rights and relationship state follows the same digital exit principle:

`active object → rights/relationship inventory → disposition → dependency resolution → revoke/expire/transfer/preserve/archive → purge where permitted`

Deleting a file must not silently delete an associated copyright claim. Cancelling a partnership must not silently erase accrued obligations or evidence. Revoking consent must not silently destroy records that must legally or operationally be retained.

When a subject is purged, related rights/consents/approvals/partnerships must be classified as:

- transferred;
- revoked;
- expired;
- terminated;
- preserved;
- archived;
- orphaned;
- disputed;
- or unknown.

## Internet-scale handoff requirement

For any cross-service or cross-provider transfer, preserve:

`principal → subject → right/relationship → authority → intent → scope → conditions → source → destination → instrument → approval/consent → evidence → effective state → residual obligations → next owner/holder`

This supports movement between repositories, clouds, marketplaces, social platforms, media systems, AI systems, registries, banks, domains and physical-world services without inventing a separate semantic model for each provider.

## Non-negotiable invariants

1. Copyright is not the same as the file containing the work.
2. Patent ownership is not the same as a patent license.
3. Consent is scoped and revocable according to its terms.
4. Approval is not blanket authority.
5. Partnership is not automatic co-ownership.
6. Transfer is not deletion of history.
7. A copy is not proof of ownership.
8. A technical credential is not proof of legal title.
9. A registry entry is evidence of a recorded state, not universal proof that a right exists in every jurisdiction.
10. Rights, relationships and approvals have their own lifecycle and evidence trail.
