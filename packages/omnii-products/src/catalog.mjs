export const PRODUCT_STATUS = Object.freeze(['conforming','specified','composed','reference']);

export function registerProduct(adapter, {status='specified', implementationEvidence=false} = {}) {
  if (!adapter?.productKey) throw new Error('adapter is required');
  if (!PRODUCT_STATUS.includes(status)) throw new Error('invalid product status');
  if (implementationEvidence && status !== 'conforming') throw new Error('implementation evidence cannot upgrade a non-conforming product implicitly');
  if (!Array.isArray(adapter.capabilities)) throw new Error('adapter.capabilities must be an array');
  if (!Array.isArray(adapter.sourceLineage) || adapter.sourceLineage.length === 0) throw new Error('sourceLineage is required');
  return Object.freeze({...adapter, status, implementationEvidence});
}

const BUILT_PRODUCT_CATALOG = [
  ['ABBA','carbonactual/abba','intelligence'],
  ['ABBA_MAS','carbonactual/abba-mas','reusable capability/product'],
  ['OMNI','carbonactual/omni','product/runtime client'],
  ['HAPI_WORLD','carbonactual/hapi-world','ecosystem composition'],
  ['HAPI_WORLD_NEXUS','carbonactual/hapi-world-nexus','presentation/ecosystem client'],
  ['NASC','carbonactual/abba-automation-ecosystem','institutional product'],
  ['DIRECT_BANK_APP','carbonactual/direct-bank-app','financial product'],
  ['OPEN_BALLOT','carbonactual/open-ballot','civic simulator/domain product'],
  ['RITES','carbonactual/RITES','continuity domain product'],
  ['NIGERIAN_CULTURAL_ATLAS','carbonactual/nigerian-cultural-atlas','cultural product'],
  ['BKLIT_UI','carbonactual/bklit-ui','presentation/UI'],
  ['BUNK','carbonactual/omnii','property product'],
  ['INSTITUTEGPT','carbonactual/omnii','Education Layer product — canonical education GPT/service'],
  ['OPEN_ED_BOT','carbonactual/omnii','InstituteGPT open/distance/flexible education composition'],
  ['INSTITUTEGPT_NOTEBOOK','carbonactual/omnii','InstituteGPT study/research/teaching workspace'],
  ['INSTITUTEGPT_EXAMS','carbonactual/omnii','InstituteGPT examination and testing product'],
  ['NOUN_BOT','carbonactual/noun-student-bot','institution-specific OpenEd Bot deployment']
];

export const EDUCATION_LAYER_PRODUCT_HIERARCHY = Object.freeze({
  layer: 'EDUCATION_LAYER',
  canonicalProduct: 'INSTITUTEGPT',
  products: Object.freeze([
    'INSTITUTEGPT',
    'OPEN_ED_BOT',
    'INSTITUTEGPT_NOTEBOOK',
    'INSTITUTEGPT_EXAMS'
  ]),
  deployments: Object.freeze(['NOUN_BOT']),
  removedProductKeys: Object.freeze(['INSTITUTEGPT_ADVANCE']),
  rule: 'A capability is not a product unless it has an independently meaningful semantic, operational and ecosystem boundary.'
});

export const BUILT_PRODUCT_REPOSITORIES = Object.freeze(
  BUILT_PRODUCT_CATALOG.map(([productKey, repository, architecturalClass]) =>
    Object.freeze({ productKey, repository, architecturalClass })
  )
);

export function catalogBuiltProducts() {
  return BUILT_PRODUCT_REPOSITORIES.map((item) => ({...item}));
}
