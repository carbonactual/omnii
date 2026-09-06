export const EDUCATION_PERSISTENCE_TABLES = Object.freeze([
  'education_onboarding_profiles',
  'education_learning_records',
  'education_skill_records',
  'education_credential_records',
  'education_cpd_activities',
  'education_provider_records',
  'education_labs',
  'education_lab_runs',
]);

export const EDUCATION_DERIVED_COMPOSITIONS = Object.freeze([
  'learning_wallet',
  'skills_passport',
]);

const TABLE_CONTRACTS = Object.freeze({
  education_onboarding_profiles: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    purpose: 'governed learner context and curation preferences',
  }),
  education_learning_records: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    purpose: 'durable learning and progression record',
  }),
  education_skill_records: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    purpose: 'provenance-aware skill and competency state',
  }),
  education_credential_records: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    issuerAuthority: 'EXTERNAL_OR_CONFIGURED_ISSUER',
    purpose: 'credential or achievement reference without transferring issuer authority',
  }),
  education_cpd_activities: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    purpose: 'continuing professional development activity and evidence',
  }),
  education_provider_records: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    purpose: 'replaceable education provider/adapter metadata',
  }),
  education_labs: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    purpose: 'lab definitions and practice environments',
  }),
  education_lab_runs: Object.freeze({
    authorityBoundary: 'SHARED_OMNII',
    purpose: 'lab execution evidence and outputs',
    simulationDoesNotBecomeActual: true,
  }),
});

export function getEducationPersistenceTable(tableName) {
  const contract = TABLE_CONTRACTS[tableName];
  if (!contract) throw new Error(`unknown education persistence table: ${tableName}`);
  return contract;
}
