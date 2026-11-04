import type { AuthService } from './types'
import { validateLogin } from './validation'

/** Substitua este adaptador pela API futura. Nenhuma credencial é enviada. */
export const mockAuthService: AuthService = {
  async signIn(credentials) {
    if (Object.keys(validateLogin(credentials)).length > 0) {
      throw new Error('Confira os campos e tente novamente.')
    }

    await new Promise<void>((resolve) => window.setTimeout(resolve, 900))
    return { email: credentials.email.trim().toLowerCase() }
  },
}
