import type { DemoSession } from './types'

export const DEMO_SESSION_KEY = 'autenticflow.demo-session'

/** Usa apenas o e-mail. Senhas nunca são persistidas. */
export function saveDemoSession(
  session: DemoSession,
  remember: boolean,
  persistent: Storage,
  temporary: Storage,
) {
  persistent.removeItem(DEMO_SESSION_KEY)
  temporary.removeItem(DEMO_SESSION_KEY)
  const storage = remember ? persistent : temporary
  storage.setItem(DEMO_SESSION_KEY, JSON.stringify({ email: session.email }))
}

export function readDemoSession(
  persistent: Storage,
  temporary: Storage,
): DemoSession | null {
  for (const storage of [temporary, persistent]) {
    try {
      const value: unknown = JSON.parse(
        storage.getItem(DEMO_SESSION_KEY) ?? 'null',
      )
      if (
        value &&
        typeof value === 'object' &&
        'email' in value &&
        typeof value.email === 'string' &&
        value.email.trim()
      ) {
        return { email: value.email }
      }
    } catch {
      // Dados inválidos ou armazenamento bloqueado não impedem abrir o login.
    }
  }
  return null
}
