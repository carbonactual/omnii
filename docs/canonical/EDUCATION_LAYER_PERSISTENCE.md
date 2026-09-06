# Education Layer Persistence Doctrine

**Status: CANONICAL DESIGN — 2026-09-06**

## 1. Position

Education persistence is a domain persistence layer beneath the Education Layer and above the shared OMNII storage/runtime substrate.

It does not become a second system of constitutional meaning.

```text
OMNII foundation / runtime / universal composition
  ↓
Education Layer
  ↓
InstituteGPT + OpenEd Bot + Notebook + Exams
  ↓
Education persistence records
  ↓
Education Floor / providers / institutions / deployments
```

## 2. Durable domain records

The persistence core uses dedicated tables for:

`education_onboarding_profiles`
`education_learning_records`
`education_skill_records`
`education_credential_records`
`education_cpd_activities`
`education_provider_records`
`education_labs`
`education_lab_runs`

These records provide education-specific queryability and operational continuity while preserving universal OMNII references for identity, evidence, authority, provenance and consequential execution.

## 3. Identity and subject references

`subject_ref` identifies the universal subject participating in the education record.

Where the subject is a local authenticated human profile, `learner_profile_id` may point to the shared `profiles` record. This does not replace HAPI or Root.

Organizations, institutions, professional bodies, governments, employers and AI agents may be represented through universal references without forcing them into a human-only education schema.

## 4. Onboarding and curation

`education_onboarding_profiles` preserves the governed learner context established during InstituteGPT application/onboarding.

It may contain learner interests, goals, education stage, prior knowledge, skills, experience, career direction, format/pace/time preferences, language, accessibility, connectivity, location context, budget, provider preferences, credential goals and other education-relevant curation context.

Safeguarding and privacy metadata remain explicit because children and protected learner contexts require stronger governance.

## 5. Learning and skills

Learning records describe participation and progression. Skill records describe the current governed state of a skill/competency and preserve evidence, assessment and provider references.

The persistence model does not equate completion with mastery.

## 6. Credentials

`education_credential_records` records achievements or references to credentials without taking ownership of issuer authority.

The authority chain remains:

`learning → evidence/demonstration → recognition/credential → professional/legal authorization`

External institutions, providers, professional bodies, governments and regulators retain authority over the credentials they issue or authorize.

## 7. Providers and standards

`education_provider_records` stores replaceable provider/adapter metadata.

Providers are integrations, not constitutional dependencies.

Standards such as Open Badges, CLR, W3C Verifiable Credentials, QTI, CASE, LTI, OneRoster, Edu-API, Caliper, UNESCO OER references, ESCO and applicable national/professional frameworks remain interoperability adapters around OMNII semantics.

## 8. Labs

`education_labs` describes governed practice environments.

`education_lab_runs` records lab activity, outputs and evidence.

A sandbox or simulation run MUST NOT silently become `ACTUAL`. The explicit `simulation_or_sandbox` and `reality_state` boundary protects that distinction.

## 9. Learning Wallet and Skills Passport

Learning Wallet and Skills Passport remain InstituteGPT compositions derived from durable learning, skill, credential, CPD, project, assessment and evidence records.

They are not alternate systems of record.

## 10. Security posture

All Education persistence tables enable Row Level Security and revoke access from `anon` and `authenticated` by default.

Access is therefore service-role/authorized-runtime mediated until explicit policies are designed for a particular learner, institution or deployment context.

## 11. Universal boundaries

Education persistence MUST NOT:

- redefine Root, HAPI, Authority, Seal, Actual, Atlas, Evidence, Pulse or IO;
- create a competing universal identity or relationship graph;
- make a provider/vendor/LMS/cloud mandatory;
- promote simulated activity to operational fact;
- convert an education record into regulated authority without the legitimate issuer/regulator;
- silently merge childhood exploration with adult employment identity;
- turn the Learning Wallet or Skills Passport into competing source-of-truth systems.
