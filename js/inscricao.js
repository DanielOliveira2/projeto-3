function validarEmail(email) { // Função para validar e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Função para validar nome
function validarNome(nome) {
  return nome.trim().length >= 3;
}

// Função para mostrar erro
function mostrarErro(campo, mostrar) {
  const formGroup = campo.parentElement;
  if (mostrar) {
    formGroup.classList.add("error");
  } else {
    formGroup.classList.remove("error");
  }
}

// Função para validar formulário
function validarFormulario() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  let valido = true;

  // Validar nome
  if (!validarNome(nome.value)) {
    mostrarErro(nome, true);
    valido = false;
  } else {
    mostrarErro(nome, false);
  }

  // Validar e-mail
  if (!validarEmail(email.value)) {
    mostrarErro(email, true);
    valido = false;
  } else {
    mostrarErro(email, false);
  }

  return valido;
}

// Event listener para o formulário
document
  .getElementById("inscricaoForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (validarFormulario()) {
      // Se tudo estiver válido, mostra o modal de sucesso
      document.getElementById("modalSucesso").style.display = "block";
    }
  });

// Validação em tempo real
document.getElementById("nome").addEventListener("input", function () {
  if (this.value.length > 0) {
    mostrarErro(this, !validarNome(this.value));
  }
});

document.getElementById("email").addEventListener("input", function () {
  if (this.value.length > 0) {
    mostrarErro(this, !validarEmail(this.value));
  }
});

// Função para fechar modal
function fecharModal() {
  document.getElementById("modalSucesso").style.display = "none";
}

// Função para voltar à página principal
function voltarPagina() {
  window.location.href = "index.html";
}

// Fechar modal clicando fora
window.onclick = function (event) {
  const modal = document.getElementById("modalSucesso");
  if (event.target === modal) {
    fecharModal();
  }
};
