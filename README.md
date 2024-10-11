This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Ferramentas utilizadas

- Utilizei TailwindCSS como framework CSS, NextJS 14 com App Router, consulta de API’s via **fetch** e React Hooks

# Banking DashBoard

Bem-vindo ao Teste_DashBoard Banking, um painel bancario que mostra as contas e valores, com Next.js 14. Este repositório mostra a implementação de um painel com de criação e busca de contas com a API fornecida.

## Começando 🚀

- Clone este repositório para sua máquina local.
- Instale dependências usando npm installou yarn install.
- Execute o servidor de desenvolvimento: npm run dev ou yarn dev.
- Abra http://localhost:3000 no seu navegador para ver o resultado.

### Consultas de API com `Fetch`

Para buscar dados de uma API em um componente, usamos o fetch. A consulta de API geralmente é realizada dentro do useEffect para garantir que os dados sejam carregados após a montagem do componente.

`useState`: Usado para armazenar os dados e o estado de carregamento.
`useEffect`: Executa a chamada de API ao montar o componente.
fetch: Realiza a requisição HTTP para uma API externa.
