// js/views/eventView.js

const atracoesSection = document.querySelector('#atracoes .cards');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescricao = document.getElementById('modal-descricao');
const modalFechar = document.querySelector('.modal-fechar'); // Seleciona o botão de fechar original

/**
 * Limpa os cards de eventos existentes na seção de atrações.
 */
function clearEvents() {
  if (atracoesSection) {
    atracoesSection.innerHTML = '';
  }
}

/**
 * Cria e exibe os cards de evento na página.
 * @param {Array<Object>} events - Lista de objetos de evento.
 * @param {Function} onCardClick - Função a ser chamada quando um card é clicado.
 */
export function displayEvents(events, onCardClick) {
  clearEvents();

  if (!atracoesSection) {
    console.error('Elemento .cards dentro de #atracoes não encontrado.');
    return;
  }

  events.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-event-id', event.id);

    const img = document.createElement('img');
    img.src = event.imagemUrl;
    img.alt = event.titulo;

    // Adicionando um título simples abaixo da imagem, como nos cards originais
    const title = document.createElement('h3'); // Ou <p> com estilização
    title.textContent = event.titulo;
    title.style.textAlign = 'center'; // Centraliza o título
    title.style.marginTop = '10px'; // Espaçamento
    title.style.color = '#333'; // Cor do texto


    card.appendChild(img);
    card.appendChild(title); // Adiciona o título ao card

    card.addEventListener('click', () => onCardClick(event.id));
    atracoesSection.appendChild(card);
  });
}

/**
 * Exibe os detalhes de um evento no modal.
 * @param {Object} event - O objeto do evento a ser exibido.
 */
export function displayEventDetails(event) {
  if (modal && modalTitulo && modalDescricao) {
    modalTitulo.textContent = event.titulo;
    modalDescricao.innerHTML = event.descricaoCompleta;
    modal.style.display = 'block';
  } else {
    console.error('Elementos do modal não encontrados.');
  }
}

/**
 * Fecha o modal de detalhes do evento.
 */
export function closeModal() {
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Configura o fechamento do modal ao clicar no botão de fechar ou fora do conteúdo do modal.
 */
export function setupModalEventListeners() {
    if (modalFechar) {
        modalFechar.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}
