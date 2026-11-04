# Atualização de tags e status

- O cadastro de clientes possui tags adicionadas com Enter ou botão `+`.
- Tags duplicadas são ignoradas e cada chip pode ser removido.
- Tags são salvas com o cliente, aparecem na listagem e podem ser filtradas.
- A base fictícia de 150 clientes recebe tags variadas ao restaurar os dados de demonstração.
- Os badges da listagem usam azul para Lead, amarelo para Proposta, verde para Cliente e cinza para Inativo.
- O build de produção passou após a implementação.

## Listagem de clientes

- A rota `/clientes` agora usa tabela responsiva com avatar, empresa, e-mail, telefone, badge de status e botão `Ver Perfil`.
- Busca por nome, empresa, e-mail e telefone funciona em tempo real e pode ser combinada aos filtros de status.
- A tabela ordena por nome, mostra total encontrado e permite 10, 25 ou 50 registros por página.
- `Ver Perfil` abre `/clientes/:id` e mostra dados de contato, status, tags e responsável do cliente.
