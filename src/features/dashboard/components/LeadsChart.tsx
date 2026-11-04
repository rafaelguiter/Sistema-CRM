import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MoreHorizontal } from 'lucide-react'
import { Card } from '../../../components/ui/card'
import type { SeriesPoint } from '../types'
export function LeadsChart({ series }: { series: SeriesPoint[] }) {
  return (
    <Card className="chart-card leads">
      <div className="card-title">
        <div>
          <h3>Leads e conversões</h3>
          <p>Resultados por período</p>
        </div>
        <button className="more">
          <MoreHorizontal size={19} />
        </button>
      </div>
      <div className="small-legend">
        <span>
          <i className="lead-dot" />
          Leads
        </span>
        <span>
          <i className="convert-dot" />
          Convertidos
        </span>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={series}
            margin={{ top: 6, right: 0, left: -22, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid vertical={false} stroke="#edf1f6" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#7a879b', fontSize: 11 }}
              dy={9}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#7a879b', fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: '#f5f8fc' }}
              contentStyle={{ borderRadius: 12, border: '1px solid #e5eaf1' }}
            />
            <Bar
              dataKey="leads"
              fill="#bfdbfe"
              radius={[5, 5, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="convertidos"
              fill="#2563eb"
              radius={[5, 5, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
