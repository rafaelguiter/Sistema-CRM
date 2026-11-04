import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateTotals } from '../src/features/dashboard/metrics.ts'

test('soma leads e convertidos de todo o período antes de calcular a conversão', () => {
  const totals = calculateTotals({
    series: [
      { leads: 10, convertidos: 5 },
      { leads: 90, convertidos: 15 },
    ],
  })

  assert.deepEqual(totals, { leads: 100, converted: 20, conversion: 20 })
})

test('período vazio tem totais zerados e conversão válida', () => {
  assert.deepEqual(calculateTotals({ series: [] }), {
    leads: 0,
    converted: 0,
    conversion: 0,
  })
})

test('pontos sem leads não causam divisão por zero', () => {
  assert.equal(
    calculateTotals({ series: [{ leads: 0, convertidos: 0 }] }).conversion,
    0,
  )
})
