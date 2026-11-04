import type { LoginCredentials, LoginErrors } from './types'

export function validateLogin({
  email,
  password,
}: Pick<LoginCredentials, 'email' | 'password'>): LoginErrors {
  const errors: LoginErrors = {}
  const normalizedEmail = email.trim()

  if (!normalizedEmail) {
    errors.email = 'Informe seu e-mail para continuar.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    errors.email = 'Digite um e-mail válido, como seu@email.com.'
  }

  if (!password.trim()) {
    errors.password = 'Informe sua senha para continuar.'
  }

  return errors
}
