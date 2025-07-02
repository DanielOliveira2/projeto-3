# Documentação da Arquitetura do Projeto PalhasGeek 2025

## 1. Arquitetura Adotada: Model-View-Controller (MVC) Simplificado

Para organizar o código JavaScript e separar as responsabilidades, foi adotada uma abordagem baseada no padrão Model-View-Controller (MVC) para o front-end. O back-end consiste em uma API Node.js/Express simples.

### Diagrama da Arquitetura

```
+----------------------+      +-------------------+      +-----------------------+      +---------------------+      +-----------------------------+
| Usuário (Navegador)  |----->|       View        |----->|      Controller       |<-----|        Model        |<---->|     API Server (Node.js)    |
|                      |      | (eventView.js)    |      | (eventController.js)  |      | (eventModel.js)     |      | (api-server/server.js)      |
+----------------------+      +-------------------+<-----|                       |----->+---------------------+      +-----------------------------+
                                     ^  (Exibe Dados,      |  (Orquestra Front-end)       | (fetch API Endpoint)         |  (Serve /api/events        |
                                     |   Manipula DOM)     +-----------------------+      |                              |   a partir de eventos.json)|
                                     +----------------------------------------------------+                              +-----------------------------+
                                                  (Interação do Usuário)
```

**Componentes:**

*   **Front-end (Client-Side):**
    *   **Model (`js/models/eventModel.js`):**
        *   Responsável por buscar dados da API back-end.
        *   Contém a função `fetchEvents()` que faz uma requisição HTTP GET para `http://localhost:3000/api/events`.
        *   Retorna os dados brutos (via Promises) para o Controller.
    *   **View (`js/views/eventView.js`):**
    *   Responsável pela apresentação dos dados e pela interface do usuário (UI).
    *   Contém funções para:
        *   `displayEvents()`: Renderizar a lista de eventos na página (criando os cards dinamicamente).
        *   `displayEventDetails()`: Mostrar os detalhes de um evento específico no modal.
        *   `closeModal()`: Fechar o modal.
        *   `setupModalEventListeners()`: Configurar os listeners de evento para o modal.
    *   Manipula diretamente o DOM para exibir informações.
    *   Recebe dados do Controller para exibir.
    *   Pode notificar o Controller sobre interações do usuário (ex: clique em um card, embora neste projeto o Controller adicione os listeners diretamente aos elementos criados pela View).

*   **Controller (`js/controllers/eventController.js`):**
    *   Atua como intermediário entre o Model e a View.
    *   Contém a lógica de aplicação e coordena as ações.
    *   `init()`: Função principal que:
        *   Solicita os dados de eventos ao Model (`fetchEvents()`).
        *   Passa os dados recebidos para a View (`displayEvents()`) para serem renderizados.
        *   Configura os manipuladores de evento (event listeners) nos cards de evento (gerados pela View) para que, ao serem clicados, os detalhes do evento sejam buscados (dos dados já carregados) e exibidos pela View (`displayEventDetails()`).
    *   Gerencia o estado da aplicação (neste caso, a lista `allEvents` no front-end).

*   **Back-end (Server-Side - `api-server/server.js`):**
    *   **API Server (Node.js/Express):**
        *   Responsável por servir os dados dos eventos.
        *   Usa `Express.js` para criar um servidor HTTP.
        *   Usa `cors` para permitir requisições de diferentes origens (necessário para desenvolvimento local quando front-end e back-end rodam em portas diferentes).
        *   Expõe um endpoint principal:
            *   `GET /api/events`: Lê o arquivo `eventos.json` (localizado em `api-server/eventos.json`) e retorna seu conteúdo como uma resposta JSON.
        *   O servidor roda em `http://localhost:3000` (ou outra porta configurada).

**Fluxo Típico:**

1.  O servidor da API (`api-server/server.js`) é iniciado.
2.  A página (`index.html`) carrega `js/main.js`.
3.  `js/main.js` (após o DOM estar pronto) chama `init()` do `eventController.js`.
4.  O `eventController` solicita ao `eventModel` para buscar os eventos (`fetchEvents()`).
5.  O `eventModel` faz uma requisição `fetch` para `http://localhost:3000/api/events`.
6.  O **API Server** recebe a requisição, lê o `eventos.json` e envia os dados dos eventos como resposta JSON.
7.  O `eventModel` recebe a resposta da API e retorna os dados para o `eventController`.
8.  O `eventController` passa os dados dos eventos para o `eventView`.
9.  O `eventView` renderiza os cards dos eventos na página (`displayEvents()`) e configura o modal (`setupModalEventListeners()`).
10. Quando o usuário clica em um card de evento:
    *   O listener (configurado pelo `eventController`) é acionado.
    *   O `eventController` identifica o evento clicado.
    *   O `eventController` solicita à `eventView` para exibir os detalhes desse evento no modal (`displayEventDetails()`).
11. Quando o usuário fecha o modal (clicando no 'X' ou fora dele):
    *   O listener (configurado pelo `eventView` através de `setupModalEventListeners`) é acionado.
    *   A `eventView` esconde o modal (`closeModal()`).

## 2. API Utilizada

Foi desenvolvida uma API local usando **Node.js** e **Express.js**.

*   **Localização do código do servidor:** Pasta `api-server/`
*   **Arquivo principal do servidor:** `server.js`
*   **Endpoint principal:** `GET http://localhost:3000/api/events`
*   **Fonte dos dados:** O servidor lê o arquivo `eventos.json` localizado em `api-server/eventos.json`.
*   **Estrutura dos dados de cada evento (no `eventos.json`):**
    ```json
    {
      "id": "string", // Identificador único para o evento
      "titulo": "string", // Título do evento
      "descricaoCompleta": "string", // Descrição HTML completa para o modal
      "data": "string (ISO 8601 datetime)", // Data e hora do evento
      "local": "string", // Local do evento
      "imagemUrl": "string" // Caminho para a imagem do evento
    }
    ```

## 3. Dados Integrados Dinamicamente

Os seguintes dados são integrados dinamicamente na página `index.html` a partir da API (`http://localhost:3000/api/events`):

*   **Cards de Atrações/Eventos (Seção `#atracoes`):**
    *   **Imagem do evento:** `imagemUrl` é usada como `src` da tag `<img>` no card.
    *   **Título do evento:** `titulo` é exibido abaixo da imagem no card.
    *   Os cards são gerados dinamicamente, e cada um está associado a um `id` de evento para carregar os detalhes corretos.

*   **Modal de Detalhes do Evento (Quando um card é clicado):**
    *   **Título do Modal:** Preenchido com o `titulo` do evento selecionado.
    *   **Descrição do Modal:** Preenchido com a `descricaoCompleta` (que pode conter HTML) do evento selecionado.

Essa abordagem permite que a lista de eventos e seus detalhes sejam facilmente atualizados modificando apenas o arquivo `api-server/eventos.json` e reiniciando o servidor da API (se necessário, dependendo da implementação do servidor), sem a necessidade de alterar o código do front-end diretamente para cada novo evento.
plan_step_complete(message="Criei o arquivo ARQUITETURA.md com a documentação solicitada. Ele inclui: uma descrição da arquitetura MVC adotada com um diagrama, detalhes sobre como a API foi simulada com o arquivo eventos.json (estrutura e exemplo) e uma explicação sobre quais dados são integrados dinamicamente na página.")
