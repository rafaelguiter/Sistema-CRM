import { CalendarDays, ChevronDown } from 'lucide-react'
import { periods } from '../data'
import type { PeriodKey } from '../types'
interface PeriodFilterProps {
  period: PeriodKey
  onChange: (period: PeriodKey) => void
}
export function PeriodFilter({ period, onChange }: PeriodFilterProps) {
  return (
    <div className="period-select">
      <CalendarDays size={17} />
      <select
        aria-label="Período do dashboard"
        value={period}
        onChange={(e) => onChange(e.target.value as PeriodKey)}
      >
        {periods.map((p) => (
          <option value={p.value} key={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <ChevronDown size={15} />
    </div>
  )
}
