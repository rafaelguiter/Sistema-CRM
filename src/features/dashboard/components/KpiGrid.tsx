import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  Target,
  Users,
  UserRoundPlus,
} from 'lucide-react'
import { Card } from '../../../components/ui/card'
import { cn } from '../../../lib/utils'
import { money, number, percentage } from '../../../lib/formatters'
import { calculateTotals } from '../metrics'
import type { Snapshot } from '../types'

function Delta({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const good = value >= 0
  return (
    <span className={cn('delta', good ? 'positive' : 'negative')}>
      {good ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{' '}
      {Math.abs(value).toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
function MiniLine({ data }: { data: number[] }) {
  const maximum = Math.max(...data)
  const minimum = Math.min(...data)
  const width = 88
  const height = 31
  const points = data
    .map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width
      const y =
        height -
        4 -
        ((value - minimum) / (maximum - minimum || 1)) * (height - 9)
      return `${x},${y}`
    })
    .join(' ')
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mini-line"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function KpiGrid({ data }: { data: Snapshot }) {
  const totals = calculateTotals(data)
  const kpis = [
    {
      title: 'Receita total',
      value: money.format(data.receita),
      change: data.receitaDelta,
      icon: CircleDollarSign,
      color: 'blue',
      trend: data.series.map((x) => x.receita),
    },
    {
      title: 'Taxa de conversão',
      value: `${percentage.format(totals.conversion)}%`,
      change: 1.8,
      suffix: ' p.p.',
      icon: Target,
      color: 'violet',
      trend: data.series.map((x) => x.convertidos),
    },
    {
      title: 'Clientes em potencial',
      value: number.format(data.potential),
      change: data.potentialDelta,
      icon: Users,
      color: 'amber',
      trend: data.series.map((x) => x.leads),
    },
    {
      title: 'Total de leads',
      value: number.format(totals.leads),
      change: data.leadsDelta,
      icon: UserRoundPlus,
      color: 'cyan',
      trend: data.series.map((x) => x.leads),
    },
  ]
  return (
    <div className="kpi-grid">
      {kpis.map(
        ({ title, value, change, icon: Icon, color, trend, suffix }) => (
          <Card className="kpi" key={title}>
            <div className="kpi-head">
              <div className={cn('kpi-icon', color)}>
                <Icon size={20} />
              </div>
              <Delta value={change} suffix={suffix} />
            </div>
            <p>{title}</p>
            <h3>{value}</h3>
            <div className="kpi-foot">
              <span>vs. período anterior</span>
              <MiniLine data={trend} />
            </div>
          </Card>
        ),
      )}
    </div>
  )
}
