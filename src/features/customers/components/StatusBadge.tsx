import { cn } from '@/lib/utils'
import type { CustomerStatus } from '../types'

const styles: Record<CustomerStatus, string> = {
  Lead: 'bg-blue-50 text-blue-700 ring-blue-100',
  Proposta: 'bg-yellow-50 text-yellow-700 ring-yellow-100',
  Cliente: 'bg-green-50 text-green-700 ring-green-100',
  Inativo: 'bg-slate-100 text-slate-600 ring-slate-200',
}

export function StatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1',
        styles[status],
      )}
    >
      {status}
    </span>
  )
}
