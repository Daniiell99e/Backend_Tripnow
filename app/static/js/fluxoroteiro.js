// Seleciona elementos fixos fora das funções
const continueButton = document.getElementById('continue-btn');
const inputDestino = document.querySelector('.search-box');
let dadosRoteiro = '';

// Função para selecionar uma cidade
function selectCity(cityName, event) {
  const destinoElement = event.target.closest('.destination');
  if (!destinoElement) return;

  // Remove a classe 'selected' de outras cidades
  document.querySelectorAll('.destination.selected').forEach(el => el.classList.remove('selected'));

  // Adiciona a classe 'selected' à cidade clicada
  destinoElement.classList.add('selected');

  // Recupera o ID da cidade vindo do atributo data-id
  const cityId = parseInt(destinoElement.dataset.id);

  // Armazena o nome e o ID da cidade no localStorage
  const cityData = {
    fk_id_destino: cityId,
    nome_roteiro: cityName
  };
  localStorage.setItem('dadosRoteiro', JSON.stringify(cityData));

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
  const cityFromStorage = localStorage.getItem('dadosRoteiro');

  // Parse o JSON para obter o objeto cidade
  const cityData = JSON.parse(cityFromStorage);

  // Atualiza o campo de entrada com o nome da cidade
  const cityNameInput = document.getElementById('city-name');
  if (cityNameInput) {
    cityNameInput.value = cityData.nome_roteiro; // Use apenas o nome da cidade
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
      updateDadosRoteiroWithDates(startDateStr, endDateStr);
    }
  } else {
    hotelsButton.disabled = true;
  }
}

function updateDadosRoteiroWithDates(startDate, endDate) {
  const existingData = localStorage.getItem('dadosRoteiro');

  if (existingData) {
    const cityData = JSON.parse(existingData);

    // Atualiza as datas no objeto
    cityData.data_inicial = startDate;
    cityData.data_final = endDate;

    // Salva de volta no localStorage
    localStorage.setItem('dadosRoteiro', JSON.stringify(cityData));
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
  const dadosRoteiro = localStorage.getItem('dadosRoteiro');
  if (!dadosRoteiro) {
    console.error('Nenhuma cidade selecionada no localStorage.');
    return;
  }

  const cidade = JSON.parse(dadosRoteiro);

  // Atualiza o campo com o ID do hotel escolhido
  cidade.id_hotel = idHotel;

  // Salva novamente no localStorage
  localStorage.setItem('dadosRoteiro', JSON.stringify(cidade));

  // Redireciona para a página de horários
  window.location.href = '/horarios'; // Se for arquivo local, pode ser 'horarios.html'
}

//----------------------------------------------
async function salvarRoteiro(event) {
    event.preventDefault();

    const passeio_inicio = document.getElementById('start-time').value;
    const passeio_fim = document.getElementById('end-time').value;
    const dados = JSON.parse(localStorage.getItem('dadosRoteiro'));

    if (!dados) {
        alert("Erro: dadosRoteiro não encontrados no localStorage");
        return;
    }

    dados.passeio_inicio = passeio_inicio;
    dados.passeio_fim = passeio_fim;

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    try {
        const resposta = await fetch('/criarRoteiro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            const respostaJson = await resposta.json();
            console.log("Sucesso:", respostaJson);
            window.location.href = "/seusRoteiros";
        } else {
            const erroTexto = await resposta.text();
            console.error("Erro do servidor:", erroTexto);
            alert("Erro ao salvar roteiro. Veja o console.");
        }
    } catch (erro) {
        console.error("Erro na comunicação:", erro);
        alert("Erro na comunicação com o servidor: " + erro.message);
    }
}
