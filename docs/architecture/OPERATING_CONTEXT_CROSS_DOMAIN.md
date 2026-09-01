# Operating Context — Cross-Domain Contract

Operating Context is the canonical contextual envelope for consequential records.

It answers: who/what, which fleet, which mode, in what operating capacity, for which service/journey, under which authority/jurisdiction, where and when, and in what state.

## Linked artifact types

The canonical `operating_context_id` may be referenced by:

- form submissions
- form reviews / approvals
- transport credentials
- transport compliance cases
- evidence objects
- token representations
- token lifecycle events
- mint issuances

## Boundary

Operating Context is contextual metadata and a relationship anchor. It does not itself grant authority, certify an asset, issue a credential, settle value, or create a token. Those powers remain with their respective domain and institutional authorities.

## Transport example

`vehicle → fleet → commercial passenger mode → driver capacity → service → journey → jurisdiction → authority → timestamp → evidence → decision`

This permits later queries such as: which fleet was the vehicle operating for, which mode was active, and in what capacity did the actor function when the event or decision occurred?

## Tokenization rule

A token representation may reference an Operating Context to preserve the context in which an underlying right, entitlement, capacity, asset use, or economic interest was represented. Tokenization remains subject to the issuer, custody, settlement, authority, jurisdiction and legal-effect controls already defined by OMNII.
