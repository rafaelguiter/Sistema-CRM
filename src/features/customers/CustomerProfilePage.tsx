import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Mail, Phone, Tag, UserRound } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { initializeDemo } from './demo-storage'
import { StatusBadge } from './components/StatusBadge'

export function CustomerProfilePage() {
  const { id } = useParams()
  const customer = initializeDemo().find((item) => item.id === id)
  if (!customer)
    return (
      <AppShell
        title="Cliente não encontrado"
        description="Este cliente não está disponível na base local."
      >
        <div className="p-8">
          <Link className="text-blue-600" to="/clientes">
            Voltar para Clientes
          </Link>
        </div>
      </AppShell>
    )
  return (
    <AppShell
      title="Perfil do Cliente"
      description="Informações cadastradas e contexto comercial."
    >
      <div className="mx-auto max-w-4xl p-5 sm:p-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          to="/clientes"
        >
          <ArrowLeft size={16} /> Voltar para Clientes
        </Link>
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 text-indigo-700">
                <UserRound />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {customer.name}
                </h2>
                <p className="mt-1 text-slate-500">
                  {customer.company || 'Sem empresa informada'}
                </p>
              </div>
            </div>
            <StatusBadge status={customer.status} />
          </div>
          <dl className="mt-8 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2">
            {[
              [Mail, 'E-mail', customer.email],
              [Phone, 'Telefone', customer.phone || 'Não informado'],
              [Building2, 'Empresa', customer.company || 'Não informada'],
              [UserRound, 'Responsável', customer.owner || 'Não atribuído'],
            ].map(([Icon, label, value]) => {
              const Lucide = Icon as typeof Mail
              return (
                <div key={label as string} className="flex gap-3">
                  <Lucide className="text-violet-600" size={18} />
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-400">
                      {label as string}
                    </dt>
                    <dd className="mt-1 text-slate-700">{value as string}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
          <div className="mt-7 border-t border-slate-100 pt-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Tag size={16} className="text-violet-600" /> Tags
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {customer.tags?.length ? (
                customer.tags.map((tag) => (
                  <span
                    className="rounded-full bg-violet-50 px-3 py-1 text-sm text-violet-700"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">
                  Nenhuma tag cadastrada.
                </span>
              )}
            </div>
          </div>
          <div className="mt-7 border-t border-slate-100 pt-6 text-sm text-slate-500">
            <b className="text-slate-700">Próximas evoluções:</b> histórico de
            atividades e oportunidades comerciais serão exibidos aqui.
          </div>
        </section>
      </div>
    </AppShell>
  )
}
