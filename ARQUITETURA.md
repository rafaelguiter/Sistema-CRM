# Arquitetura do AutenticFlow

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 para estilos e tokens visuais
- Componentes no padrão shadcn/ui em `src/components/ui`
- Lucide React para ícones
- Recharts para visualizações
- React Router para navegação entre Login e Dashboard
- Playwright para testes do fluxo no Chrome em desktop, tablet e celular
- React Hook Form e Zod para formulários e validação de clientes

## Estrutura atual

```text
src/
  main.tsx                     # inicialização do React e estilos
  App.tsx                      # rotas, provedor de sessão e Dashboard sob demanda
  styles.css                   # base global e imports de estilos
  components/
    Brand.tsx                  # marca reutilizável na tela de login
    layout/
      AppShell.tsx             # estrutura e estado do menu móvel
      Header.tsx               # título, ações da página e perfil
      Sidebar.tsx              # navegação visual
      layout.css               # estilos e responsividade do layout
    ui/
      card.tsx                 # primitiva visual reutilizável
      button.tsx               # botão com variantes no padrão shadcn/ui
      input.tsx                # campo com estados de foco, erro e desabilitado
      form-field.tsx           # rótulo e mensagem de erro acessível
  features/
    auth/
      LoginPage.tsx            # composição e layout responsivo do login
      components/             # LoginForm e PasswordInput
      AuthProvider.tsx         # estado e restauração da sessão simulada
      auth-service.ts          # adaptador assíncrono de autenticação simulada
      session-storage.ts       # persistência apenas do e-mail de demonstração
      types.ts                 # contratos de autenticação
      validation.ts            # validação pura de e-mail e senha
      use-login.ts             # estado, erros e envio do formulário
    dashboard/
      DashboardPage.tsx        # composição da tela
      components/             # indicadores, gráficos, atividades e filtro
      data.ts                  # mocks centralizados e períodos
      types.ts                 # contratos de domínio
      metrics.ts               # cálculos independentes de React
      use-dashboard.ts         # estado do filtro e acesso aos mocks
      dashboard.css            # estilos e responsividade da tela
    customers/
      NewCustomerPage.tsx      # tela de cadastro do cliente
      CustomersPage.tsx        # listagem local de demonstração
      components/CustomerForm.tsx # formulário reutilizável para criação e edição
      customer-schema.ts       # esquema Zod e valores do formulário
      customer-service.ts      # adaptador local assíncrono, futuro ponto da API REST
      customer-storage.ts      # armazenamento local de clientes
      phone.ts                 # máscara de telefone brasileiro
      types.ts                 # contratos Customer e CustomerInput
  lib/
    formatters.ts              # moeda, números e percentuais pt-BR
    utils.ts                   # composição de classes com cn()
  vite-env.d.ts                # tipos de assets do Vite
tests/
  auth.test.mjs                 # validação e persistência da sessão
  dashboard-metrics.test.mjs    # cálculos e casos sem leads
  e2e/login.spec.ts             # navegação, formulário e Dashboard no navegador
playwright.config.ts            # Chrome e dimensões de tela dos testes
```

## Como executar

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
corepack pnpm build
```

## Estado e dados

`dashboardMocks` e `activities` em `src/features/dashboard/data.ts` são a origem temporária dos dados. Os contratos `PeriodKey`, `SeriesPoint`, `Snapshot` e `Activity` ficam em `types.ts`. O hook `useDashboard` controla o período e entrega os dados à página. Uma futura integração deve substituir o acesso aos mocks nesse ponto, preservando os contratos e sem levar chamadas de API para os componentes visuais.

## Clientes locais

As rotas protegidas `/clientes` e `/clientes/novo` pertencem à funcionalidade `features/customers`. `CustomersPage` é uma listagem de demonstração necessária para a navegação do botão Cancelar e para confirmar os registros salvos localmente. A sidebar passou a usar `NavLink` apenas nos destinos existentes, destacando Dashboard e Clientes sem atribuir comportamento aos módulos ainda futuros.

`CustomerForm` recebe valores iniciais, estado de salvamento, callback de envio e callback de cancelamento. Por isso pode ser reutilizado na futura edição. O esquema `customerSchema` é a única fonte de validação do formulário; os erros do React Hook Form aparecem no `FormField` correspondente. `phone.ts` aplica apenas a apresentação do telefone brasileiro e não torna o campo obrigatório.

`localCustomerService` simula um salvamento assíncrono e persiste `Customer` em `localStorage`, na chave `autenticflow.customers`. Ao integrar a API REST, preserve `CustomerInput`, `Customer` e `CustomerService`, substitua o adaptador e troque a leitura local da listagem por uma camada de consulta. Não há banco de dados, nem requisições de rede nesta etapa.

`demo.ts` cria deterministicamente a base com 150 clientes fictícios; `demo-storage.ts` a inicializa uma única vez e permite ao Dashboard e à listagem usarem a mesma fonte local. Os campos `lastInteraction`, `owner` e `saleValue` completam os dados necessários para atividades e indicadores. `from-customers.ts` converte a base em snapshot e atividades do Dashboard, evitando números desconectados dos clientes exibidos.

## Rotas e autenticação simulada

`App.tsx` reúne `BrowserRouter`, `AuthProvider` e as rotas `/login` e `/dashboard`. A raiz e caminhos desconhecidos redirecionam para `/login`. O Dashboard exige uma sessão de demonstração e é importado sob demanda, mantendo sua implementação visual existente.

`LoginPage` compõe a marca e o formulário; `useLogin` controla validação, foco no primeiro erro, envio e redirecionamento. Os campos validam ao perder foco e ao enviar. Um bloqueio de envio impede requisições simuladas duplicadas durante o carregamento. O formulário aceita Enter e mostra mensagens acessíveis.

`mockAuthService` implementa o contrato `AuthService`, espera aproximadamente 900 ms e aceita e-mail válido com senha não vazia. Para integrar uma API posteriormente, substitua esse adaptador e revise o provedor de sessão, mantendo os componentes visuais independentes do transporte.

`AuthProvider` mantém a sessão em memória e restaura o e-mail salvo. Com “Lembrar de mim”, `session-storage.ts` usa `localStorage`; sem a opção, usa `sessionStorage`. A chave é `autenticflow.demo-session`; a preferência anterior é removida antes de salvar. Senhas não são persistidas. Se o armazenamento estiver indisponível, o login funciona apenas em memória até recarregar.

Essa sessão é uma simulação de navegação, sem tokens, verificação de credenciais ou segurança de autenticação real. Recuperação de senha é apenas um aviso informativo. Para publicar, o servidor precisa devolver `index.html` para as rotas da aplicação; não houve publicação nesta etapa.

## Regras de manutenção

- `main.tsx` apenas inicializa a aplicação; a composição das rotas e provedores fica em `App.tsx`.
- `AppShell` recebe título, descrição, ações e conteúdo por props. Não conhece os dados do Dashboard e não implementa rotas nesta etapa.
- `AppShell` permanece genérico; as páginas Clientes e Dashboard usam o mesmo layout sem compartilhar regras de domínio.
- `DashboardPage` compõe a tela e conecta o estado aos componentes. Os componentes recebem dados e callbacks por props.
- Regras numéricas ficam em funções puras em `metrics.ts`; formatação compartilhada fica em `lib/formatters.ts`.
- Componentes de uso geral ficam em `components/`; componentes exclusivos de cada funcionalidade ficam em `features/<funcionalidade>/components/`.
- Estilos globais, do layout e da tela ficam separados. As regras responsivas acompanham o arquivo correspondente; regras compartilhadas permanecem em `styles.css`.
- O alias `@/` aponta para `src/` no TypeScript e no Vite, compatível com `components.json`.
- Use Prettier para manter o código formatado. Ao alterar cálculos, atualize os testes em `tests/`.
- Execute `corepack pnpm test`, `corepack pnpm test:e2e`, `corepack pnpm format:check` e `corepack pnpm build` antes de entregar alterações nos fluxos de Login ou Clientes.

## Validação e limites

Os testes unitários usam o executor nativo do Node.js com suporte a TypeScript sem transformação, validado no Node.js 24.18.0. Cobrem os cálculos do Dashboard, validação de login e armazenamento de sessão. Os testes Playwright usam o Chrome instalado e verificam rotas, obrigatoriedade, formato de e-mail, mostrar/ocultar senha, recuperação informativa, Enter, carregamento, persistência, atualização da página e filtros existentes do Dashboard em desktop, tablet e celular. Capturas ficam em `test-results/`, ignorado pelo Git. O build verifica os tipos e gera o pacote de produção.

Validação em 2026-11-04: build de produção e formatação aprovados; 12 testes unitários e 21 testes no Chrome aprovados. Capturas de desktop e celular inspecionadas para Login e Cadastro de Clientes. Nenhum componente, dado ou estilo do Dashboard foi alterado pelo cadastro.

Esta reorganização preserva os mocks e as funcionalidades existentes. As inconsistências dos valores simulados e os controles ainda sem ação estão registrados no README.

## Próximos módulos sugeridos

1. Evoluir as rotas existentes quando novos módulos forem solicitados.
2. Implementar Leads e Clientes usando a mesma camada de serviços.
3. Adicionar Oportunidades e o Funil de Vendas.
4. Conectar autenticação real e API, preservando contratos de domínio.

## Histórico de atualizações

- 2026-11-04: criado Dashboard inicial responsivo, com KPIs, gráficos, timeline e filtros simulados.
- 2026-11-04: dependências instaladas e registradas em `pnpm-lock.yaml`; adicionados tipos de React, React DOM, Node e Vite, inicialização do React e ajuste de tipagem do tooltip. Build de produção validado, mantendo o escopo do Dashboard com mocks.

Registre aqui cada alteração estrutural ou decisão técnica para facilitar a continuidade do trabalho.

- 2026-11-04: Dashboard reorganizado por funcionalidade; extraídos layout compartilhado, componentes visuais, tipos, cálculos, hook de dados e estilos. Adicionados testes dos cálculos, Prettier e guia de manutenção, sem novos módulos.
- 2026-11-04: adicionada tela de login responsiva com validação, alternância de senha, lembrar de mim, carregamento e autenticação simulada; integradas as rotas `/login` e `/dashboard`, com Dashboard sob demanda. Acrescentados componentes de formulário reutilizáveis e testes unitários e de navegador. Dashboard preservado, sem API, recuperação de senha real ou banco de dados.
- 2026-11-04: adicionados Clientes e Cadastro de Cliente em `/clientes` e `/clientes/novo`, com formulário React Hook Form + Zod, máscara de telefone, salvamento local, feedback de sucesso e carregamento. Sidebar integrada com rota ativa; criados testes de schema, armazenamento e navegação. Sem API REST, banco de dados ou edição nesta etapa.
- 2026-11-04: adicionada base local de 150 clientes fictícios, com busca, filtro, edição, exclusão e restauração da demonstração. Dashboard passou a derivar indicadores e atividades dos mesmos clientes, incluindo valores de venda, responsáveis e últimas interações.
- 2026-11-04: a listagem de Clientes foi substituída por tabela responsiva com busca combinável a filtros de status, ordenação por nome, paginação e badges compartilhados. Adicionada rota protegida `/clientes/:id` para perfil individual com informações de contato, status, tags e responsável comercial.
