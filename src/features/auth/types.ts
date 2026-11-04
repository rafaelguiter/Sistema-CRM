export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}

export type LoginErrors = Partial<Record<'email' | 'password', string>>

/** Identificação apenas para navegação na demonstração; não é um token. */
export interface DemoSession {
  email: string
}

export interface AuthService {
  signIn(credentials: LoginCredentials): Promise<DemoSession>
}
