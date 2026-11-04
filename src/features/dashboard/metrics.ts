import type { Snapshot } from './types'

/** Mantém os cálculos fora da apresentação e trata períodos sem leads. */
export function calculateTotals(snapshot: Snapshot) {
  const leads = snapshot.series.reduce((total, point) => total + point.leads, 0)
  const converted = snapshot.series.reduce(
    (total, point) => total + point.convertidos,
    0,
  )

  return {
    leads,
    converted,
    conversion: leads > 0 ? (converted / leads) * 100 : 0,
  }
}
