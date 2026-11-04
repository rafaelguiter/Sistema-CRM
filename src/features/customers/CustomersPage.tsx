import { useMemo, useState } from 'react'
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { initializeDemo } from './demo-storage'
import { customerStatuses, type Customer, type CustomerStatus } from './types'
import { StatusBadge } from './components/StatusBadge'

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
const statusButton: Record<CustomerStatus, string> = {
  Lead: 'text-blue-700',
  Proposta: 'text-yellow-700',
  Cliente: 'text-green-700',
  Inativo: 'text-slate-600',
}

export function CustomersPage() {
  const [customers] = useState<Customer[]>(initializeDemo)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<CustomerStatus | 'Todos'>('Todos')
  const [ascending, setAscending] = useState(true)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const counts = useMemo(
    () =>
      Object.fromEntries(
        customerStatuses.map((item) => [
          item,
          customers.filter((customer) => customer.status === item).length,
        ]),
      ),
    [customers],
  ) as Record<CustomerStatus, number>
  const found = useMemo(
    () =>
      customers
        .filter(
          (customer) =>
            (status === 'Todos' || customer.status === status) &&
            `${customer.name} ${customer.company} ${customer.email} ${customer.phone}`
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()),
        )
        .sort((a, b) =>
          ascending
            ? a.name.localeCompare(b.name, 'pt-BR')
            : b.name.localeCompare(a.name, 'pt-BR'),
        ),
    [customers, search, status, ascending],
  )
  const pages = Math.max(1, Math.ceil(found.length / perPage))
  const visible = found.slice(
    (Math.min(page, pages) - 1) * perPage,
    Math.min(page, pages) * perPage,
  )
  function chooseStatus(next: CustomerStatus | 'Todos') {
    setStatus(next)
    setPage(1)
  }
  return (
    <AppShell
      title="Clientes"
      description="Gerencie e acompanhe seus clientes e oportunidades."
      actions={
        <Link to="/clientes/novo">
          <Button className="h-10 bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-100">
            <Plus size={17} /> Novo Cliente
          </Button>
        </Link>
      }
    >
      <div className="mx-auto w-full max-w-7xl space-y-5 px-5 py-8 sm:px-8 lg:py-10">
        <section className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
          <div className="relative">
            <Search
              className="absolute top-3.5 left-4 text-slate-400"
              size={18}
            />
            <Input
              className="pl-11"
              placeholder="Buscar por nome, empresa, e-mail ou telefone..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant={status === 'Todos' ? 'default' : 'ghost'}
              className={
                status === 'Todos'
                  ? 'h-9 bg-violet-600 hover:bg-violet-700'
                  : 'h-9 border border-slate-200'
              }
              onClick={() => chooseStatus('Todos')}
            >
              Todos <span className="opacity-70">{customers.length}</span>
            </Button>
            {customerStatuses.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={`h-9 border border-slate-200 ${status === item ? `${statusButton[item]} bg-slate-50 ring-2 ring-current/20` : statusButton[item]}`}
                onClick={() => chooseStatus(item)}
              >
                {item} <span className="opacity-70">{counts[item]}</span>
              </Button>
            ))}
          </div>
        </section>
        <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <p className="text-sm text-slate-500">
              <b className="text-slate-800">{found.length}</b> clientes
              encontrados
            </p>
            <Button
              variant="ghost"
              className="h-9 border border-slate-200"
              onClick={() => setAscending(!ascending)}
            >
              {ascending ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />}{' '}
              Nome
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  {[
                    'Nome',
                    'Empresa',
                    'E-mail',
                    'Telefone',
                    'Status',
                    'Ações',
                  ].map((column) => (
                    <th className="px-5 py-3" key={column}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t border-slate-100 transition-colors hover:bg-blue-50/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-xs font-bold text-indigo-700">
                          {initials(customer.name)}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {customer.company || '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {customer.email}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {customer.phone || '—'}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        className="font-semibold text-blue-600 hover:text-violet-700"
                        to={`/clientes/${customer.id}`}
                      >
                        Ver Perfil
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!visible.length && (
              <div className="py-16 text-center text-sm text-slate-500">
                Nenhum cliente foi encontrado com os filtros selecionados.
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="text-sm text-slate-500">
              Exibir{' '}
              <select
                className="mx-2 rounded-lg border border-slate-200 px-2 py-1"
                value={perPage}
                onChange={(event) => {
                  setPerPage(Number(event.target.value))
                  setPage(1)
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>{' '}
              por página
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="border border-slate-200"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                aria-label="Página anterior"
              >
                <ChevronLeft size={17} />
              </Button>
              <span className="text-sm text-slate-600">
                Página {Math.min(page, pages)} de {pages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="border border-slate-200"
                disabled={page >= pages}
                onClick={() => setPage(page + 1)}
                aria-label="Próxima página"
              >
                <ChevronRight size={17} />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
