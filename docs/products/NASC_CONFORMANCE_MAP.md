# NASC Conformance Map

| Area | Implementation | Status |
|---|---|---|
| Institutional binding | `binding:nasc` | Instantiated |
| Registries | 18 NASC logical/domain registries | Instantiated |
| Forms | 12 NASC forms | Instantiated |
| Workflows | 8 governed NASC workflows | Instantiated |
| Deployment package | `deployment:nasc` v1.0.0 | Instantiated |
| Evidence/traceability | Versioned config + workflow requirements | Defined |
| Controls | Versioned control rules | Defined |
| Permissions | Versioned role boundaries | Defined |
| Metrics/Pulse | Versioned metric definitions | Defined |
| Proposal | NASC platform proposal | Packaged |
| SOW | NASC statement of work | Packaged |
| Roadmap | NASC implementation roadmap | Packaged |
| Operations/admin/user | Runbook + guides | Packaged |
| Security/continuity | Security and recovery guide | Packaged |
| UAT | Acceptance scenarios | Packaged |
| Handoff/exit | Portable handoff and exit guide | Packaged |

## Remaining release gates

Production integrations, NASC-authorized reference data, real user/role provisioning, full UAT execution, application UI acceptance, security/performance advisory review and institutional sign-off still require execution against the receiving institution's environment and requirements.

The architecture is designed so those steps configure the deployment rather than requiring a separate rebuild of the institutional machinery.
