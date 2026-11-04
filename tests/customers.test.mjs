import assert from 'node:assert/strict'
import test from 'node:test'
import { customerSchema } from '../src/features/customers/customer-schema.ts'
import {
  CUSTOMERS_STORAGE_KEY,
  readCustomers,
  saveCustomer,
} from '../src/features/customers/customer-storage.ts'
import { formatBrazilianPhone } from '../src/features/customers/phone.ts'

function memoryStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }
}

test('cliente exige nome, e-mail válido e status permitido', () => {
  const result = customerSchema.safeParse({
    name: ' ',
    email: 'invalido',
    status: 'Outro',
  })
  assert.equal(result.success, false)
  assert.deepEqual(
    result.error.issues.map((issue) => issue.path[0]),
    ['name', 'email', 'status'],
  )
})

test('cliente aceita opcionais vazios e usa Lead como status válido', () => {
  const customer = customerSchema.parse({
    name: ' Ana Souza ',
    email: ' ana@exemplo.com ',
    phone: '',
    company: '',
    status: 'Lead',
  })
  assert.equal(customer.name, 'Ana Souza')
  assert.equal(customer.email, 'ana@exemplo.com')
  assert.equal(customer.status, 'Lead')
})

test('formata telefone brasileiro até onze dígitos', () => {
  assert.equal(formatBrazilianPhone('11987654321'), '(11) 98765-4321')
  assert.equal(formatBrazilianPhone('1134567890'), '(11) 3456-7890')
  assert.equal(formatBrazilianPhone('11a9876543219'), '(11) 98765-4321')
})

test('armazenamento preserva clientes válidos e ignora dados corrompidos', () => {
  const storage = memoryStorage()
  const customer = {
    id: '1',
    name: 'Ana',
    email: 'ana@exemplo.com',
    status: 'Cliente',
    createdAt: '2026-01-01T00:00:00.000Z',
  }
  saveCustomer(customer, storage)
  assert.deepEqual(readCustomers(storage), [customer])
  storage.setItem(CUSTOMERS_STORAGE_KEY, '{')
  assert.deepEqual(readCustomers(storage), [])
})
