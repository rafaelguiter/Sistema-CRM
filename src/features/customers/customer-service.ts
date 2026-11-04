import { saveCustomer } from './customer-storage'
import type { Customer, CustomerInput } from './types'

export interface CustomerService {
  create(input: CustomerInput): Promise<Customer>
}

/** Adaptador local temporário. Substitua por uma chamada REST ao integrar a API. */
export const localCustomerService: CustomerService = {
  async create(input) {
    await new Promise<void>((resolve) => window.setTimeout(resolve, 700))
    const customer: Customer = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim(),
      company: input.company?.trim(),
      status: input.status,
    }
    localStorage && saveCustomer(customer, localStorage)
    return customer
  },
}
