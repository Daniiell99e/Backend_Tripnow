// Função para voltar uma etapa no histórico do navegador
function voltarUmaEtapa() {
  if (window.history.length > 1) {
    // Volta para a página anterior no histórico
    window.history.back();
  } else {
    // Se não houver histórico, redireciona para a página inicial
    window.location.href = '/pagina1'; // Substitua pela rota da sua página inicial
  }
}

// Adiciona o evento a todos os botões com a classe "botaoVoltar"
document.addEventListener('DOMContentLoaded', () => {
  const botoesVoltar = document.querySelectorAll('.botaoVoltar');
  botoesVoltar.forEach((botao) => {
    botao.addEventListener('click', voltarUmaEtapa);
  });
});