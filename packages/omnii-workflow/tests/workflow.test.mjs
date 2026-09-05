import test from 'node:test';
import assert from 'node:assert/strict';
import { createFormIntent, createProcess, transitionProcess, createTask, claimTask, completeTask, createAutomation, shouldTrigger, registerRecord, discoverByCapability } from '../src/index.mjs';

test('form intent creates canonical intent envelope', () => {
  const intent = createFormIntent({ formId: 'form:1', payload: { name: 'Ada' } });
  assert.equal(intent.type, 'intent');
  assert.equal(intent.status, 'submitted');
});

test('process lifecycle is explicit and bounded', () => {
  const process = createProcess({ id: 'p:1', processType: 'institutional' });
  assert.equal(transitionProcess(process, 'validation').stage, 'validation');
  assert.throws(() => transitionProcess(process, 'action'), /invalid workflow transition/);
});

test('task worker flow records evidence without granting authority', () => {
  const task = createTask({ id: 't:1', processRef: 'p:1', capabilityRef: 'cap:test' });
  const claimed = claimTask(task, 'worker:a');
  const completed = completeTask(claimed, { evidenceRefs: ['e:1'], outcome: 'ok' });
  assert.equal(completed.status, 'completed');
  assert.equal(completed.authorityRef, null);
});

test('automation and registry remain deterministic', () => {
  const automation = createAutomation({ id: 'a:1', trigger: 'event.test', intentType: 'intent.test' });
  assert.equal(shouldTrigger(automation, { type: 'event.test' }), true);
  const records = [registerRecord({ id: 'r:1', kind: 'service', capabilities: ['cap:test'] })];
  assert.equal(discoverByCapability(records, 'cap:test').length, 1);
});
