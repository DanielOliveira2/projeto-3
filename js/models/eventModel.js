// js/models/eventModel.js

/**
 * Busca os dados dos eventos do arquivo JSON local.
 * @returns {Promise<Array<Object>>} Uma promessa que resolve para uma lista de eventos.
 * @throws {Error} Se houver um problema ao buscar ou processar os eventos.
 */
export async function fetchEvents() {
  try {
    const response = await fetch('../eventos.json'); // Caminho relativo ao HTML que carrega o JS
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Falha ao buscar eventos:', error);
    // Em uma aplicação real, poderíamos ter um tratamento de erro mais sofisticado aqui,
    // como exibir uma mensagem para o usuário.
    return []; // Retorna um array vazio em caso de erro para a aplicação não quebrar.
  }
}
