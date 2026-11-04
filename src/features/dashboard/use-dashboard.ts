import { useState } from 'react'
import { activities, dashboardMocks } from './data'
import { initializeDemo } from '../customers/demo-storage'
import { dashboardFromCustomers } from './from-customers'
import type { PeriodKey } from './types'

/** Ponto de acesso da tela aos mocks; a integração futura pode ocorrer aqui. */
export function useDashboard() {
  const [period, setPeriod] = useState<PeriodKey>('30d')
  const demo =
    typeof window === 'undefined'
      ? null
      : dashboardFromCustomers(initializeDemo())
  const snapshot = demo?.snapshot ?? dashboardMocks[period]

  return {
    period,
    setPeriod,
    snapshot,
    activities: demo?.activities ?? activities,
  }
}
