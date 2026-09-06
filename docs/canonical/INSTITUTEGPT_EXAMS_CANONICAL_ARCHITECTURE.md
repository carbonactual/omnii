# InstituteGPT Exams — Canonical Examination & Testing Product

**Status: CANONICAL DESIGN — 2026-09-06**

## 1. Product position

Exams is a first-class product of InstituteGPT, not merely a feature inside Assessment.

`InstituteGPT → Exams`

It provides reusable examination and testing infrastructure across education, professional development, regulated professions, employers, governments, credentialing bodies and international testing systems.

## 2. Scope

Exams covers:

`school entrance → common entrance → school leaving → tertiary admission → postgraduate admission → placement → scholarship selection → professional → licensing support → certification → CPD → workplace/job → promotion → confirmation → language proficiency → qualifying → competitive selection → institutional → national → international → practical → oral/viva → research defense → simulation`

Examples include JAMB/UTME, WAEC/WASSCE, NECO examinations, IELTS and institution-specific entrance, promotion, professional and employment examinations. The product provides infrastructure and adapters; the named authority remains the authoritative owner of its examination.

## 3. Full examination lifecycle

`discover → advise → eligibility → register → identity verify → evidence submit → funding/payment → schedule → centre/remote allocation → prepare → authenticate → deliver → invigilate/proctor → capture responses/evidence → mark → moderate → standard-set → score → quality-assure → approve → publish → verify → appeal/review → remark/regrade → retake → credential/reference → downstream admission/progression/employment → archive`

## 4. Examination infrastructure

Exams supports configurable:

- exam definitions, sessions and calendars;
- providers, authorities and institutional deployments;
- candidate registration and eligibility;
- candidate identity and evidence;
- centres, rooms, devices and capacity;
- remote testing environments;
- question banks and item metadata;
- blueprints, forms and test assembly;
- randomized forms and secure delivery;
- paper, computer, hybrid, adaptive, oral, practical, field and simulation delivery;
- accommodations and accessibility;
- examiner/marker/invigilator/proctor assignment;
- incident, malpractice and chain-of-custody records;
- marking, moderation, standard setting and scoring;
- results, verification, appeals, remarking, regrading and retakes.

## 5. Assessment technology

The product should support both conventional and emerging assessment technology while keeping the assessment construct explicit:

`fixed-form CBT | CAT/adaptive testing | secure browser | remote proctoring | live invigilation | recorded invigilation | oral video assessment | practical stations | simulation | rubric scoring | assisted marking | automated marking | human marking | second marking | moderation | standard setting | psychometric/measurement analysis`

QTI is the primary assessment-content portability adapter because it supports exchange of items, tests and results between authoring, item-bank, delivery, scoring and analytics systems. cite-source:turn789529search7turn789529search8

## 6. Human-centered integrity

Exams must distinguish:

`signal → suspicion → evidence → review → finding → decision`

AI detection, behaviour analytics, authorship analysis or proctoring signals are not automatically findings. High-impact adverse decisions require the applicable rules, review, evidence, due process and appeal pathway.

## 7. Human and AI examiners

AI may assist with:

`item drafting → blueprinting → translation → accessibility → marking assistance → feedback → anomaly detection → scheduling → administration → analytics`

Human examiners and competent authorities remain responsible where the examination rules require human judgment.

## 8. Named examination-system adapters

Provider adapters may encode the rules and workflows of:

`JAMB/UTME | WAEC/WASSCE | NECO | IELTS | TOEFL | Cambridge assessments | professional bodies | employers | universities | colleges | TVET providers | government ministries | regulators | scholarship bodies | international testing organisations`

The adapter is replaceable and provider-owned. It must not redefine InstituteGPT or OMNII constitutional semantics.

Current examples demonstrate very different delivery models. JAMB operates a national tertiary admissions examination ecosystem; NECO provides internal/external SSCE plus NCEE and BECE and currently exposes CBT and result-verification services; IELTS combines computer-based components with human-examiner speaking assessment and also supports some remote testing. cite-source:turn789529search10turn849491search0turn789529search3turn789529search2

## 9. Education progression

Exams must support:

`primary selection → secondary transition → tertiary entry → tertiary progression → postgraduate entry → professional entry → professional competence → workplace selection → promotion → leadership progression → CPD → recertification → lifelong learning`

An examination result may influence progression but does not automatically become a credential, licence, admission or employment decision.

## 10. Institution and government deployment

An examination provider or institution is configured rather than rebuilt:

`Exams + authority + examination rules + syllabus/competencies + candidate population + calendar + centres + delivery modes + security rules + marking scheme + result rules + appeals + credential references + integrations + local policy`

Government deployments may compose national examinations, provider management, candidate access, equity monitoring, workforce testing and result verification while preserving the underlying authority boundaries.

## 11. Standards adapters

Exams should provide replaceable adapters for:

`1EdTech QTI | 1EdTech CASE | 1EdTech LTI | 1EdTech OneRoster | 1EdTech Caliper | CLR/Open Badges | W3C Verifiable Credentials | national qualification frameworks | professional-body standards`

CASE supports machine-readable standards, competencies and learning outcomes; QTI supports portable assessment content/results. cite-source:turn789529search9turn789529search7

## 12. Accessibility and delivery equity

Support must include:

`screen readers | keyboard access | captions | extra time | accessible centres | language options | device adaptation | low bandwidth | offline workflows | remote/centre choice | assisted technology`

Accessibility is part of exam integrity, not an optional convenience.

## 13. Examination security

Security controls may include:

`identity assurance | secure candidate lifecycle | content encryption | item exposure controls | randomized assembly | device trust | secure browser | environment verification | centre monitoring | chain of custody | incident logging | anomalous-event analysis | restricted administrator actions | audit trails | controlled release`

No vendor's proctoring or security mechanism becomes constitutionally mandatory.

## 14. Result and credential boundaries

`exam result ≠ credential ≠ admission ≠ license ≠ employment decision`

Exams can produce verified results and references to credentials. The authoritative issuer or decision-maker retains authority.

## 15. InstituteGPT integration

`Learn → Prepare → Practice → Simulate → Register → Sit Exam → Result → Progress`

Notebook can provide the preparation/revision workspace. OpenEd can provide exam access and administration for open/distance institutions. Opportunities can consume verified competency evidence for relevant opportunities. HAPI/Root supplies identity. IO records consequential examination events.

## 16. Future and emerging examination systems

InstituteGPT Exams should remain extensible for:

`continuous assessment → evidence-rich assessment → process-aware assessment → AI-assisted oral defense → simulation-first professional testing → digital twins → real-world performance assessment → adaptive lifelong competence checks → agent capability examinations → human-AI team assessment → machine-readable competency verification`

These remain governed assessment modes and must not silently convert simulated or AI-generated performance into authoritative real-world claims.

## 17. Product principle

`Exams owns examination orchestration and testing meaning.`

`Common Layer owns reusable mechanics.`

`External authorities own authoritative examination decisions and credentials.`

`InstituteGPT remains the education/progression layer.`
