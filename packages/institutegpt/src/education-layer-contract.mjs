export const EDUCATION_LAYER = Object.freeze({
  id: 'EDUCATION_LAYER',
  canonicalProduct: 'INSTITUTEGPT',
  products: Object.freeze([
    'INSTITUTEGPT',
    'OPEN_ED_BOT',
    'INSTITUTEGPT_NOTEBOOK',
    'INSTITUTEGPT_EXAMS',
  ]),
  siblingProducts: Object.freeze([
    'OPEN_ED_BOT',
    'INSTITUTEGPT_NOTEBOOK',
    'INSTITUTEGPT_EXAMS',
  ]),
  deployments: Object.freeze(['NOUN_BOT']),
  removedProductKeys: Object.freeze(['INSTITUTEGPT_ADVANCE']),
  hasAdvanceProduct: false,
  sharedFoundations: Object.freeze({
    HAPI: 'SHARED',
    ROOT: 'SHARED',
    INDEX: 'SHARED',
    VAULT: 'SHARED',
    TERMINAL: 'SHARED',
    ACTUAL: 'SHARED',
    EVIDENCE: 'SHARED',
    PULSE: 'SHARED',
    ATLAS: 'SHARED',
    IO: 'SHARED',
    OPPORTUNITIES: 'SHARED',
  }),
  nativeInstituteGPTCapabilities: Object.freeze([
    'learning',
    'skills',
    'competencies',
    'labs',
    'practice',
    'projects',
    'assessment',
    'badges',
    'certificates',
    'credential_pathways',
    'cpd',
    'learning_wallet',
    'skills_passport',
    'pathway_builder',
    'provider_integrations',
  ]),
  providerIntegrationMode: 'REPLACEABLE_ADAPTER',
  credentialAuthorityRule: 'EXTERNAL_ISSUER_OR_REGULATOR_RETAINS_AUTHORITATIVE_CONTROL',
  productBoundaryRule: 'PRODUCT_REQUIRES_INDEPENDENT_SEMANTIC_OPERATIONAL_AND_ECOSYSTEM_BOUNDARY',
});

const COMPONENT_LAYERS = Object.freeze({
  learning_capability: 'INSTITUTEGPT_CAPABILITY',
  provider_adapter: 'PROVIDER_ADAPTER',
  institution_deployment: 'DEPLOYMENT',
  sibling_product: 'EDUCATION_PRODUCT',
});

export function classifyEducationComponent({ kind } = {}) {
  return Object.freeze({
    kind,
    layer: COMPONENT_LAYERS[kind] ?? 'UNCLASSIFIED',
  });
}
