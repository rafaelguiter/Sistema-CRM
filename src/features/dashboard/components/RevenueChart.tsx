import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '../../../components/ui/card'
import { money } from '../../../lib/formatters'
import type { SeriesPoint } from '../types'
export function RevenueChart({ series }: { series: SeriesPoint[] }) {
  return (
    <Card className="chart-card revenue">
      <div className="card-title">
        <div>
          <h3>Evolução da receita</h3>
          <p>Comparativo com o período anterior</p>
        </div>
        <div className="legend">
          <span>
            <i className="now" />
            Período atual
          </span>
          <span>
            <i />
            Período anterior
          </span>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={series}
            margin={{ top: 12, right: 4, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="income" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity=".23" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#e9eef5" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#7a879b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickFormatter={(v) => `R$ ${v / 1000}k`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#7a879b', fontSize: 11 }}
            />
            <Tooltip
              formatter={(value) => [money.format(Number(value ?? 0)), '']}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e5eaf1',
                boxShadow: '0 8px 24px #0f172a12',
              }}
            />
            <Area
              type="monotone"
              dataKey="anterior"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="receita"
              stroke="#2563eb"
              strokeWidth={2.6}
              fill="url(#income)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
