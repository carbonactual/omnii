import { describe, expect, it } from 'vitest';
import { createParticipant } from './multi-species-runtime';
describe('open-world participants',()=>{it('represents unknown participants',()=>{const p=createParticipant({id:'p1',classification:'unknown',status:'provisional'});expect(p.classification).toBe('unknown');});});
