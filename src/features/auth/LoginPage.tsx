import { useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Brand } from '@/components/Brand'
import { LoginForm } from './components/LoginForm'

export function LoginPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'AutenticFlow | Login'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="flex min-h-svh flex-col bg-white px-6 text-slate-900 sm:px-8">
      <header className="flex justify-center pt-10 sm:pt-14">
        <Brand />
      </header>

      <main
        className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-12 sm:py-16"
        aria-labelledby="login-title"
      >
        <div className="mb-9 text-center">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-emerald-700">
            SEU NEGÓCIO EM MOVIMENTO
          </p>
          <h1
            id="login-title"
            className="mb-3 text-[29px] leading-tight font-bold tracking-tight sm:text-[32px]"
          >
            Bem-vindo de volta!
          </h1>
          <p className="text-sm leading-relaxed text-slate-500">
            Entre na sua conta para acessar o AutenticFlow.
          </p>
        </div>

        <LoginForm />

        <aside
          className="mt-9 border-t border-slate-100 pt-6 text-center"
          aria-label="Acesso de demonstração"
        >
          <div className="mb-2 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
            <ShieldCheck size={14} aria-hidden="true" /> Ambiente de
            demonstração
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Use um e-mail válido e qualquer senha.
            <br />
            Nenhuma credencial será enviada a um servidor.
          </p>
        </aside>
      </main>

      <footer className="pb-7 text-center text-[11px] leading-relaxed text-slate-400">
        © {new Date().getFullYear()} AutenticFlow. Todos os direitos reservados.
      </footer>
    </div>
  )
}
