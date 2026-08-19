# NAB — Compliance, Travel Documentation & Enforcement

## Scope

NAB records movement-relevant compliance and documentation context while authoritative issuers and enforcement bodies remain canonical for their decisions.

## Documentation references

- vehicle and asset registration;
- operator licences and permits;
- inspections and certifications;
- passenger identity/travel-document references;
- passport/visa status references where lawful and necessary;
- customs and border documentation references;
- cargo documentation;
- route/access permissions;
- operating certificates.

## Compliance records

NAB can maintain references to:

- traffic violations;
- outstanding citations/fines;
- inspection failures;
- expired or suspended certificates;
- recalls;
- route restrictions;
- operator restrictions;
- enforcement actions;
- audit findings;
- corrective actions.

These records must preserve issuer, jurisdiction, effective time, status and evidence.

## Automated checks

Before a movement is executed, Charter may request NAB checks for:

```text
identity
→ documentation
→ authorization
→ certification
→ restrictions
→ asset readiness
→ route constraints
→ eligibility
```

A failed check should produce an explicit reason/status and an appropriate workflow, not an opaque denial.

## Privacy and minimization

Sensitive identity, travel and enforcement information must only be exposed to authorized consumers and only to the degree required for the movement workflow.

NAB should prefer references, attestations and eligibility results over unnecessary replication of sensitive source records.

## Jurisdiction

NAB records and synchronizes authoritative information. It does not create or override immigration, customs, police, court, licensing or regulatory authority.
