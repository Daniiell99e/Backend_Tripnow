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


function checkDates() {
  const startDateStr = document.getElementById('start-date').value;
  const endDateStr = document.getElementById('end-date').value;
  const hotelsButton = document.getElementById('botaoAvancar');

  if (startDateStr && endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Data de hoje sem horário (00:00:00) para comparar só a data
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      alert('A data de início não pode ser anterior à data de hoje.');
      hotelsButton.disabled = true;
    } else if (startDate > endDate) {
      alert('A data de início não pode ser maior que a data de fim.');
      hotelsButton.disabled = true;
    } else {
      hotelsButton.disabled = false;
      updateSelectedCityWithDates(startDateStr, endDateStr);
    }
  } else {
    hotelsButton.disabled = true;
  }
}

function updateSelectedCityWithDates(startDate, endDate) {
  const existingData = localStorage.getItem('selectedCity');

  if (existingData) {
    const cityData = JSON.parse(existingData);

    // Atualiza as datas no objeto
    cityData.startDate = startDate;
    cityData.endDate = endDate;

    // Salva de volta no localStorage
    localStorage.setItem('selectedCity', JSON.stringify(cityData));
  } else {
    alert('Nenhuma cidade foi selecionada ainda.');
  }
}


function irParaHotel() {
    // Exemplo: salvar algo no localStorage ou checar uma condição
    window.location.href = '/hotel';

    
  }

  function showHorario(idHotel) {
  // Recupera a cidade já salva no localStorage
  const selectedCity = localStorage.getItem('selectedCity');
  if (!selectedCity) {
    console.error('Nenhuma cidade selecionada no localStorage.');
    return;
  }

  const cidade = JSON.parse(selectedCity);

  // Atualiza o campo com o ID do hotel escolhido
  cidade.hotelSelecionadoId = idHotel;

  // Salva novamente no localStorage
  localStorage.setItem('selectedCity', JSON.stringify(cidade));

  // Redireciona para a página de horários
  window.location.href = '/horarios'; // Se for arquivo local, pode ser 'horarios.html'
}

function salvarHorariosPasseios() {
  const startTime = document.getElementById('start-time').value;
  const endTime = document.getElementById('end-time').value;

  const selectedCity = localStorage.getItem('selectedCity');
  if (!selectedCity) {
    console.error('Nenhuma cidade selecionada no localStorage.');
    return;
  }

  const cidade = JSON.parse(selectedCity);

  cidade.horarioInicioPasseio = startTime;
  cidade.horarioFimPasseio = endTime;

  localStorage.setItem('selectedCity', JSON.stringify(cidade));

  console.log('Horários salvos:', cidade);
}











