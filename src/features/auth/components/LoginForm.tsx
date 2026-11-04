import { useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from './PasswordInput'
import { useLogin } from '../use-login'

export function LoginForm() {
  const {
    values,
    errors,
    submitError,
    isSubmitting,
    formRef,
    updateField,
    validateField,
    handleSubmit,
  } = useLogin()
  const [showRecoveryNotice, setShowRecoveryNotice] = useState(false)

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="space-y-5"
    >
      <FormField id="email" label="E-mail" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={values.email}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          onChange={(event) => updateField('email', event.target.value)}
          onBlur={() => validateField('email')}
        />
      </FormField>

      <FormField id="password" label="Senha" error={errors.password}>
        <PasswordInput
          id="password"
          name="password"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          required
          value={values.password}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'password-error' : undefined}
          onChange={(event) => updateField('password', event.target.value)}
          onBlur={() => validateField('password')}
        />
      </FormField>

      <label className="flex w-fit cursor-pointer items-center gap-2.5 py-1 text-sm text-slate-600">
        <input
          type="checkbox"
          name="remember"
          checked={values.remember}
          disabled={isSubmitting}
          onChange={(event) => updateField('remember', event.target.checked)}
          className="size-4 cursor-pointer rounded border-slate-300 accent-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-emerald-600 disabled:cursor-not-allowed"
        />
        Lembrar de mim
      </label>

      {submitError && (
        <p
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"
        >
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        className="w-full shadow-sm shadow-emerald-900/10"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />{' '}
            Entrando...
          </>
        ) : (
          <>
            Entrar <ArrowRight size={17} aria-hidden="true" />
          </>
        )}
      </Button>
      <span role="status" className="sr-only">
        {isSubmitting ? 'Validando seus dados. Aguarde.' : ''}
      </span>

      <div className="text-center">
        <a
          href="#recuperacao"
          className="rounded text-sm font-medium text-slate-500 underline-offset-4 transition-colors hover:text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
          aria-controls="recovery-notice"
          aria-expanded={showRecoveryNotice}
          onClick={(event) => {
            event.preventDefault()
            setShowRecoveryNotice(true)
          }}
        >
          Esqueci minha senha
        </a>
      </div>
      {showRecoveryNotice && (
        <p
          id="recovery-notice"
          role="status"
          className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-center text-sm leading-relaxed text-blue-800"
        >
          A recuperação de senha estará disponível em uma próxima etapa. Para
          testar, use um e-mail válido e qualquer senha.
        </p>
      )}
    </form>
  )
}
