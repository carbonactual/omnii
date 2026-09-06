import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EDUCATION_PERSISTENCE_TABLES,
  EDUCATION_DERIVED_COMPOSITIONS,
  getEducationPersistenceTable,
} from './education-persistence-contract.mjs';

test('Education persistence defines durable domain records without duplicating universal foundations', () => {
  assert.deepEqual(EDUCATION_PERSISTENCE_TABLES, [
    'education_onboarding_profiles',
    'education_learning_records',
    'education_skill_records',
    'education_credential_records',
    'education_cpd_activities',
    'education_provider_records',
    'education_labs',
    'education_lab_runs',
  ]);
  assert.deepEqual(EDUCATION_DERIVED_COMPOSITIONS, [
    'learning_wallet',
    'skills_passport',
  ]);
  assert.equal(getEducationPersistenceTable('education_learning_records').authorityBoundary, 'SHARED_OMNII');
  assert.equal(getEducationPersistenceTable('education_credential_records').issuerAuthority, 'EXTERNAL_OR_CONFIGURED_ISSUER');
  assert.equal(getEducationPersistenceTable('education_lab_runs').simulationDoesNotBecomeActual, true);
});

test('unknown persistence table names are rejected', () => {
  assert.throws(() => getEducationPersistenceTable('education_unknown'), /unknown education persistence table/);
});

console.log('Education persistence contract tests passed');
