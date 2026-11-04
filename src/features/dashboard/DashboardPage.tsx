import { MoreHorizontal } from 'lucide-react'
import { AppShell } from '../../components/layout/AppShell'
import { ActivityFeed } from './components/ActivityFeed'
import { KpiGrid } from './components/KpiGrid'
import { LeadsChart } from './components/LeadsChart'
import { PeriodFilter } from './components/PeriodFilter'
import { RevenueChart } from './components/RevenueChart'
import { useDashboard } from './use-dashboard'
export function DashboardPage() {
  const { period, setPeriod, snapshot, activities } = useDashboard()
  return (
    <AppShell
      title="Dashboard"
      description="Acompanhe o desempenho do seu processo comercial."
      actions={<PeriodFilter period={period} onChange={setPeriod} />}
    >
      <div className="dashboard-body">
        <div className="welcome">
          <div>
            <p className="eyebrow">VISÃO GERAL</p>
            <h2>
              Olá, Rafael <span>👋</span>
            </h2>
            <p>Aqui está o resumo das suas vendas e oportunidades.</p>
          </div>
          <button className="ghost-action">
            <MoreHorizontal size={19} />
          </button>
        </div>
        <KpiGrid data={snapshot} />
        <div className="charts">
          <RevenueChart series={snapshot.series} />
          <LeadsChart series={snapshot.series} />
        </div>
        <ActivityFeed activities={activities} />
      </div>
    </AppShell>
  )
}
