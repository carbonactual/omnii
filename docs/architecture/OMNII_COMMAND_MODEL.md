# OMNII COMMAND MODEL

A command is an authorized request to attempt an action; it is not evidence that the action occurred.

## Envelope
Command identity, type/version, issuer, subject, target, requested action, authority, constraints, correlation, causation, idempotency key, and provenance.

## Flow
`receive → validate → authorize → route → execute → emit outcome event`.

Rejected and expired commands remain observable.