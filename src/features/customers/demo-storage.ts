import { createDemoCustomers } from './demo'
import { CUSTOMERS_STORAGE_KEY, readCustomers } from './customer-storage'
export function initializeDemo() {
  if (!localStorage.getItem('autenticflow.demo-seeded')) {
    const existing = readCustomers(localStorage)
    localStorage.setItem(
      CUSTOMERS_STORAGE_KEY,
      JSON.stringify([...createDemoCustomers(), ...existing]),
    )
    localStorage.setItem('autenticflow.demo-seeded', '1')
  }
  return readCustomers(localStorage)
}
