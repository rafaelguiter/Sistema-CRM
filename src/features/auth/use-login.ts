import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { validateLogin } from './validation'
import type { LoginCredentials, LoginErrors } from './types'

export function useLogin() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [values, setValues] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitting = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  function updateField<K extends keyof LoginCredentials>(
    field: K,
    value: LoginCredentials[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }))
    if (field !== 'remember')
      setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitError('')
  }

  function validateField(field: 'email' | 'password') {
    setErrors((current) => ({
      ...current,
      [field]: validateLogin(values)[field],
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    setSubmitError('')

    if (Object.keys(nextErrors).length) {
      const firstField = nextErrors.email ? 'email' : 'password'
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${firstField}"]`)
        ?.focus()
      return
    }

    submitting.current = true
    setIsSubmitting(true)
    try {
      await signIn(values)
      navigate('/dashboard', { replace: true })
    } catch {
      setSubmitError('Não foi possível entrar agora. Tente novamente.')
    } finally {
      submitting.current = false
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    formRef,
    updateField,
    validateField,
    handleSubmit,
  }
}
