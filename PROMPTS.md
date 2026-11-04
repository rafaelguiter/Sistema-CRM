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
