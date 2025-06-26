// Atualizado para usar o backend via Flask/API

// Função para calcular dias entre duas datas
function calculateDaysBetween(startDate, endDate) {
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return difference + 1;
}

function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' };
  return new Date(date).toLocaleDateString('pt-BR', options);
}

// Função para criar as colunas do Kanban
function createBaiaHTML(dataInicio, dataFim) {
  const kanbanContainer = document.querySelector('.kanban');
  kanbanContainer.innerHTML = '';

  const totalDays = calculateDaysBetween(dataInicio, dataFim);

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(dataInicio + "T00:00:00");
    currentDate.setDate(currentDate.getDate() + i);
    const formattedDate = formatDate(currentDate);

    const baiaHTML = `
      <div class="day-column">
        <div class="containerdat">
          <div class="day-header">Dia ${i + 1} | ${formattedDate}</div>
        </div>
        <div class="add-task-container">
          <button class="add-task">+</button>
        </div>
        <div class="task-card"></div>
      </div>
    `;

    kanbanContainer.innerHTML += baiaHTML;
  }
}

// Carrega roteiro e passeios do backend
async function loadRoteiroFromBackend() {
  try {
    const response = await fetch('/api/roteiroAtual', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) throw new Error("Erro ao carregar roteiro");

    const roteiro = await response.json();
    const { nome_roteiro, data_inicial, data_final, id_roteiro } = roteiro;

    // Atualiza nome da cidade
    const nomeCidadeElement = document.getElementById('nome-cidade');
    if (nomeCidadeElement) {
      nomeCidadeElement.textContent = nome_roteiro;
    }

    createBaiaHTML(data_inicial, data_final);
    await carregarPasseiosDoBackend(id_roteiro);

  } catch (error) {
    console.error("Erro ao carregar roteiro:", error);
  }
}

async function carregarPasseiosDoBackend(idRoteiro) {
  try {
    const response = await fetch(`/api/passeios/${idRoteiro}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) throw new Error("Erro ao carregar passeios");

    const passeios = await response.json();
    passeios.forEach(addTourToColumn);

  } catch (error) {
    console.error("Erro ao carregar passeios:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadRoteiroFromBackend();
});