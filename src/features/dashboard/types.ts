export type PeriodKey = '7d' | '30d' | '90d' | '12m'

export interface SeriesPoint {
  label: string
  receita: number
  anterior: number
  leads: number
  convertidos: number
}

export interface Snapshot {
  receita: number
  receitaDelta: number
  potential: number
  potentialDelta: number
  leadsDelta: number
  series: SeriesPoint[]
}

export type ActivityKind =
  'lead' | 'opportunity' | 'sale' | 'move' | 'meeting' | 'customer'

export interface Activity {
  kind: ActivityKind
  title: string
  subject: string
  time: string
  user: string
}
