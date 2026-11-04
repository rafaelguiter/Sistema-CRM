import { useState } from 'react'
import { Building2, CheckCircle2, UserRoundPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { CustomerForm } from './components/CustomerForm'
import { localCustomerService } from './customer-service'
import type { CustomerInput } from './types'

export function NewCustomerPage() {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [submitError, setSubmitError] = useState('')

  async function createCustomer(values: CustomerInput) {
    setIsSaving(true)
    setSuccess('')
    setSubmitError('')
    try {
      const customer = await localCustomerService.create(values)
      setSuccess(`${customer.name} foi cadastrado com sucesso.`)
    } catch {
      setSubmitError(
        'Não foi possível salvar o cliente agora. Tente novamente.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AppShell
      title="Cadastrar Cliente"
      description="Preencha as informações abaixo para adicionar um novo cliente ao CRM."
    >
      <div className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-6 flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-100 text-indigo-600 shadow-sm ring-1 ring-blue-100">
            <UserRoundPlus size={23} aria-hidden="true" />
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold tracking-[0.16em] text-violet-600">
              CLIENTES
            </p>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Novo cliente
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Registre os dados de contato e acompanhe o relacionamento
              comercial.
            </p>
          </div>
        </div>

        <section
          className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_12px_32px_-20px_rgba(30,41,59,0.25)] sm:p-8"
          aria-labelledby="customer-form-title"
        >
          <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">
            <Building2
              size={19}
              className="text-violet-600"
              aria-hidden="true"
            />
            <div>
              <h3
                id="customer-form-title"
                className="font-semibold text-slate-900"
              >
                Informações do cliente
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Campos com informações de contato e qualificação.
              </p>
            </div>
          </div>
          {success && (
            <div
              role="status"
              className="mb-6 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4 text-sm leading-relaxed text-green-800"
            >
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{success}</span>
            </div>
          )}
          {submitError && (
            <p
              role="alert"
              className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
            >
              {submitError}
            </p>
          )}
          <CustomerForm
            isSaving={isSaving}
            onSubmit={createCustomer}
            onCancel={() => navigate('/clientes')}
          />
        </section>
      </div>
    </AppShell>
  )
}
