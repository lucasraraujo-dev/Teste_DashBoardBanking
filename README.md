This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Ferramentas utilizadas

 Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# Banking_DashBoard

Bem-vindo ao Teste_DashBoard Banking, um painel bancario que mostra as contas e valores, com Next.js 14 e Reactjs. Este repositório mostra a implementação de um painel com de criação e busca de contas com uma api.

Começando 🚀
Clone este repositório para sua máquina local.
Instale dependências usando npm installou yarn install.
Execute o servidor de desenvolvimento: npm run dev ou yarn dev.
Abra http://localhost:3000 no seu navegador para ver o resultado.
Comece a editar a página modificando app/page.js. A página é atualizada automaticamente conforme você edita o arquivo.

utilizei TailwindCSS como framework CSS, NextJS 14 com App Router, consulta de API’s via fetch e uso de React Hooks 

* 1.2. Instalação do TailwindCSS
Após a criação do projeto, instale o TailwindCSS no Next.js.

Instale as dependências do Tailwind:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Configure o arquivo tailwind.config.js:
javascript

No arquivo globals.css (ou crie um), adicione o seguinte:

@tailwind base;
@tailwind components;
@tailwind utilities;

*1.3. Configuração do App Router (Next.js 14)
Com o Next.js 14, o App Router introduz uma nova estrutura. Ao invés de usar pages, agora você utiliza a pasta app para organizar rotas.

Certifique-se de ter uma estrutura de pastas como esta:
meu-projeto/
├── app/
│   ├── page.js
│   └── layout.js
├── components/
├── public/
├── styles/
└── package.json
layout.js: Configura a base comum entre as páginas. Por exemplo

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

*Consultas de API com Fetch
Para buscar dados de uma API em um componente, usamos o fetch. A consulta de API geralmente é realizada dentro do useEffect para garantir que os dados sejam carregados após a montagem do componente.
useState: Usado para armazenar os dados e o estado de carregamento.
useEffect: Executa a chamada de API ao montar o componente.
fetch: Realiza a requisição HTTP para uma API externa.

*Uso de React Hooks (useState e useEffect)
*useState
useState é um Hook que permite adicionar estado a componentes funcionais. Ele retorna um valor atual e uma função para atualizar esse valor.

Exemplo básico:

import { useState } from 'react';

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Você clicou {contador} vezes</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}

*useEffect
useEffect é um Hook que permite realizar efeitos colaterais em componentes funcionais. Ele é similar aos métodos de ciclo de vida como componentDidMount e componentDidUpdate.

* Uso de TailwindCSS para Estilização
A estilização com o TailwindCSS é feita diretamente nos componentes usando classes utilitárias.

Conclusão
Esta documentação básica cobre como configurar um projeto Next.js 14 com TailwindCSS, fazer consultas de API usando fetch e utilizar React Hooks como useState e useEffect. Essa abordagem permite criar interfaces modernas, eficientes e estilizadas rapidamente.
