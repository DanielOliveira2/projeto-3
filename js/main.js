// Importa o inicializador do controller de eventos
import { init as initEventController } from './controllers/eventController.js';

// Lógica do contador regressivo
const dataEvento = new Date("2025-07-10T08:00:00").getTime(); // Data do evento: 10 de julho de 2025 às 8h

function atualizarContador() {
  const agora = new Date().getTime();
  const diferenca = dataEvento - agora;

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  // Verifica se os elementos do contador existem na página atual
  if (!diasEl || !horasEl || !minutosEl || !segundosEl) {
    // Se não existirem, simplesmente retorna para não causar erros.
    return;
  }

  if (diferenca < 0) {
    diasEl.textContent = "0";
    horasEl.textContent = "0";
    minutosEl.textContent = "0";
    segundosEl.textContent = "0";
    // Opcional: limpar o intervalo se o evento já passou
    // clearInterval(intervaloContador);
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  diasEl.textContent = dias;
  horasEl.textContent = horas;
  minutosEl.textContent = minutos;
  segundosEl.textContent = segundos;
}

// Lógica do menu mobile
// Estas funções são chamadas pelos atributos onclick no HTML
window.alternarMenu = function() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.toggle("ativo");
  }
}

window.fecharMenu = function() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.remove("ativo");
  }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o contador apenas se os elementos do contador existirem
  if (document.getElementById("dias")) {
    atualizarContador(); // Executa uma vez para não haver delay
    setInterval(atualizarContador, 1000); // Atualiza a cada segundo
  }

  // Inicializa o controller de eventos para carregar os eventos dinamicamente
  // O eventController verificará internamente se a seção de atrações existe
  initEventController();

  // Nota: Os event listeners para o menu (toggle e links) que estavam aqui
  // foram removidos porque as funções `alternarMenu` e `fecharMenu` foram
  // expostas globalmente (window.alternarMenu) para funcionar com os `onclick`
  // diretamente no HTML. Se os `onclick` fossem removidos do HTML,
  // os event listeners seriam adicionados aqui.
});

// A lógica anterior de `atracoes`, `mostrarDetalhes(nomeAtracao)`, `fecharModal()`
// e `window.onclick` para o modal foi removida.
// Essa funcionalidade agora é gerenciada pelo eventController e eventView.
