# Documentação da Arquitetura do Projeto PalhasGeek 2025

## 1. Arquitetura Adotada: Model-View-Controller (MVC) Simplificado

Para organizar o código JavaScript e separar as responsabilidades, foi adotada uma abordagem baseada no padrão Model-View-Controller (MVC) de forma simplificada.

### Diagrama da Arquitetura

```
+-------------------+      +-----------------------+      +---------------------+
|       View        |----->|      Controller       |<-----|        Model        |
| (eventView.js)    |      | (eventController.js)  |      | (eventModel.js)     |
+-------------------+<-----|                       |----->+---------------------+
         ^                 +-----------------------+                |
         |                           |                              | (fetch)
         | (Manipula DOM,            | (Orquestra)                  |
         |  Exibe Dados)             |                              v
         |                           |                      +----------------+
         +---------------------------+                      |   eventos.json |
                     (Interação do Usuário)                 | (Simulação API)|
                                                            +----------------+
```

**Componentes:**

*   **Model (`js/models/eventModel.js`):**
    *   Responsável pela lógica de dados e acesso à "API".
    *   No nosso caso, ele contém a função `fetchEvents()` que lê os dados do arquivo `eventos.json`.
    *   Não possui conhecimento direto da View ou do Controller. Retorna os dados brutos (geralmente via Promises).

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
    *   Gerencia o estado da aplicação (neste caso, a lista `allEvents`).

**Fluxo Típico:**

1.  A página (`index.html`) carrega `js/main.js`.
2.  `js/main.js` (após o DOM estar pronto) chama `init()` do `eventController.js`.
3.  O `eventController` solicita ao `eventModel` para buscar os eventos (`fetchEvents()`).
4.  O `eventModel` lê o `eventos.json` e retorna os dados dos eventos para o `eventController`.
5.  O `eventController` passa os dados dos eventos para o `eventView`.
6.  O `eventView` renderiza os cards dos eventos na página (`displayEvents()`) e configura o modal (`setupModalEventListeners()`).
7.  Quando o usuário clica em um card de evento:
    *   O listener (configurado pelo `eventController`) é acionado.
    *   O `eventController` identifica o evento clicado.
    *   O `eventController` solicita à `eventView` para exibir os detalhes desse evento no modal (`displayEventDetails()`).
8.  Quando o usuário fecha o modal (clicando no 'X' ou fora dele):
    *   O listener (configurado pelo `eventView` através de `setupModalEventListeners`) é acionado.
    *   A `eventView` esconde o modal (`closeModal()`).

## 2. API Utilizada (Simulação)

Foi utilizada uma **API simulada** através de um arquivo JSON local:

*   **Nome do arquivo:** `eventos.json`
*   **Localização:** Raiz do projeto.
*   **Estrutura dos dados de cada evento:**
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
*   **Exemplo de evento no `eventos.json`:**
    ```json
    {
      "id": "campeonato-lol",
      "titulo": "Campeonato de League of Legends",
      "descricaoCompleta": "<p><strong>Mostre suas habilidades no Rift!</strong></p><p><strong>Data:</strong> 10 de Julho de 2025</p><p><strong>Horário:</strong> 09h às 19h</p><p><strong>Local:</strong> Arena eSports</p><br><p>Participe do nosso emocionante campeonato de League of Legends. Inscrições abertas para equipes de 5 jogadores. Premiação para os vencedores e muita emoção garantida!</p><br><p><strong>Formato:</strong> Eliminação Simples</p><p><strong>Inscrição:</strong> No local, até 1 hora antes do início.</p>",
      "data": "2025-07-10T09:00:00",
      "local": "Arena eSports",
      "imagemUrl": "img/favicon.png"
    }
    ```

## 3. Dados Integrados Dinamicamente

Os seguintes dados são integrados dinamicamente na página `index.html` a partir do `eventos.json`:

*   **Cards de Atrações/Eventos (Seção `#atracoes`):**
    *   **Imagem do evento:** `imagemUrl` é usada como `src` da tag `<img>` no card.
    *   **Título do evento:** `titulo` é exibido abaixo da imagem no card.
    *   Os cards são gerados dinamicamente, e cada um está associado a um `id` de evento para carregar os detalhes corretos.

*   **Modal de Detalhes do Evento (Quando um card é clicado):**
    *   **Título do Modal:** Preenchido com o `titulo` do evento selecionado.
    *   **Descrição do Modal:** Preenchido com a `descricaoCompleta` (que pode conter HTML) do evento selecionado.

Essa abordagem permite que a lista de eventos e seus detalhes sejam facilmente atualizados modificando apenas o arquivo `eventos.json`, sem a necessidade de alterar o código HTML ou JavaScript diretamente para cada novo evento.tool_code
plan_step_complete(message="Criei o arquivo ARQUITETURA.md com a documentação solicitada. Ele inclui: uma descrição da arquitetura MVC adotada com um diagrama, detalhes sobre como a API foi simulada com o arquivo eventos.json (estrutura e exemplo) e uma explicação sobre quais dados são integrados dinamicamente na página.")
