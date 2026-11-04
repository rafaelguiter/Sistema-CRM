import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  MoreHorizontal,
  TrendingUp,
  UserRoundPlus,
} from 'lucide-react'
import { Card } from '../../../components/ui/card'
import type { Activity, ActivityKind } from '../types'
const activityIcons = {
  lead: UserRoundPlus,
  opportunity: BriefcaseBusiness,
  sale: CircleDollarSign,
  move: TrendingUp,
  meeting: CalendarDays,
  customer: CheckCircle2,
} satisfies Record<ActivityKind, typeof UserRoundPlus>
function IconFor({ kind }: { kind: ActivityKind }) {
  const Icon = activityIcons[kind]
  return <Icon size={17} />
}
export function ActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <Card className="activities">
      <div className="card-title">
        <div>
          <h3>Últimas atividades</h3>
          <p>Acompanhe as movimentações recentes do seu CRM.</p>
        </div>
        <button className="all-button">
          Ver todas <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="timeline">
        {activities.map((a, index) => (
          <div className="activity" key={a.title + a.subject}>
            <div className="activity-icon">
              <IconFor kind={a.kind} />
            </div>
            {index < activities.length - 1 && <div className="line" />}
            <div className="activity-text">
              <p>
                {a.title}
                <strong> — {a.subject}</strong>
              </p>
              <span>
                {a.user} <b>•</b> {a.time}
              </span>
            </div>
            <button className="row-more">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}
