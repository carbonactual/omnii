import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const registry = JSON.parse(readFileSync(new URL('../data/canonical/product-runtime-binding-registry.json', import.meta.url), 'utf8'))
const requiredProducts = [
  'ABBA',
  'NASC',
  'RITES',
  'NOUN_STUDENT_BOT',
  'OMNI',
  'DIRECT_BANK_APP',
  'OPEN_BALLOT',
  'NIGERIAN_CULTURAL_ATLAS',
  'HAPI_WORLD',
  'HAPI_WORLD_NEXUS',
  'BKLIT_UI'
]

for (const product of requiredProducts) {
  const binding = registry.bindings?.[product]
  assert.ok(binding, `${product}: runtime binding missing`)
  assert.ok(binding.repository, `${product}: repository missing`)
  assert.ok(binding.binding, `${product}: binding description missing`)
  assert.ok(binding.authority_gate, `${product}: authority gate missing`)
  assert.ok(Array.isArray(binding.lineage) && binding.lineage.length > 0, `${product}: lineage missing`)
}

assert.equal(registry.canonical_runtime, 'OMNII')
console.log(`runtime binding registry: PASS (${requiredProducts.length} products)`)
