export type AuditSeverity = 'info' | 'warning' | 'critical';

export interface AuditFinding {
  id: string;
  category:
    | 'contradiction'
    | 'dependency'
    | 'authority'
    | 'capability-drift'
    | 'security'
    | 'schema'
    | 'economic'
    | 'architecture';
  severity: AuditSeverity;
  description: string;
  evidence: string[];
}

export interface AuditTarget {
  id: string;
  declaredDependencies: string[];
  availableDependencies: string[];
  declaredCapabilities: string[];
  observedCapabilities: string[];
  constitutionalAuthority: string;
  observedAuthority: string;
  schemaVersion: string;
  observedSchemaVersion: string;
}

export class ConstitutionalSelfAudit {
  audit(target: AuditTarget): AuditFinding[] {
    const findings: AuditFinding[] = [];
    if (target.declaredDependencies.some((d) => !target.availableDependencies.includes(d))) {
      findings.push({ id: `${target.id}:dependency`, category: 'dependency', severity: 'critical', description: 'declared dependency is unavailable', evidence: target.declaredDependencies });
    }
    if (target.declaredCapabilities.some((c) => !target.observedCapabilities.includes(c))) {
      findings.push({ id: `${target.id}:capability`, category: 'capability-drift', severity: 'warning', description: 'declared capability is not observed', evidence: target.declaredCapabilities });
    }
    if (target.constitutionalAuthority !== target.observedAuthority) {
      findings.push({ id: `${target.id}:authority`, category: 'authority', severity: 'critical', description: 'observed authority differs from constitutional authority', evidence: [target.constitutionalAuthority, target.observedAuthority] });
    }
    if (target.schemaVersion !== target.observedSchemaVersion) {
      findings.push({ id: `${target.id}:schema`, category: 'schema', severity: 'warning', description: 'schema drift detected', evidence: [target.schemaVersion, target.observedSchemaVersion] });
    }
    return findings;
  }
}
