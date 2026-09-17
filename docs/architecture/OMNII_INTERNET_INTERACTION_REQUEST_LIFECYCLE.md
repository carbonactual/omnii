# OMNII Internet Interaction & Request Lifecycle

**Status:** canonical technical coverage contract.

## Purpose

The Internet represents far more than content and transactions. People and entities continuously send requests, questions, reports, suggestions, complaints, contacts, appeals, escalations, feedback and other consequential interactions into websites, apps, platforms, governments, businesses, agents and automated systems.

OMNII treats these as governed interactions with identity, intent, authority, target, state, routing, evidence and outcome rather than as disposable messages.

## Covered interaction classes

- enquiry / question;
- contact / reach-out;
- request / application;
- report / incident report;
- suggestion / idea;
- feedback / rating / review;
- complaint / grievance;
- dispute / challenge;
- appeal / reconsideration;
- escalation / urgent escalation;
- support / assistance request;
- notification / alert acknowledgement;
- consent request / approval request;
- service request / booking / appointment request;
- information or access request;
- correction / amendment request;
- deletion / revocation request;
- portability / transfer request;
- recovery / account-recovery request;
- safety / abuse / security report;
- legal or policy notice;
- procurement / quotation / offer request;
- expression of interest / partnership request;
- cancellation / termination request.

## Universal lifecycle

```text
DRAFT
→ SUBMITTED
→ RECEIVED
→ IDENTIFIED
→ CLASSIFIED
→ ROUTED
→ ACKNOWLEDGED
→ TRIAGED
→ ASSIGNED
→ IN_PROGRESS
→ WAITING / BLOCKED / ESCALATED
→ RESPONDED
→ RESOLVED / PARTIALLY_RESOLVED / REJECTED / WITHDRAWN
→ APPEALED / REOPENED
→ CLOSED
→ RETAINED / ARCHIVED / RECOVERABLE / PURGED
```

`unknown` remains valid when the system cannot establish reliable state or routing.

## Universal interaction record

A material interaction should preserve:

`actor → principal → identity → authority → intent → interaction_class → target → context → policy → request → attachments/evidence → routing → acknowledgement → owner → SLA → actions → decisions → response → outcome → residual obligations → evidence → lifecycle`

## Reporting

A report is an assertion or notification that an event, condition, incident, defect, abuse, fraud, safety issue, policy violation or other circumstance requires attention.

A report is not automatically proven merely because it was submitted. Preserve:

- reporter identity where available;
- subject/target;
- claimed condition;
- evidence;
- time/context;
- classification;
- triage result;
- investigation outcome;
- resulting action;
- appeal/dispute state.

## Suggestions and feedback

Suggestions and feedback are distinct from commands. They may inform improvement without automatically changing policy, authority, product behavior or canonical truth.

Ratings/reviews should preserve subject, reviewer/principal, basis, context, time, moderation state, edits and provenance.

## Contact and enquiry

Contact/enquiry interactions preserve the initiating principal, target recipient, purpose, channel, request content, acknowledgement, response and unresolved obligations. A message arriving at a mailbox or endpoint is evidence of receipt, not necessarily proof of identity, authority or acceptance.

## Complaints, disputes and appeals

These require explicit state and escalation paths rather than being flattened into ordinary support tickets.

A dispute must preserve the challenged subject, parties, claim/position, evidence, prior decision, current status, deadlines and resolution authority.

An appeal must preserve the original decision, grounds, appellant, reviewing authority, new evidence, decision and resulting state.

## Escalation

Escalation is a routing/state transition, not a new authority source.

```text
normal handling
→ threshold breached / risk detected / requester escalates
→ escalation target
→ higher scrutiny / authority / urgency
→ decision / intervention
→ return to workflow or governed terminal state
```

Escalation triggers may include safety risk, security impact, financial exposure, SLA breach, repeated failure, high-value consequence, legal/policy requirement or explicit human request.

## Human mediation

Consequential interactions must preserve human mediation where required by policy, authority or applicable law. AI/agents may classify, summarize, route, draft or recommend under delegated authority; they do not silently convert an enquiry, complaint, suggestion or report into an authorized consequential action.

## Internet Recycle Bin integration

Interactions themselves can enter lifecycle disposition:

`active case → resolved/closed → retained/archive → recoverable → purgable → purged`

But linked evidence, rights, obligations, financial records, decisions, reports, audit material and legal/policy records may have independent retention or preservation requirements.

Deleting a submitted complaint does not necessarily erase the decision or evidence created from it. Deleting a contact message does not necessarily terminate an active obligation. Purging an enquiry must not silently remove a still-open case relationship.

## Cross-provider portability

When an interaction moves between email, forms, CRM, helpdesk, social platform, government service, AI agent, API or another provider, preserve the semantic interaction identity, provenance, principal, state and obligations even when the provider's ticket/message identifier changes.

## Non-negotiable invariants

1. Receipt is not resolution.
2. Submission is not approval.
3. Report is not proof.
4. Suggestion is not instruction.
5. Enquiry is not authorization.
6. Complaint is not automatic fault finding.
7. Escalation is not authority creation.
8. AI routing is not human decision substitution where human mediation is required.
9. Provider ticket/message IDs are not the canonical interaction identity.
10. Closed does not mean evidence or obligations may be silently destroyed.
