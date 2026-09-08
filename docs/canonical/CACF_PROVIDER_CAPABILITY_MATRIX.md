# CACF Connected Provider Capability Matrix

**Status:** Canonical seed matrix — 2026-09-08

This matrix maps the currently connected Carbon Actual plugin/provider surfaces into canonical capability classes. A provider is an implementation boundary, not a source of constitutional semantics.

| Provider | Primary capability domains | Representative canonical capabilities | Authority posture |
|---|---|---|---|
| GitHub | Source control, collaboration, governance, verification | repository read/write, branch/commit management, issues, pull requests, workflow observation, release management | Provider access never replaces Carbon Actual authority |
| Supabase | Data, identity, runtime, infrastructure | query/mutate, schema management, authentication, edge-function management, realtime/storage | Privileged data/runtime changes remain server/runtime governed |
| Vercel | Build, deployment, infrastructure | application build, deploy, preview, deployment observation, domain management | Deployment remains a consequential external mutation |
| AppDeploy | Build, deployment, QA, infrastructure, secret configuration | publish, QA observation, version/source snapshots, secret configuration, domain management | Secret values stay outside CACF; configuration is high/critical risk |
| Notion | Knowledge, planning, documentation | document read/write, research context, project/task context | Knowledge does not become authority merely through retrieval |
| Canva | Creation, media, representation | design create/refine, design transformation, social resize | Creative output is an external representation, not constitutional truth |
| Amplitude | Analytics, intelligence, experimentation | event/property discovery, chart/dashboard query, experiment query | Analytics supplies evidence/measurement; it does not authorize execution |
| PostHog | Analytics, experimentation, observability | product query, experiments, feature flags, errors, logs, LLM analytics | Observability remains evidence, not Actual state by itself |
| Quicknode | Blockchain/distributed infrastructure, security, billing | endpoint management, RPC requests, logs, rate-limit controls, usage observation | Provider infrastructure does not define token/right/asset semantics |
| OpenAI Platform | AI, intelligence, platform security | model provider, application configuration, API-key lifecycle | Secrets are referenced as requirements only; key material never enters CACF |
| Automations | Scheduling, recurring execution, conditional orchestration | reminders, recurring runs, conditional checks, scheduled searches | Scheduled mutation remains subject to authority and execution gates |
| Plugin Management | Ecosystem integration governance | plugin discovery, connection/permission inspection, connection management | Meta-provider; manages participation in the plugin fabric, not business authority |
| File Library | Evidence/data boundary | search/read/list/materialize/library management | File access is scoped to the available resource; file contents do not become canonical merely by retrieval |

## Provider substitution examples

`capability.build.application` can be implemented by Vercel or AppDeploy.

`capability.analytics.*` can be implemented by Amplitude or PostHog for different analytical purposes.

`capability.data.*` is implemented by Supabase in the current connected set, while future data providers can implement the same canonical class.

`capability.ai.model_provider` can be implemented by an approved AI provider adapter without changing ABBA, Mission Intelligence or authority semantics.

## Canonical boundary

The provider matrix therefore models:

`canonical capability identity → provider implementation → provider-specific operation → evidence/result`

and never:

`provider → new canonical truth`.
