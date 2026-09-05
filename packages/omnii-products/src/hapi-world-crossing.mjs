export const HAPI_CROSSING_MODES = Object.freeze(['governed','autonomous']);

export function createHapiWorldCrossing({productKey, participantRef, intentRef, capabilityRefs=[], authorityRef=null, provenance={}} = {}) {
  if (!productKey || !participantRef) throw new Error('productKey and participantRef are required');
  return {id:`crossing:${crypto.randomUUID()}`, productKey, participantRef, intentRef: intentRef ?? null, capabilityRefs:[...capabilityRefs], authorityRef, mode: authorityRef ? 'governed' : 'autonomous', provenance};
}
