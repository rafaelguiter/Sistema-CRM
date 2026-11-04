import { useState } from 'react'
import { activities, dashboardMocks } from './data'
import type { PeriodKey } from './types'

/** Ponto de acesso da tela aos mocks; a integração futura pode ocorrer aqui. */
export function useDashboard() {
  const [period, setPeriod] = useState<PeriodKey>('30d')
  const snapshot = dashboardMocks[period]

  return {
    period,
    setPeriod,
    snapshot,
    activities,
  }
}
