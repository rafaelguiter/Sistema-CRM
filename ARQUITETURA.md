# Arquitetura do AutenticFlow

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 para estilos e tokens visuais
- Componentes no padrão shadcn/ui em `src/components/ui`
- Lucide React para ícones
- Recharts para visualizações

## Estrutura atual

```text
src/
  main.tsx                     # inicialização do React e estilos
  App.tsx                      # composição da aplicação
  styles.css                   # base global e imports de estilos
  components/
    layout/
      AppShell.tsx             # estrutura e estado do menu móvel
      Header.tsx               # título, ações da página e perfil
      Sidebar.tsx              # navegação visual
      layout.css               # estilos e responsividade do layout
    ui/
      card.tsx                 # primitiva visual reutilizável
  features/
    dashboard/
      DashboardPage.tsx        # composição da tela
      components/             # indicadores, gráficos, atividades e filtro
      data.ts                  # mocks centralizados e períodos
      types.ts                 # contratos de domínio
      metrics.ts               # cálculos independentes de React
      use-dashboard.ts         # estado do filtro e acesso aos mocks
      dashboard.css            # estilos e responsividade da tela
  lib/
    formatters.ts              # moeda, números e percentuais pt-BR
    utils.ts                   # composição de classes com cn()
  vite-env.d.ts                # tipos de assets do Vite
tests/
  dashboard-metrics.test.mjs    # cálculos e casos sem leads
```

## Como executar

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
corepack pnpm build
```

## Estado e dados

`dashboardMocks` e `activities` em `src/features/dashboard/data.ts` são a origem temporária dos dados. Os contratos `PeriodKey`, `SeriesPoint`, `Snapshot` e `Activity` ficam em `types.ts`. O hook `useDashboard` controla o período e entrega os dados à página. Uma futura integração deve substituir o acesso aos mocks nesse ponto, preservando os contratos e sem levar chamadas de API para os componentes visuais.

## Regras de manutenção

- `main.tsx` apenas inicializa a aplicação; a composição de telas fica em `App.tsx`.
- `AppShell` recebe título, descrição, ações e conteúdo por props. Não conhece os dados do Dashboard e não implementa rotas nesta etapa.
- `DashboardPage` compõe a tela e conecta o estado aos componentes. Os componentes recebem dados e callbacks por props.
- Regras numéricas ficam em funções puras em `metrics.ts`; formatação compartilhada fica em `lib/formatters.ts`.
- Componentes de uso geral ficam em `components/`; componentes exclusivos do Dashboard ficam em `features/dashboard/components/`.
- Estilos globais, do layout e da tela ficam separados. As regras responsivas acompanham o arquivo correspondente; regras compartilhadas permanecem em `styles.css`.
- O alias `@/` aponta para `src/` no TypeScript e no Vite, compatível com `components.json`.
- Use Prettier para manter o código formatado. Ao alterar cálculos, atualize os testes em `tests/`.
- Execute `corepack pnpm test`, `corepack pnpm format:check` e `corepack pnpm build` antes de entregar alterações.

## Validação e limites

Os testes usam o executor nativo do Node.js com suporte a TypeScript sem transformação, validado no Node.js 24.18.0. Cobrem a conversão calculada pelo total de leads, períodos vazios e divisão por zero. O build verifica os tipos e gera o pacote de produção; ele não substitui a inspeção visual no navegador.

Esta reorganização preserva os mocks e as funcionalidades existentes. As inconsistências dos valores simulados e os controles ainda sem ação estão registrados no README.

## Próximos módulos sugeridos

1. Adicionar rotas ao layout compartilhado (`AppShell` já extraído).
2. Implementar Leads e Clientes usando a mesma camada de serviços.
3. Adicionar Oportunidades e o Funil de Vendas.
4. Conectar autenticação e API, preservando contratos de domínio.

## Histórico de atualizações

- 2026-11-04: criado Dashboard inicial responsivo, com KPIs, gráficos, timeline e filtros simulados.
- 2026-11-04: dependências instaladas e registradas em `pnpm-lock.yaml`; adicionados tipos de React, React DOM, Node e Vite, inicialização do React e ajuste de tipagem do tooltip. Build de produção validado, mantendo o escopo do Dashboard com mocks.

Registre aqui cada alteração estrutural ou decisão técnica para facilitar a continuidade do trabalho.

- 2026-11-04: Dashboard reorganizado por funcionalidade; extraídos layout compartilhado, componentes visuais, tipos, cálculos, hook de dados e estilos. Adicionados testes dos cálculos, Prettier e guia de manutenção, sem novos módulos.
