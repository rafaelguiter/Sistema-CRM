import type { Customer } from '../customers/types'
import type { Activity, Snapshot } from './types'
export function dashboardFromCustomers(customers: Customer[]): {
  snapshot: Snapshot
  activities: Activity[]
} {
  const leads = customers.filter((c) => c.status === 'Lead').length,
    converted = customers.filter((c) => c.status === 'Cliente').length
  const revenue = customers
    .filter((c) => c.status === 'Cliente')
    .reduce((s, c) => s + (c.saleValue || 0), 0)
  return {
    snapshot: {
      receita: revenue,
      receitaDelta: 12,
      potential: customers.filter(
        (c) => c.status === 'Lead' || c.status === 'Proposta',
      ).length,
      potentialDelta: 8,
      leadsDelta: 10,
      series: [
        {
          label: 'Atual',
          receita: revenue,
          anterior: Math.round(revenue * 0.88),
          leads,
          convertidos: converted,
        },
      ],
    },
    activities: customers.slice(0, 6).map((c) => ({
      kind: c.status === 'Cliente' ? 'sale' : 'lead',
      title:
        c.status === 'Cliente' ? 'Venda concluída' : 'Novo contato cadastrado',
      subject: c.name,
      time: new Date(c.lastInteraction || c.createdAt).toLocaleDateString(
        'pt-BR',
      ),
      user: c.owner || 'Equipe comercial',
    })),
  }
}
