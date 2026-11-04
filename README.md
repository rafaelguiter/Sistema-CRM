# AutenticFlow

Dashboard comercial em React e TypeScript, com indicadores, gráficos e atividades simuladas. Esta etapa contempla apenas o Dashboard.

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
corepack pnpm format:check
corepack pnpm build
```

Use `corepack pnpm format` para aplicar a formatação automática. O build gera os arquivos de produção em `dist/`; `corepack pnpm preview` permite servi-los localmente.

## Onde fazer manutenção

| Alteração                                  | Arquivo ou pasta                           |
| ------------------------------------------ | ------------------------------------------ |
| Composição inicial da aplicação            | `src/App.tsx`                              |
| Menu, cabeçalho e layout responsivo        | `src/components/layout/`                   |
| Composição do Dashboard                    | `src/features/dashboard/DashboardPage.tsx` |
| Indicadores, gráficos, filtro e atividades | `src/features/dashboard/components/`       |
| Dados simulados e opções de período        | `src/features/dashboard/data.ts`           |
| Contratos dos dados                        | `src/features/dashboard/types.ts`          |
| Cálculos de leads e conversão              | `src/features/dashboard/metrics.ts`        |
| Estado do período e acesso aos dados       | `src/features/dashboard/use-dashboard.ts`  |
| Formatação de moeda, números e percentuais | `src/lib/formatters.ts`                    |
| Estilos do Dashboard                       | `src/features/dashboard/dashboard.css`     |
| Estilos do layout                          | `src/components/layout/layout.css`         |
| Estilos globais e imports de CSS           | `src/styles.css`                           |

Leia [ARQUITETURA.md](ARQUITETURA.md) para as responsabilidades de cada camada e [PROMPTS.md](PROMPTS.md) para o histórico de requisitos.

## Limitações atuais

Os dados continuam simulados. A série de 12 meses contém seis pontos e seu total diverge do indicador de receita; as variações de receita são valores independentes das séries, e a variação de conversão permanece em 1,8 p.p. Esses valores foram preservados nesta reorganização.

Itens de navegação dos módulos futuros e ações como notificações e “Ver todas” continuam sem implementação. API, autenticação, banco de dados e novos módulos pertencem a etapas futuras.

O build pode avisar que o pacote JavaScript supera 500 kB por incluir os gráficos. Esse aviso não impede a geração dos arquivos.
