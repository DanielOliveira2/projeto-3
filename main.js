const dataEvento = new Date("2025-07-10T08:00:00").getTime(); // Data do evento: 10 de julho de 2025 às 8h

function atualizarContador() {
  // Pega a data atual
  const agora = new Date().getTime();

  // Calcula a diferença
  const diferenca = dataEvento - agora;

  // Se o evento já passou
  if (diferenca < 0) {
    document.getElementById("dias").textContent = "0";
    document.getElementById("horas").textContent = "0";
    document.getElementById("minutos").textContent = "0";
    document.getElementById("segundos").textContent = "0";
    return;
  }

  // Calcula  os dias, horas, minutos e segundos
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  // Atualiza os elementos na página
  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);

// Executa uma vez quando a página carrega
atualizarContador();

// Menu pra celular

function alternarMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("ativo");
}

function fecharMenu() {
  const menu = document.getElementById("menu");
  menu.classList.remove("ativo");
}

// Informações das atrações
const atracoes = {
  daniel: {
    titulo: "Daniel Figueira",
    descricao: `
                <p><strong>Ator, Cantor e Dublador</strong></p>
                <p><strong>Data:</strong> 10 de Julho de 2025</p>
                <p><strong>Horário:</strong> 14h às 16h</p>
                <p><strong>Local:</strong> Palco Principal</p>
                <br>
                <p>Daniel Figueira é um talentoso ator, cantor e dublador brasileiro. 
                Conhecido por seus trabalhos em séries, filmes e como dublador de grandes 
                produções internacionais.</p>
                <br>
                <p><strong>Atividades:</strong></p>
                
                    <p>Sessão de autógrafos</p>
                    <p>Meet & Greet</p>
                    <p>Apresentação musical</p>
                    <p>Bate-papo sobre dublagem</p>
                
            `,
  },
  tom: {
    titulo: "Tom Welling",
    descricao: `
                <p><strong>Clark Kent em "Smallville"</strong></p>
                <p><strong>Data:</strong> 10 de Julho de 2025</p>
                <p><strong>Horário:</strong> 16h às 18h</p>
                <p><strong>Local:</strong> Auditório Principal</p>
                <br>
                <p>Tom Welling ficou mundialmente famoso interpretando Clark Kent 
                na série "Smallville" por 10 temporadas. Também atuou em filmes 
                como "Mais Barato por Dúzia" e dirigiu episódios de "Smallville".</p>
                <br>
                <p><strong>Atividades:</strong></p>
                
                    <p>Painel exclusivo sobre Smallville</p>
                    <p>Sessão de perguntas e respostas</p>
                    <p>Sessão de fotos</p>
                    <p>Autógrafos</p>
                
            `,
  },
  adrian: {
    titulo: "Adrian Tatini",
    descricao: `
                <p><strong>Cantor e Dublador</strong></p>
                <p><strong>Data:</strong> 10 de Julho de 2025</p>
                <p><strong>Horário:</strong> 10h às 12h</p>
                <p><strong>Local:</strong> Espaço Cultural</p>
                <br>
                <p>Adrian Tatini é cantor e dublador, conhecido por dublar diversos 
                personagens em animes, filmes e séries. Sua voz marcante conquistou 
                fãs em todo o Brasil.</p>
                <br>
                <p><strong>Atividades:</strong></p>
                
                    <p>Workshop de dublagem</p>
                    <p>Apresentação musical</p>
                    <p>Conversa sobre a carreira</p>
                    <p>Sessão de autógrafos</p>
                
            `,
  },
};

function mostrarDetalhes(nomeAtracao) {
  const modal = document.getElementById("modal");
  const titulo = document.getElementById("modal-titulo");
  const descricao = document.getElementById("modal-descricao");

  // Pega as informações da atração
  const info = atracoes[nomeAtracao];

  // Atualiza o conteúdo do modal
  titulo.textContent = info.titulo;
  descricao.innerHTML = info.descricao;

  // Mostra o modal
  modal.style.display = "block";
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Fecha o modal se clicar fora dele
window.onclick = function (evento) {
  const modal = document.getElementById("modal");
  if (evento.target === modal) {
    modal.style.display = "none";
  }
};
