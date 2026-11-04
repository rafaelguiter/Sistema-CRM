import { z } from 'zod'
import { customerStatuses } from './types.ts'

export const customerSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome completo do cliente.'),
  email: z
    .string()
    .trim()
    .min(1, 'Informe o e-mail do cliente.')
    .email('Digite um e-mail válido, como exemplo@email.com.'),
  phone: z.string().optional(),
  company: z.string().trim().optional(),
  status: z.enum(customerStatuses),
  tags: z.array(z.string().trim().min(1)).default([]),
})

export type CustomerFormValues = z.input<typeof customerSchema>
