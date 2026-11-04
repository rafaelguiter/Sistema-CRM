import type { Customer } from './types'
export function createDemoCustomers(now = new Date()): Customer[] {
  const names = [
    'Ana',
    'Bruno',
    'Carla',
    'Diego',
    'Elisa',
    'Felipe',
    'Gabriela',
    'Henrique',
    'Isabela',
    'João',
    'Larissa',
    'Marcos',
    'Natália',
    'Paulo',
    'Renata',
  ]
  const surnames = [
    'Silva',
    'Costa',
    'Almeida',
    'Oliveira',
    'Santos',
    'Pereira',
    'Lima',
    'Ribeiro',
    'Souza',
    'Martins',
  ]
  return Array.from({ length: 150 }, (_, i) => {
    const created = new Date(now)
    created.setDate(
      created.getDate() - Math.floor((((i * 73) % 150) * 364) / 150),
    )
    return {
      id: `demo-${i + 1}`,
      name: `${names[i % 15]} ${surnames[Math.floor(i / 15)]}`,
      email: `contato${i + 1}@empresa.example`,
      phone: `(${[11, 21, 31, 41, 51, 61, 71, 81][i % 8]}) 00000-${String(i + 1).padStart(4, '0')}`,
      company: `Horizonte ${i + 1} Soluções Fictícias`,
      status:
        i < 60 ? 'Lead' : i < 95 ? 'Proposta' : i < 135 ? 'Cliente' : 'Inativo',
      createdAt: created.toISOString(),
      lastInteraction: created.toISOString(),
      owner: ['Ana Duarte', 'Carlos Nunes', 'Marina Alves'][i % 3],
      saleValue: 1500 + ((i * 791) % 29000),
      tags: [
        ['Novo Cliente', 'Interessado'],
        ['VIP'],
        ['Prioritário'],
        ['Follow-up'],
        ['Renovação'],
      ][i % 5],
    }
  })
}
