export const customerStatuses = [
  'Lead',
  'Proposta',
  'Cliente',
  'Inativo',
] as const

export type CustomerStatus = (typeof customerStatuses)[number]

export interface CustomerInput {
  name: string
  email: string
  phone?: string
  company?: string
  status: CustomerStatus
  tags?: string[]
}

export interface Customer extends CustomerInput {
  id: string
  createdAt: string
  lastInteraction?: string
  owner?: string
  saleValue?: number
}
