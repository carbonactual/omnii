export function createDesignGenealogy({ habitat, character, plate, lineageRefs = [], thrivingTest = null, identityTest = null } = {}) {
  if (!habitat) throw new Error('habitat is required');
  if (!character) throw new Error('character is required');
  if (!plate) throw new Error('plate is required');
  return {
    id: `genealogy:${crypto.randomUUID()}`,
    kind: 'design-genealogy',
    habitat,
    character,
    plate,
    lineageRefs: [...lineageRefs],
    thrivingTest,
    identityTest,
    sourceProvenanceRequired: true,
  };
}
