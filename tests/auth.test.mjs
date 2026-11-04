import assert from 'node:assert/strict'
import test from 'node:test'
import { validateLogin } from '../src/features/auth/validation.ts'
import {
  DEMO_SESSION_KEY,
  readDemoSession,
  saveDemoSession,
} from '../src/features/auth/session-storage.ts'

function memoryStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
}

test('login exige e-mail e senha, inclusive quando há apenas espaços', () => {
  assert.deepEqual(Object.keys(validateLogin({ email: ' ', password: ' ' })), [
    'email',
    'password',
  ])
})

test('login rejeita formatos inválidos e aceita e-mail com espaços externos', () => {
  for (const email of [
    'sem-arroba',
    'nome@',
    '@dominio.com',
    'nome@dominio',
    'nome sobrenome@dominio.com',
  ]) {
    assert.ok(validateLogin({ email, password: 'teste' }).email)
  }
  assert.deepEqual(
    validateLogin({ email: ' nome+teste@dominio.com.br ', password: 'teste' }),
    {},
  )
})

test('sessão sem lembrar de mim usa somente armazenamento temporário', () => {
  const persistent = memoryStorage()
  const temporary = memoryStorage()
  const session = { email: 'teste@exemplo.com', password: 'nunca-armazenar' }
  saveDemoSession(session, false, persistent, temporary)
  assert.equal(persistent.getItem(DEMO_SESSION_KEY), null)
  assert.deepEqual(JSON.parse(temporary.getItem(DEMO_SESSION_KEY)), {
    email: session.email,
  })
  assert.deepEqual(readDemoSession(persistent, temporary), {
    email: session.email,
  })
})

test('lembrar de mim persiste a sessão e remove a preferência anterior', () => {
  const persistent = memoryStorage()
  const temporary = memoryStorage()
  const session = { email: 'teste@exemplo.com' }
  saveDemoSession(session, false, persistent, temporary)
  saveDemoSession(session, true, persistent, temporary)
  assert.equal(temporary.getItem(DEMO_SESSION_KEY), null)
  assert.deepEqual(readDemoSession(persistent, memoryStorage()), session)
  saveDemoSession(session, false, persistent, temporary)
  assert.equal(persistent.getItem(DEMO_SESSION_KEY), null)
})

test('dados inválidos no armazenamento não quebram a abertura do login', () => {
  for (const stored of [
    '{',
    'null',
    '{}',
    '"texto"',
    '{"email":42}',
    '{"email":""}',
  ]) {
    const storage = memoryStorage()
    storage.setItem(DEMO_SESSION_KEY, stored)
    assert.equal(readDemoSession(storage, memoryStorage()), null)
  }
  assert.equal(
    readDemoSession(
      {
        getItem() {
          throw new Error('Bloqueado')
        },
      },
      memoryStorage(),
    ),
    null,
  )
})
