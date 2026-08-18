# OMNII POLICY ENGINE

Evaluates registered policies against subject, action, resource, context, authority, risk, and constitutional constraints.

## Decisions
`ALLOW | ALLOW_WITH_CONDITIONS | REQUIRE_AUTHORIZATION | DENY | QUARANTINE`

Policies are versioned and scoped. Policy evaluation cannot manufacture authority or override higher-order constitutional rules. Consequential decisions emit decision records.