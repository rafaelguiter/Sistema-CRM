# Registro de prompts — AutenticFlow

## Prompt inicial

> Desenvolver uma aplicação web chamada AutenticFlow, um CRM para gestão comercial, acompanhamento de leads, oportunidades e análise de desempenho. Nesta primeira etapa, desenvolver exclusivamente a tela de Dashboard, preparando a estrutura para os demais módulos.

## Requisitos detalhados recebidos

> Interface SaaS moderna, minimalista e profissional, com inspiração em HubSpot, Pipedrive e Linear; sidebar fixa; azul-escuro, branco, cinza-claro e azul vibrante; ícones Lucide; Inter; React, TypeScript, Tailwind CSS, shadcn/ui e Recharts; interface pt-BR; Dashboard com filtro de período, quatro indicadores, gráficos de receita e leads/conversões, feed de atividades, mocks centralizados e responsividade.

## Decisões de implementação

- A primeira versão não possui API, autenticação ou banco de dados.
- Os filtros trocam um conjunto de dados simulados para 7, 30, 90 dias e 12 meses.
- A conversão é calculada no cliente: `convertidos / leads × 100`.
- Componentes e dados foram separados para facilitar a evolução do projeto.

Atualize este arquivo ao adicionar novos requisitos, decisões importantes ou prompts de implementação.

## Instalação e validação

- Solicitação: instalar o necessário para o projeto sem ampliar o escopo inicial.
- Instaladas as dependências existentes e os pacotes de tipos necessários ao TypeScript; gerado `pnpm-lock.yaml`.
- Corrigidas a inicialização do React e a tipagem do tooltip para executar e compilar o Dashboard.
- Validado `corepack pnpm build`; os demais módulos continuam como etapas futuras.

## Organização para manutenção

- Solicitação: estruturar todo o código para facilitar a manutenção posterior, preservando o escopo inicial.
- Extraídos layout compartilhado, componentes do Dashboard, contratos de domínio, cálculos puros e hook de estado e dados.
- Separados os estilos por responsabilidade; adicionados formatação automática, testes dos cálculos e documentação de manutenção.
- Valores dos mocks e ações ainda não implementadas foram preservados e documentados.

## Segundo prompt — Tela de Login

> Criar uma tela de login moderna, minimalista e responsiva para o AutenticFlow, mantendo a identidade e a estrutura existentes. Fundo branco, Inter, marca centralizada e botão verde. Incluir e-mail, senha com mostrar/ocultar, “Lembrar de mim”, “Entrar”, link “Esqueci minha senha” e carregamento. Validar obrigatoriedade e formato de e-mail, apresentar erros amigáveis e permitir Enter. Usar autenticação simulada, redirecionar para o Dashboard e preparar integração futura com API. Adicionar `/login` como rota inicial e manter o Dashboard em `/dashboard`, preservando seu design e funcionalidades. Não implementar autenticação real, recuperação de senha ou banco de dados. Atualizar os arquivos Markdown ao concluir.

### Decisões de implementação

- React Router organiza `/login`, `/dashboard` e redirecionamentos. O Dashboard é carregado sob demanda após o login e mantém seus componentes, estilos e mocks.
- Login usa componentes locais reutilizáveis no padrão shadcn/ui, Tailwind e ícones Lucide. A marca mantém as barras e o nome em azul do produto.
- Validação ocorre ao perder foco e ao enviar; o primeiro campo inválido recebe foco. Enter envia o formulário, e os controles ficam desabilitados durante o carregamento.
- O adaptador `mockAuthService` aceita qualquer e-mail válido e senha não vazia, com atraso simulado de 900 ms. Não há envio de credenciais a um servidor.
- “Lembrar de mim” escolhe entre `localStorage` e `sessionStorage`, salvando somente o e-mail da sessão de demonstração. Sem armazenamento disponível, a sessão permanece em memória até recarregar.
- “Esqueci minha senha” mostra uma mensagem informativa, sem criar fluxo de recuperação.
- Adicionados testes unitários de validação e sessão e testes Playwright para desktop, tablet e celular, incluindo o fluxo de login e o filtro existente do Dashboard.
- API, autenticação real, recuperação de senha e banco de dados continuam fora do escopo desta etapa.

## Terceiro prompt — Cadastro de Clientes

> Criar uma tela de Cadastro de Clientes integrada ao AutenticFlow, em azul e roxo, com card responsivo, campos Nome completo, E-mail, Telefone, Empresa e Status. Validar o formulário com React Hook Form e Zod, mascarar telefone brasileiro, persistir dados simulados localmente, exibir carregamento e sucesso. Adicionar `/clientes/novo`, integrar à sidebar e preservar Login e Dashboard. Preparar o formulário para futura API REST e edição, sem backend ou banco de dados. Atualizar os arquivos Markdown ao concluir.

### Decisões de implementação

- Criadas `/clientes` como listagem local de demonstração e `/clientes/novo` como cadastro protegido pela sessão simulada. A primeira permite que Cancelar tenha um destino de listagem e confirma os registros salvos.
- A sidebar usa links apenas para Dashboard e Clientes, que são as rotas disponíveis; Clientes fica destacado nas rotas aninhadas.
- `CustomerForm` usa React Hook Form com `zodResolver(customerSchema)`, valida nome e e-mail e recebe valores iniciais e callbacks para reaproveitamento na futura edição.
- O telefone é opcional, recebe máscara `(00) 00000-0000` e não é transformado em requisito de validação.
- `localCustomerService` simula 700 ms de salvamento e armazena registros em `localStorage` sob `autenticflow.customers`. O contrato de serviço foi separado para a futura integração REST.
- Adicionados testes unitários para schema, máscara e armazenamento, além de testes de navegador para navegação, validação, máscara, carregamento, sucesso e cancelamento. Login e Dashboard não foram modificados visualmente.
- Validação final: build de produção e formatação aprovados; 12 testes unitários e 21 cenários de navegador aprovados em desktop, tablet e celular.
