# AutenticFlow

CRM comercial em React e TypeScript, com login, Dashboard e cadastro local de clientes. Autenticação e dados de clientes são simulados, sem backend.

## Desenvolvimento

Pré-requisito: Node.js com Corepack disponível. A instalação foi validada com Node.js 24.18.0 e pnpm 12.16.1.

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

## Verificações

```bash
corepack pnpm typecheck
corepack pnpm test
corepack pnpm test:e2e
corepack pnpm format:check
corepack pnpm build
```

Use `corepack pnpm format` para aplicar a formatação automática. O build gera os arquivos de produção em `dist/`; `corepack pnpm preview` permite servi-los localmente.

Os testes de navegador usam o Chrome instalado na máquina, em tamanhos de desktop, tablet e celular. O Playwright inicia o Vite automaticamente para esses testes. Os testes unitários não exigem navegador.

## Login de demonstração

- `/` e caminhos desconhecidos redirecionam para `/login`.
- `/login` aceita qualquer e-mail válido e qualquer senha não vazia. Não use credenciais reais para testar.
- Após o envio, um carregamento simulado leva ao Dashboard em `/dashboard`.
- Sem sessão simulada, acessar `/dashboard` redireciona para `/login`.
- “Lembrar de mim” salva apenas o e-mail de demonstração em `localStorage`; sem a opção, ele fica em `sessionStorage`. A senha não é persistida nem enviada.
- O link de recuperação mostra uma mensagem informativa; não há recuperação de senha nesta etapa.
- Para limpar o acesso de demonstração, remova `autenticflow.demo-session` de ambos os armazenamentos do navegador. O login continua acessível para novos testes.

Se o navegador bloquear armazenamento, o fluxo funciona em memória até recarregar a página. A sessão local serve apenas à navegação simulada e não protege dados reais.

Ao hospedar a aplicação, configure o servidor para devolver `index.html` nas rotas da aplicação, inclusive `/login` e `/dashboard`. Isso permite abrir ou atualizar essas URLs diretamente; Vite e Vite Preview já permitem esse fluxo localmente.

## Clientes de demonstração

- A seção **Clientes** da sidebar abre `/clientes`; a ação “Novo cliente” abre `/clientes/novo`.
- O cadastro valida nome completo e e-mail com React Hook Form e Zod. Telefone e empresa são opcionais; o telefone recebe máscara brasileira enquanto é digitado.
- O status inicial é `Lead`; as opções são `Lead`, `Proposta`, `Cliente` e `Inativo`.
- Ao salvar, os dados ficam somente no `localStorage` do navegador, sob a chave `autenticflow.customers`. A página Clientes permite conferir os registros locais e o botão Cancelar retorna a ela sem salvar o formulário atual.
- O adaptador local em `src/features/customers/customer-service.ts` deve ser substituído pela chamada REST na integração futura. O formulário já recebe valores iniciais e callbacks, permitindo seu reaproveitamento na edição.

Ao abrir Clientes ou Dashboard pela primeira vez, a base de demonstração é criada no navegador. Ela tem 150 clientes fictícios: 60 Leads, 35 Propostas, 40 Clientes e 15 Inativos, distribuídos ao longo dos últimos 12 meses. A listagem permite busca por nome, e-mail e empresa, filtro de status, edição do nome e exclusão. O botão “Restaurar dados de demonstração” recria a base original e remove alterações locais.

Receita, conversão, clientes em potencial e atividades recentes do Dashboard usam essa mesma base. Cada registro inclui responsável comercial, última interação e valor de venda fictício quando aplicável.

## Onde fazer manutenção

| Alteração                                  | Arquivo ou pasta                                                     |
| ------------------------------------------ | -------------------------------------------------------------------- |
| Composição inicial da aplicação            | `src/App.tsx`                                                        |
| Tela e formulário de login                 | `src/features/auth/LoginPage.tsx` e `components/`                    |
| Validação e estado do formulário de login  | `src/features/auth/validation.ts` e `use-login.ts`                   |
| Adaptador de autenticação simulada         | `src/features/auth/auth-service.ts`                                  |
| Estado e persistência da sessão simulada   | `src/features/auth/AuthProvider.tsx` e `session-storage.ts`          |
| Componentes de formulário reutilizáveis    | `src/components/ui/`                                                 |
| Marca utilizada na tela de login           | `src/components/Brand.tsx`                                           |
| Cadastro e listagem local de clientes      | `src/features/customers/`                                            |
| Validação de cliente e máscara de telefone | `src/features/customers/customer-schema.ts` e `phone.ts`             |
| Persistência e adaptador local de clientes | `src/features/customers/customer-storage.ts` e `customer-service.ts` |
| Menu, cabeçalho e layout responsivo        | `src/components/layout/`                                             |
| Composição do Dashboard                    | `src/features/dashboard/DashboardPage.tsx`                           |
| Indicadores, gráficos, filtro e atividades | `src/features/dashboard/components/`                                 |
| Dados simulados e opções de período        | `src/features/dashboard/data.ts`                                     |
| Contratos dos dados                        | `src/features/dashboard/types.ts`                                    |
| Cálculos de leads e conversão              | `src/features/dashboard/metrics.ts`                                  |
| Estado do período e acesso aos dados       | `src/features/dashboard/use-dashboard.ts`                            |
| Formatação de moeda, números e percentuais | `src/lib/formatters.ts`                                              |
| Estilos do Dashboard                       | `src/features/dashboard/dashboard.css`                               |
| Estilos do layout                          | `src/components/layout/layout.css`                                   |
| Estilos globais e imports de CSS           | `src/styles.css`                                                     |

Leia [ARQUITETURA.md](ARQUITETURA.md) para as responsabilidades de cada camada e [PROMPTS.md](PROMPTS.md) para o histórico de requisitos.

## Limitações atuais

Os dados continuam simulados. A série de 12 meses contém seis pontos e seu total diverge do indicador de receita; as variações de receita são valores independentes das séries, e a variação de conversão permanece em 1,8 p.p. Esses valores foram preservados nesta reorganização.

Itens de navegação dos módulos futuros e ações como notificações e “Ver todas” continuam sem implementação. API, autenticação real, recuperação de senha, banco de dados, edição de clientes e novos módulos pertencem a etapas futuras.

O Dashboard é carregado sob demanda após o login, separando o código dos gráficos do pacote inicial. O design, os filtros e os dados do Dashboard foram preservados.

Validação atual: build de produção, formatação, 12 testes unitários e 21 cenários no Chrome aprovados nos tamanhos de desktop, tablet e celular.
