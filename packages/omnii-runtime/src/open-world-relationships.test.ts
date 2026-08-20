import { describe, expect, it } from 'vitest';
import { createRelationship, createEmergence } from './open-world-relationships';
describe('open-world relationships', () => { it('starts new relationships as provisional', () => expect(createRelationship({id:'r1',type_id:'new',subject_id:'a',object_id:'b'}).status).toBe('provisional')); it('records emergence without requiring taxonomy', () => expect(createEmergence({id:'e1',discovered_at:'2026-08-20T00:00:00Z',related_ids:['a']})).toBeTruthy()); });
