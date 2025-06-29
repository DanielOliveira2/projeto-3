// js/controllers/eventController.js

import { fetchEvents } from '../models/eventModel.js';
import { displayEvents, displayEventDetails, setupModalEventListeners } from '../views/eventView.js';

let allEvents = []; // Para armazenar os eventos buscados

/**
 * Manipulador para quando um card de evento é clicado.
 * @param {string} eventId - O ID do evento clicado.
 */
function handleCardClick(eventId) {
  const selectedEvent = allEvents.find(event => event.id === eventId);
  if (selectedEvent) {
    displayEventDetails(selectedEvent);
  } else {
    console.error(`Evento com ID ${eventId} não encontrado.`);
  }
}

/**
 * Inicializa o controller de eventos.
 * Busca os eventos e configura a view.
 */
export async function init() {
  try {
    allEvents = await fetchEvents();
    if (allEvents.length > 0) {
      displayEvents(allEvents, handleCardClick);
    } else {
      // Opcional: exibir uma mensagem se nenhum evento for encontrado/carregado
      const atracoesSection = document.querySelector('#atracoes .cards');
      if (atracoesSection) {
        atracoesSection.innerHTML = '<p>Nenhum evento disponível no momento.</p>';
      }
    }
  } catch (error) {
    console.error('Erro ao inicializar o controller de eventos:', error);
    // Opcional: exibir uma mensagem de erro na UI
    const atracoesSection = document.querySelector('#atracoes .cards');
    if (atracoesSection) {
      atracoesSection.innerHTML = '<p>Ocorreu um erro ao carregar os eventos. Tente novamente mais tarde.</p>';
    }
  }

  // Configura os event listeners do modal (fechar no X e clique fora)
  // Isso é feito uma vez, já que o modal é sempre o mesmo
  setupModalEventListeners();
}
