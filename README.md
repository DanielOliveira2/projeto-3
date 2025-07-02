# Projeto PalhasGeek 2025 - Página de Eventos

Este projeto simula uma página de listagem de eventos para o "PalhasGeek 2025", com funcionalidades dinâmicas integradas através de uma API local e uma estrutura MVC no front-end.

## Funcionalidades

*   Listagem dinâmica de eventos a partir de uma API local.
*   Exibição de detalhes do evento em um modal.
*   Contador regressivo para a data do evento.
*   Menu de navegação responsivo (mobile-friendly).
*   Página de inscrição com formulário e validação.

## Arquitetura

O projeto utiliza uma arquitetura Model-View-Controller (MVC) simplificada para o front-end e uma API Node.js/Express para o back-end.

*   **Front-end:**
    *   **Model (`js/models/eventModel.js`):** Responsável por buscar os dados dos eventos da API.
    *   **View (`js/views/eventView.js`):** Responsável pela apresentação dos dados e manipulação do DOM.
    *   **Controller (`js/controllers/eventController.js`):** Orquestra a comunicação entre Model e View no front-end.
*   **Back-end (`api-server/`):**
    *   **API Server (`api-server/server.js`):** Um servidor Node.js com Express que serve os dados dos eventos a partir de um arquivo `eventos.json`.
    *   **Dados dos Eventos (`api-server/eventos.json`):** Arquivo JSON contendo a lista de eventos e seus detalhes.

Para mais detalhes sobre a arquitetura, consulte o arquivo `ARQUITETURA.md`.

## Pré-requisitos

Para rodar este projeto (incluindo o servidor da API), você precisará ter instalado:

*   [Node.js](https://nodejs.org/) (que inclui npm)

## Como Executar o Projeto

1.  **Clone o Repositório (se aplicável):**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-da-pasta-do-projeto>
    ```

2.  **Instale as Dependências do Servidor da API:**
    Navegue até a pasta do servidor da API e instale as dependências listadas no `package.json` (`express` e `cors`).
    ```bash
    cd api-server
    npm install
    cd ..
    ```
    *Nota: O comando `cd ..` retorna ao diretório raiz do projeto.*

3.  **Inicie o Servidor da API:**
    A partir da pasta raiz do projeto, você pode iniciar o servidor da API.
    ```bash
    node api-server/server.js
    ```
    Ou, se você estiver dentro da pasta `api-server`:
    ```bash
    node server.js
    ```
    O servidor estará rodando em `http://localhost:3000` e o endpoint dos eventos será `http://localhost:3000/api/events`. Você verá uma mensagem no console confirmando que o servidor foi iniciado.

4.  **Abra o Front-end no Navegador:**
    *   Abra o arquivo `index.html` diretamente no seu navegador.
    *   Alternativamente, para uma melhor experiência de desenvolvimento (especialmente se houver questões de CORS não totalmente cobertas, embora `cors` esteja no servidor), você pode usar uma extensão como "Live Server" no VS Code para servir os arquivos do front-end. Isso geralmente abre o site em uma porta como `http://localhost:5500` ou similar.

## Estrutura de Pastas Principal

```
.
├── ARQUITETURA.md
├── README.md
├── api-server/
│   ├── eventos.json      # Dados dos eventos
│   ├── package-lock.json
│   ├── package.json      # Dependências e scripts do servidor
│   └── server.js         # Lógica do servidor da API
├── css/
│   ├── stylei.css        # Estilos da página de inscrição
│   └── stylem.css        # Estilos da página principal
├── img/                    # Imagens do projeto
├── js/
│   ├── controllers/
│   │   └── eventController.js
│   ├── models/
│   │   └── eventModel.js
│   ├── views/
│   │   └── eventView.js
│   ├── inscricao.js      # Lógica da página de inscrição
│   └── main.js           # Lógica principal da index.html
├── index.html              # Página principal de eventos
└── inscricao_page.html     # Página de inscrição
```

## Entrega e Apresentação (Resumo para o Trabalho)

*   **Qual arquitetura foi adotada:** MVC para o front-end, com um servidor Node.js/Express simples para a API. (Veja `ARQUITETURA.md` para o diagrama).
*   **Qual API foi utilizada:** Uma API local desenvolvida com Node.js e Express, servindo dados de um arquivo `eventos.json`. Endpoint: `http://localhost:3000/api/events`.
*   **Quais dados foram integrados dinamicamente:**
    *   Lista de cards de eventos na página principal (imagem, título).
    *   Detalhes completos do evento no modal (título, descrição completa).