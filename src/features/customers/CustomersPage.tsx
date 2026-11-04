import { useEffect, useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/button'
import { readCustomers } from './customer-storage'
import type { Customer } from './types'

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  useEffect(() => {
    try {
      setCustomers(readCustomers(localStorage))
    } catch {
      setCustomers([])
    }
  }, [])
  return (
    <AppShell
      title="Clientes"
      description="Gerencie os clientes cadastrados no seu CRM."
      actions={
        <Link to="/clientes/novo">
          <Button className="h-10 bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-100">
            <Plus size={17} /> Novo cliente
          </Button>
        </Link>
      }
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
        <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
            <div>
              <h2 className="font-semibold text-slate-900">
                Clientes cadastrados
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Dados salvos neste navegador para demonstração.
              </p>
            </div>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              {customers.length}{' '}
              {customers.length === 1 ? 'cliente' : 'clientes'}
            </span>
          </div>
          {customers.length ? (
            <ul className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <li
                  key={customer.id}
                  className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {customer.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {customer.email}
                      {customer.company ? ` · ${customer.company}` : ''}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {customer.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid place-items-center px-6 py-16 text-center">
              <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Users size={22} />
              </div>
              <h3 className="font-semibold text-slate-900">
                Ainda não há clientes cadastrados
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                Comece adicionando as informações do primeiro cliente ao CRM.
              </p>
              <Link to="/clientes/novo" className="mt-5">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus size={17} /> Cadastrar cliente
                </Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  )
}
