# OMNII CVE and Constitutional Registries

**Status:** CANONICAL implementation reference

## Registry spine

OMNII keeps `public.omnii_registries` as the single registry index. Registries are typed constitutional objects, not alternate constitutional systems. Every canonical registry carries identity, provenance, authority context, lifecycle, domain, canonical source, relationship vocabulary, open-world semantics and an explicit non-granting authority policy.

### Initial catalog

`identity`, `territory`, `population`, `authority`, `institution`, `enterprise`, `person`, `asset`, `liability`, `value`, `pulse`, `relationship`, `knowledge`, `health`, `education`, `justice`, `environment`, `infrastructure`, `transport`, `culture`, `continuity`, `token`, `mint`, `settlement`, `governance`, `ai-entity`.

The catalog is extensible; extension adds a registry object rather than a new constitutional primitive.

## CVE

**CVE = Constitutional Validation & Evaluation Engine.**

CVE evaluates registry declarations against explicit constitutional invariants. It records runs and findings and links evaluation outcomes into the existing audit substrate.

Initial rules:

- `REGISTRY_IDENTITY`
- `REGISTRY_PROVENANCE`
- `REGISTRY_AUTHORITY`
- `REGISTRY_LIFECYCLE`
- `REGISTRY_DOMAIN`
- `REGISTRY_SOURCE`
- `REGISTRY_RELATIONSHIPS`
- `REGISTRY_AUDITABILITY`
- `OPEN_WORLD`
- `NO_AUTHORITY_ESCALATION`

CVE is deterministic and advisory/evaluative. A finding does not rewrite a registry, manufacture consent, grant authority or promote an unapproved proposal into constitutional law.

## Runtime route

```text
Registry Object
    ↓
CVE Scope Resolution
    ↓
Constitutional Rules
    ↓
Evidence / Structural Evaluation
    ↓
CVE Run + Findings
    ↓
Audit / Evidence Linkage
    ↓
ABBA / Human / Governance Review
```

The authenticated `cve` Supabase Edge Function exposes the evaluator to authorized runtime callers with JWT verification enabled.

## Persistence

- `omnii_cve_rules` — rule definitions and evaluator identifiers.
- `omnii_cve_runs` — evaluation scope, subject, status, summary and provenance.
- `omnii_cve_findings` — attributable failures with expected/observed values, severity, evidence references and remediation class.

All three CVE tables have RLS enabled.
