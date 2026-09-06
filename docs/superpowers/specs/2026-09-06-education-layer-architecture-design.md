# Education Layer Architecture Design

**Status: APPROVED CANONICAL DESIGN — 2026-09-06**

## Goal

Structure the Education Layer as a domain composition of OMNII so that InstituteGPT, its native learning/certification services, sibling education products, provider integrations and institutional deployments are clear, reusable and non-competing with constitutional architecture.

## Architectural placement

The Education Layer is a domain boundary above OMNII constitutional and universal composition services and below ecosystem/product/application compositions.

```text
OMNII constitutional foundation
  ↓
shared canonical services / universal composition / runtime
  ↓
Education Layer
  ├─ InstituteGPT
  ├─ OpenEd Bot
  ├─ Notebook
  └─ Exams
  ↓
education capabilities
  ↓
providers / institutions / deployments / integrations
  ↓
Education Floor / operational reality
```

Education does not create a competing graph, identity system, authority model, runtime, value model or constitutional kernel.

## Product boundary

### InstituteGPT

InstituteGPT is the first-class product of the Education Layer and the canonical education GPT/service. It owns the universal learner-facing education experience and composes native services for learning, skills, competencies, labs, projects, assessment, recognition, credentials, CPD and lifelong progression.

There is no separate Advance product. Any prior Advance naming is historical terminology only and must not re-enter the product architecture.

### Sibling education products

OpenEd Bot, Notebook and Exams are distinct Education Layer products/compositions with independently meaningful experience boundaries:

- **OpenEd Bot** — open, distance, flexible and institution-ready education composition; may be deployed to institutions such as NOUN without creating a new education ontology.
- **Notebook** — study, research, teaching and evidence workspace composition integrated with InstituteGPT.
- **Exams** — formal examination and testing orchestration integrated with InstituteGPT.

Sibling products share OMNII and Education Layer semantics and do not duplicate or redefine constitutional objects.

## Native InstituteGPT capabilities

The following remain capabilities/services inside InstituteGPT rather than automatically becoming separate products:

`discovery | advising | counselling | application | admissions | enrollment | onboarding | learner curation | diagnosis | curriculum | courses | programmes | lessons | modules | learning paths | tutoring | teaching | mentoring | coaching | skills | competencies | labs | practice | projects | simulation | experiential learning | assessment | marking | moderation | proctoring | invigilation | evidence | badges | certificates | microcredentials | credential pathways | learning wallet | skills passport | CPD | professional learning | pathway builder | marketplace | provider integrations | learner support | accessibility | research | libraries | internships | apprenticeships | SIWES | work-integrated learning | education administration | funding | AI education governance`

A capability becomes a separate first-class product only when it develops a genuinely independent semantic/operational boundary and ecosystem role.

## Learner onboarding and curation

Application and onboarding establish governed learner context. Curation may use interests, goals, stage, prior knowledge, skills, experience, direction, subjects, format, pace, time, language, accessibility, device/connectivity, location context, budget, provider preferences, credential goals, professional-body requirements, CPD requirements, support preferences, lab/project preferences and assessment preferences.

Curation is adaptive, explainable and reversible. It recommends and coordinates learning; it does not silently make high-impact decisions.

For children, age suitability, guardian/educator controls, safeguarding, privacy, communications and retention are explicit governance constraints. Childhood exploration must not silently become an adult employment profile.

## Learning and competency model

The universal progression is:

`knowledge → skill → competency → practice → evidence → demonstrated competency → achievement → qualification → professional authorization`

Learning records, demonstrations and achievements are distinct from authoritative external qualifications and regulated permissions.

Recognition of prior learning may incorporate formal, informal, workplace, apprenticeship, internship, SIWES, portfolio, project, simulation and supervised-practice evidence where the responsible authority permits it.

## Labs and practice

Labs are a major InstituteGPT capability. They may be coding, cloud, AI, data, cybersecurity, science, engineering, robotics, electronics, medicine, agriculture, manufacturing, finance, GIS, media, design, language, vocational, field, simulation, VR/AR, digital-twin, hardware-connected or remote.

Environments may include sandboxes, browser runtimes, notebooks, containers, virtual machines, cloud workspaces, remote hardware, simulation engines and physical facilities.

Sandbox/simulation outputs are evidence candidates and must not silently become authoritative real-world practice or professional authorization.

## Credentials, badges and certification boundary

InstituteGPT supports ecosystem-native achievements and references external credentials. External institutions, providers, professional bodies and regulators retain authority for credentials and regulated licences.

Targets include:

`Open Badges | CLR | W3C Verifiable Credentials | QTI | CASE | LTI | OneRoster | Edu-API | Caliper | UNESCO OER references | ESCO | national qualification frameworks | professional competency frameworks`

A badge is recognition, not automatically a licence. A course completion is not automatically mastery. A credential reference is not itself the issuing authority.

## Provider ecosystem

Provider integrations are replaceable adapters/profiles. The education architecture can represent GitHub Education/GitHub Skills, OpenAI Education/Academy, Anthropic Education, Microsoft Learn, AWS Educate, NVIDIA DLI, Google, IBM SkillsBuild, Cisco Networking Academy, Salesforce Trailhead, Coursera, Udemy, Alison, Coursiv, edX, FutureLearn, LinkedIn Learning, Khan Academy, DataCamp, Pluralsight, Codecademy, freeCodeCamp, universities, TVET providers, professional bodies, employer academies, governments and future providers.

An adapter may expose only capabilities supported by the actual provider interface and permissions, such as catalog metadata, enrollment/deep links, progress references, labs, assessment references, achievements, badges or credential references. Provider ownership, source lineage and brand remain visible.

No provider, LMS, cloud vendor, AI model or proprietary service is constitutionally indispensable.

## Cross-layer authority model

HAPI and Root are shared ecosystem foundations, not children of InstituteGPT. InstituteGPT consumes identity, continuity, authority and consent context from shared OMNII services.

Typical relationship:

`HAPI/Root ↔ Education Layer ↔ InstituteGPT ↔ shared Evidence/Actual/Pulse/Atlas/Opportunities`

InstituteGPT does not own or redefine HAPI, Root, Actual, Evidence, Pulse, Atlas or Opportunities.

Consequential educational actions use the universal runtime:

`identity → authority → policy → capability → resource → dependency → execution → state transition → event → audit`

Consequential transitions use IO and applicable human/institutional/legal authority.

## Education Floor

The Education Floor is where the Education Layer encounters operational reality: classrooms, schools, universities, training centres, workshops, laboratories, hospitals, factories, farms, field sites, apprenticeship placements, internship hosts, assessment centres, exam halls and digital/remote learning environments.

Operational records remain traceable to identity, authority, policy, capability, resource, execution, state, evidence and audit as applicable.

## Opportunity connection

InstituteGPT may discover and prepare learners for jobs, internships, apprenticeships, scholarships, fellowships, projects, research, contracts, entrepreneurship and promotion. The universal Opportunities layer and external authorities retain the actual opportunity decision.

## AI learners

AI systems/agents may learn, practice, simulate, benchmark and receive governed capability state through InstituteGPT. AI learning is distinct from human qualification and does not automatically authorize human practice, regulated work or external credentials.

## Product and capability test

Every proposed Education feature must be classified before implementation:

`reuse shared OMNII capability → configure → compose education capabilities → extend an Education domain contract → create a genuinely reusable shared capability → create a first-class product only when a separate boundary exists → constitutional amendment only if foundational semantics are genuinely missing`

This prevents product proliferation, semantic duplication and architectural drift.

## Canonical invariants

1. `Education Layer → InstituteGPT` is the canonical primary product relationship.
2. There is no `Advance` product.
3. Learning/certification/badges/CPD/lifelong advancement are native InstituteGPT services.
4. OpenEd Bot, Notebook and Exams are sibling Education Layer products/compositions.
5. NOUN Bot is an institution-specific OpenEd Bot deployment, not a new universal education ontology.
6. Provider integrations are adapters, not constitutional layers.
7. External credential and regulatory authority remains with its legitimate issuer/regulator.
8. HAPI, Root, Actual, Atlas, Vault, Index, Terminal, IO, Evidence, Pulse and Opportunities remain shared OMNII architecture.
9. Education-specific data objects remain compatible with the universal object envelope and graph.
10. Education must remain modular, localizable, interoperable and deployable without vendor lock-in.
