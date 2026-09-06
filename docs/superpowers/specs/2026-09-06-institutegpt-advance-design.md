# InstituteGPT Advance — Learning, Skills & Advancement Design

**Status: APPROVED DESIGN — 2026-09-06**

## Purpose

Create **InstituteGPT Advance** as a first-class InstituteGPT service for universal learning, skills development, learning paths, hands-on practice, CPD, professional learning, badges, certificates and advancement. The service must work for children, students, adults, professionals, researchers, educators, organizations, governments and governed AI/agent learners.

Advance does not replace the InstituteGPT education layer. It is the primary learner-facing progression composition over the education layer. Existing and future education capabilities remain reusable and composable rather than becoming a proliferation of product-specific silos.

## Product boundary

`InstituteGPT → Advance`

Advance first-class concerns:
- learning and learning experiences;
- courses, modules, lessons and programmes;
- learning paths and pathway planning;
- skills and competencies;
- practice, projects, labs and experiential learning;
- CPD and professional learning;
- achievements, badges, certificates, microcredentials and credential references;
- lifelong learning and advancement.

The education layer owns or composes supporting capabilities including discovery, counselling, admissions, curriculum, tutoring, mentoring, coaching, accessibility, assessment, examination, marking, proctoring, learner success, wellbeing, research, library, work-integrated learning, administration, interoperability, funding, government education and AI governance.

## First-class product family

The canonical InstituteGPT product family is:

`InstituteGPT`
`├── Advance`
`├── OpenEd Bot`
`├── Notebook`
`└── Exams`

OpenEd Bot, Notebook and Exams retain their existing boundaries. Advance consumes and composes them rather than duplicating their semantics.

## Universal learning value chain

`discover → identity/context → goal → diagnose → advise → plan → select path → learn → practice → lab/simulation → project → experience → demonstrate → assess → credential/badge → portfolio/record → opportunity → practice/work → CPD → renew/reskill/upskill → lifelong learning`

Not every path uses every stage. The graph must permit skipping, repeating, branching, stacking and re-entry.

## Learning experience model

The universal learning unit is a **Learning Experience** rather than a course-only model. A learning experience may combine lessons, readings, media, AI dialogue, teacher instruction, tutoring, exercises, quizzes, labs, simulations, projects, field work, mentorship, apprenticeship and assessment.

Learning objects remain versioned, prerequisite-aware, accessible, localizable and mappable to outcomes/competencies.

## Skills and competency model

`knowledge → skill → competency → demonstrated competency → achievement → qualification → professional authorization`

A course teaches; practice develops; assessment measures; evidence demonstrates; a credential records recognition; an authority grants regulated authorization. These are separate semantics.

The system supports skill-framework adapters including occupational, academic, professional, employer and local/national frameworks. Frameworks are replaceable external mappings.

## Learning paths

Learning Path is a first-class Advance object with:
- learner goal and target role/purpose;
- starting capability and diagnostic state;
- prerequisites;
- skills and competencies;
- ordered or graph-based experiences;
- labs/projects/evidence requirements;
- assessments and optional Exams dependencies;
- credential outcomes;
- progression and opportunity targets;
- renewal/CPD branches;
- versioning and source/provenance.

Paths may be native, partner-provided, institution-authored, employer-authored, professional-body-authored, government-authored, learner-authored or AI-generated subject to governance.

## Labs

Labs are a first-class **capability inside Advance**, not a separate product at this stage.

Lab types:
`coding | cloud | AI | data | cybersecurity | science | engineering | robotics | electronics | medicine | agriculture | manufacturing | finance | GIS | media | design | language | vocational | field | simulation | VR/AR | digital twin | hardware-connected | remote`

Lab runtimes may be sandboxed browser environments, notebooks, containers, virtual machines, cloud workspaces, remote hardware, simulation engines or physical facilities. A lab can emit evidence, assessment signals, project artifacts and competency demonstrations.

## Practice and projects

Advance supports guided practice, deliberate practice, problem-based tasks, scenario exercises, real-world projects, portfolios, team projects and supervised experience. Practice must be distinguishable from assessed evidence and from authoritative professional practice.

## Credentials and badges

Advance supports a credential continuum:

`participation → completion → badge → microcredential → certificate → professional certificate → diploma → degree reference → qualification → professional certification → regulated authorization`

Credentials are issuer-owned claims. InstituteGPT may issue ecosystem-native achievements where configured, and may record/reference external credentials, but must not impersonate external issuers or regulators.

Open Badges 3.0 / CLR 2.0 and W3C Verifiable Credentials 2.0 are interoperability targets. Badge/credential metadata should preserve issuer, earner, criteria, evidence, achievement, alignment, endorsements, provenance, issue/expiry and verification state where supported.

## Learning Wallet and Skills Passport

**Learning Wallet**: portable collection/reference of learning activities, badges, certificates, credentials, transcripts, assessments, projects and evidence.

**Skills Passport**: synthesized, provenance-aware view of demonstrated and verified skills/competencies across learning and work. It must distinguish self-declared, learned, assessed, demonstrated and externally verified states.

Both remain Advance capabilities initially and can later become first-class products if their independent ecosystem boundary warrants it.

## Pathway Builder

Pathway Builder is a core Advance capability supporting human, institution, employer, professional-body and government authorship, plus governed AI-generated paths. It consumes diagnostics, competency frameworks, credential requirements and opportunity requirements.

## Education marketplace

Marketplace capability discovers and compares native, partner and external learning. Providers retain content, credential and authority ownership. InstituteGPT uses adapters rather than hard dependencies.

Provider categories include general learning, open education, universities, schools, TVET, professional bodies, employers, government, technology vendors, AI providers and specialist academies.

## External ecosystem integrations

Adapter targets include, where technically and contractually available:
- GitHub Education / GitHub Skills;
- OpenAI education/Academy;
- Anthropic education/Claude learning resources;
- Microsoft Learn and credentials;
- AWS Educate and AWS training/labs;
- NVIDIA DLI training/labs/certification;
- Google learning/career certificates;
- IBM SkillsBuild;
- Cisco Networking Academy;
- Salesforce Trailhead;
- Coursera;
- Udemy;
- Alison;
- FutureLearn;
- DataCamp;
- Pluralsight;
- professional certification ecosystems;
- universities and other education providers;
- future compatible providers.

Integrations may import catalog metadata, deep links, progress, achievements, badges, credentials, skill mappings or verification results according to provider APIs and permissions. Provider branding and source must remain visible.

## AI learning

AI/agent learners have distinct governed records from humans. Advance may deliver knowledge packages, practice, simulations, benchmarks, capability assessments, tool-use training, MCP learning, safety training and deployment-readiness learning. AI learning outcomes do not create human qualifications; human credentials do not automatically license AI systems.

The AI skills ladder may span:
`AI awareness → literacy → prompting → workflows → agents → tool use → MCP → retrieval → evaluation → safety/security → AI product development → AI engineering → research → governance → leadership`

Technology versions are external, versioned knowledge and skills mappings.

## Children and safeguarding

The same semantic education substrate serves early childhood through lifelong learning, but child experiences must apply age-appropriate controls for identity, consent, privacy, safety, content, communication, analytics and credentials. Child learning records must not silently become permanent adult employment records.

## CPD and professional learning

CPD is a first-class Advance capability with provider, activity, competency, learning outcome, evidence, credits/hours where applicable, assessment, completion, expiry and framework mapping. Professional bodies remain authoritative for mandatory CPD rules, certification, recertification and licensing.

## Provider / issuer boundary

`provider creates learning`
`trainer teaches`
`lab provides practice environment`
`assessment measures`
`exam tests where formal examination is required`
`issuer recognizes achievement`
`regulator authorizes practice`
`employer decides employment`

No single platform should be assumed to own all stages.

## Institutional, employer and government modes

Advance composes role-based learning, mandatory training, staff development, workforce skills programmes, national upskilling, teacher development, scholarship-linked pathways, employer academies, professional learning and system-level capability programmes.

Institution deployments configure identity, catalog, curricula, competency frameworks, calendars, credential authorities, local policies, language, accessibility and integrations without redefining InstituteGPT primitives.

## Standards

Standards adapters should include:
- 1EdTech Open Badges 3.x;
- 1EdTech CLR 2.x;
- W3C Verifiable Credentials 2.0;
- 1EdTech QTI, CASE, LTI, OneRoster, Edu-API and Caliper where applicable;
- UNESCO OER references;
- competency/occupation frameworks such as ESCO where applicable;
- national/regional qualifications and professional frameworks as external adapters.

## Governance

Advance must not:
- issue external credentials without authority;
- imply a course completion is a regulated licence;
- convert simulated practice into authoritative real-world practice without a governed event;
- expose protected learner/child data to providers without authorization;
- make a specific vendor, cloud, model, LMS or proctoring system constitutionally indispensable;
- use AI-generated recommendations as unreviewed high-impact education decisions where human authority is required.

## Data and event model

Core entities:
`learning_experience, course, module, lesson, learning_path, skill, competency, framework_mapping, lab, project, practice, evidence, portfolio, achievement, badge, certificate, credential_reference, learning_wallet, skills_passport, cpd_activity, provider, issuer, learner, learning_enrollment, progress, recommendation, opportunity_link`.

Consequential transitions use existing IO/audit semantics. Sensitive learner records use RLS and least privilege.

## Testing

Tests must cover:
- product registration and hierarchy;
- learning-path composition and progression;
- learning experience composition;
- lab capability classification;
- skills/competency state separation;
- badge/credential issuer boundaries;
- learning wallet and skills passport derivation;
- provider adapter neutrality;
- child-safe profile flags;
- AI learner separation;
- CPD handling;
- external credential references;
- compatibility with existing OpenEd, Notebook and Exams products.

## Acceptance criteria

1. Advance is registered as a first-class InstituteGPT product.
2. Learning, skills, paths, courses, labs, CPD and achievement/credential flows are represented without creating redundant product silos.
3. Badges/certificates/credentials remain issuer-authoritative and interoperable.
4. Native, partner and external providers can be represented through adapters.
5. Child, human adult, professional, institutional, government and AI learner modes are supported by one flexible model.
6. Existing InstituteGPT and Exams/OpenEd/Notebook contracts remain compatible.
7. CI/typecheck/runtime tests remain green.
