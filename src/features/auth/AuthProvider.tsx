import { createContext, useContext, useState, type ReactNode } from 'react'
import { mockAuthService } from './auth-service'
import { readDemoSession, saveDemoSession } from './session-storage'
import type { DemoSession, LoginCredentials } from './types'

interface AuthContextValue {
  session: DemoSession | null
  signIn: (credentials: LoginCredentials) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function restoreSession() {
  try {
    return readDemoSession(window.localStorage, window.sessionStorage)
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(restoreSession)

  async function signIn(credentials: LoginCredentials) {
    const nextSession = await mockAuthService.signIn(credentials)
    try {
      saveDemoSession(
        nextSession,
        credentials.remember,
        window.localStorage,
        window.sessionStorage,
      )
    } catch {
      // Sem armazenamento disponível, a demonstração funciona até recarregar a página.
    }
    setSession(nextSession)
  }

  return (
    <AuthContext.Provider value={{ session, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  return context
}
