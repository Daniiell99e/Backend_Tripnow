// Seleciona elementos fixos fora das funções
const continueButton = document.getElementById('continue-btn');
const inputDestino = document.querySelector('.search-box');
let selectedCity = '';

// Função para selecionar uma cidade
function selectCity(cityName, event) {
  const destinoElement = event.target.closest('.destination');
  if (!destinoElement) return;

  // Remove a classe 'selected' de outras cidades
  document.querySelectorAll('.destination.selected').forEach(el => el.classList.remove('selected'));

  // Adiciona a classe 'selected' à cidade clicada
  destinoElement.classList.add('selected');

  // Recupera o ID da cidade vindo do atributo data-id
  const cityId = destinoElement.dataset.id;

  // Armazena o nome e o ID da cidade no localStorage
  const cityData = {
    id: cityId,
    name: cityName
  };
  localStorage.setItem('selectedCity', JSON.stringify(cityData));

  // Habilita o botão "Continuar"
  continueButton.disabled = false;
}

// Redireciona para a próxima página
function irParaProximaPagina() {
  window.location.href = "/datasroteiro";
}

// Habilita o botão "Continuar" com base no campo de texto
inputDestino.addEventListener('input', () => {
  continueButton.disabled = inputDestino.value.trim() === '';
});


//------------------------------------------------------------------------------------------------
function showDates() {
  // Recupera o nome da cidade do LocalStorage
  const cityFromStorage = localStorage.getItem('selectedCity');

  // Parse o JSON para obter o objeto cidade
  const cityData = JSON.parse(cityFromStorage);

  // Atualiza o campo de entrada com o nome da cidade
  const cityNameInput = document.getElementById('city-name');
  if (cityNameInput) {
    cityNameInput.value = cityData.name; // Use apenas o nome da cidade
  }
}


