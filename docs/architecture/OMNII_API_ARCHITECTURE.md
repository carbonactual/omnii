# OMNII API ARCHITECTURE

The API exposes Phase 9 runtime and Phase 10 governance contracts without becoming a second constitution.

## Contract
`identity → authenticate → authorize → resolve → validate → execute/query → event → audit`

APIs are versioned, typed, idempotency-aware where required, observable, policy-enforced, and provenance-preserving. Transport choices remain replaceable.