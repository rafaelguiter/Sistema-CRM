# Arquitetura do AutenticFlow

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 para estilos e tokens visuais
- Componentes no padrão shadcn/ui em `src/components/ui`
- Lucide React para ícones
- Recharts para visualizações

## Estrutura atual

```
src/
  components/
    ui/             # primitivas reutilizáveis (Card e futuras peças shadcn)
  data/
    dashboard.ts    # contratos e mocks do Dashboard
  lib/
    utils.ts        # utilitário cn() para classes Tailwind
  main.tsx          # composição da tela Dashboard
  styles.css        # sistema visual e responsividade
```

## Como executar

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
corepack pnpm build
```

## Estado e dados

`dashboardMocks` em `src/data/dashboard.ts` é a camada de dados temporária. Ao integrar a API, mantenha os tipos `PeriodKey`, `SeriesPoint` e `Snapshot` e substitua a origem dos dados por um serviço em `src/services/`.

## Próximos módulos sugeridos

1. Criar layout compartilhado (`AppShell`) e rotas.
2. Implementar Leads e Clientes usando a mesma camada de serviços.
3. Adicionar Oportunidades e o Funil de Vendas.
4. Conectar autenticação e API, preservando contratos de domínio.

## Histórico de atualizações

- 2026-11-04: criado Dashboard inicial responsivo, com KPIs, gráficos, timeline e filtros simulados.
- 2026-11-04: dependências instaladas e registradas em `pnpm-lock.yaml`; adicionados tipos de React, React DOM, Node e Vite, inicialização do React e ajuste de tipagem do tooltip. Build de produção validado, mantendo o escopo do Dashboard com mocks.

Registre aqui cada alteração estrutural ou decisão técnica para facilitar a continuidade do trabalho.
