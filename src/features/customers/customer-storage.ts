import type { Customer } from './types'

export const CUSTOMERS_STORAGE_KEY = 'autenticflow.customers'

export function readCustomers(storage: Storage): Customer[] {
  try {
    const result: unknown = JSON.parse(
      storage.getItem(CUSTOMERS_STORAGE_KEY) ?? '[]',
    )
    if (!Array.isArray(result)) return []
    return result.filter(isCustomer)
  } catch {
    return []
  }
}

export function saveCustomer(customer: Customer, storage: Storage) {
  const customers = readCustomers(storage)
  storage.setItem(
    CUSTOMERS_STORAGE_KEY,
    JSON.stringify([customer, ...customers]),
  )
}

function isCustomer(value: unknown): value is Customer {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'id' in value &&
    'name' in value &&
    'email' in value &&
    'status' in value &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    typeof value.status === 'string',
  )
}
