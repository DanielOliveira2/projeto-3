// js/models/eventModel.js

/**
 * Busca os dados dos eventos da API local.
 * @returns {Promise<Array<Object>>} Uma promessa que resolve para uma lista de eventos.
 * @throws {Error} Se houver um problema ao buscar ou processar os eventos.
 */
export async function fetchEvents() {
  const apiUrl = 'http://localhost:3000/api/events';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      // Tenta ler o corpo da resposta de erro, se houver, para mais detalhes
      let errorMessage = `Erro HTTP: ${response.status} - ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMessage += ` - ${errorBody.message || JSON.stringify(errorBody)}`;
      } catch (e) {
        // Ignora erro ao parsear corpo do erro, mantém a mensagem original
      }
      throw new Error(errorMessage);
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Falha ao buscar eventos da API:', error);
    // Em uma aplicação real, poderíamos ter um tratamento de erro mais sofisticado aqui,
    // como exibir uma mensagem para o usuário na UI.
    return []; // Retorna um array vazio em caso de erro para a aplicação não quebrar.
  }
}
