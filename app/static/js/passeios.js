// Configurações globais
const API_BASE_URL = '/api';
let ROTEIRO_ATUAL = null; // Será carregado dinamicamente

// Função para carregar roteiro atual
async function carregarRoteiroAtual() {
    try {
        const response = await fetch(`${API_BASE_URL}/roteiroAtual`);
        if (response.ok) {
            ROTEIRO_ATUAL = await response.json();
            // console.log('Roteiro atual carregado:', ROTEIRO_ATUAL);
            
            // Atualizar nome da cidade/roteiro no header
            document.getElementById('nome-cidade').textContent = ROTEIRO_ATUAL.nome_roteiro;
            
            // Gerar os dias do roteiro
            gerarDiasRoteiro();
            
            // Carregar e exibir passeios existentes (que já vêm na resposta)
            carregarPasseiosExistentes();
            
            return true;
        } else {
            console.error('Erro ao carregar roteiro atual');
            showMessage('Erro ao carregar informações do roteiro', 'error');
            return false;
        }
    } catch (error) {
        console.error('Erro na requisição do roteiro:', error);
        showMessage('Erro de conexão ao carregar roteiro', 'error');
        return false;
    }
}

// Função para carregar passeios existentes do roteiro atual
function carregarPasseiosExistentes() {
    if (!ROTEIRO_ATUAL || !ROTEIRO_ATUAL.passeios) {
        // console.log('Nenhum passeio encontrado no roteiro atual');
        return;
    }
    
    // console.log('Carregando passeios existentes:', ROTEIRO_ATUAL.passeios);
    
    // Adicionar cada passeio na coluna correta
    ROTEIRO_ATUAL.passeios.forEach(passeio => {
        // console.log('Processando passeio:', passeio);
        adicionarPasseioNaColuna(passeio, passeio.id);
    });
    
    // console.log(`${ROTEIRO_ATUAL.passeios.length} passeios carregados com sucesso`);
}

// Função para criar elemento de passeio
function createTourElement(tour) {
    const tourElement = document.createElement('div');
    tourElement.className = 'tour-card';
    tourElement.setAttribute('data-tour-id', tour.id);
    
    // Processar endereço para exibição
    let locationText = 'Local não informado';
    if (tour.endereco) {
        const endereco = tour.endereco;
        locationText = `${endereco.rua}, ${endereco.bairro}`;
        if (endereco.complemento && endereco.complemento.trim()) {
            locationText += ` - ${endereco.complemento}`;
        }
    }
    
    // Formatar preço
    const price = parseFloat(tour.preco || 0);
    
    tourElement.innerHTML = `
        <div class="tour-content">
            <h4>${tour.nome}</h4>
            <div class="tour-details">
                <span class="duration"><i class="far fa-clock"></i> ${tour.duracao}</span>
                <span class="price"><i class="fas fa-tag"></i> R$ ${price.toFixed(2)}</span>
            </div>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${locationText}</p>
            <p class="description">${tour.descricao}</p>
            <span class="category">${tour.categoria}</span>
            <div class="tour-actions">
                <button onclick="editTour(${tour.id})" class="edit-btn">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="removeTour(${tour.id})" class="remove-btn">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        </div>
    `;
    
    return tourElement;
}

// Função para calcular diferença em dias
function calcularDiferenciaDias(dataInicial, dataFinal) {
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);
    const diffTime = Math.abs(fim - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // +1 para incluir o primeiro dia
}

// Função para obter nome do dia da semana
function obterNomeDiaSemana(data) {
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return diasSemana[new Date(data).getDay()];
}

// Função para formatar data no padrão brasileiro
function formatarDataBrasileira(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para adicionar dias a uma data
function adicionarDias(data, dias) {
    const resultado = new Date(data);
    resultado.setDate(resultado.getDate() + dias);
    return resultado;
}

// Função para gerar os dias do roteiro
function gerarDiasRoteiro() {
    if (!ROTEIRO_ATUAL) return;

    const kanbanContainer = document.querySelector('.kanban');
    kanbanContainer.innerHTML = ''; // Limpar conteúdo existente

    const totalDias = calcularDiferenciaDias(ROTEIRO_ATUAL.data_inicial, ROTEIRO_ATUAL.data_final);
    // console.log(`Gerando ${totalDias} dias para o roteiro`);

    for (let i = 0; i < totalDias; i++) {
        const dataAtual = adicionarDias(ROTEIRO_ATUAL.data_inicial, i);
        const diaSemana = obterNomeDiaSemana(dataAtual);
        const dataFormatada = formatarDataBrasileira(dataAtual);
        
        // Criar coluna do dia
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        dayColumn.setAttribute('data-dia', i + 1);
        dayColumn.setAttribute('data-data', dataAtual.toISOString().split('T')[0]);
        dayColumn.setAttribute('data-dia-semana', diaSemana);
        
        dayColumn.innerHTML = `
            <div class="containerdat">
                <div class="day-header">Dia ${i + 1} | ${diaSemana}, ${dataFormatada}</div>
            </div>
            <div class="add-task-container">
                <button class="add-task" onclick="openModal(${i + 1}, '${dataAtual.toISOString().split('T')[0]}', '${diaSemana}')">+</button>
            </div>
            <div class="task-card">
                
            </div>
            
        `;
        
        kanbanContainer.appendChild(dayColumn);
    }

    // Adicionar animação de fade-in
    setTimeout(() => {
        document.querySelectorAll('.day-column').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
}

// Função para obter token CSRF  
function getCSRFToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : null;
}

// Variáveis para armazenar o contexto do modal
let MODAL_CONTEXT = {
    dia: null,
    data: null,
    diaSemana: null
};

function showMessage(message, type = 'success') {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    container.innerHTML = '';
    container.appendChild(messageDiv);
    
    // Remove mensagem após 5 segundos
    setTimeout(() => {
        if (container.contains(messageDiv)) {
            container.removeChild(messageDiv);
        }
    }, 5000);
}

// Função para formatação de CEP
function formatCEP(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 5) {
        return cleaned;
    }
    return cleaned.slice(0, 5) + '-' + cleaned.slice(5, 8);
}

// Event listener para formatação automática do CEP
document.getElementById('tourCep').addEventListener('input', function(e) {
    e.target.value = formatCEP(e.target.value);
});

// Função para converter duração para formato aceito pelo backend
function formatDuration(timeString) {
    if (!timeString) return '00:00:00';
    
    // Se já tem segundos, retorna como está
    if (timeString.split(':').length === 3) {
        return timeString;
    }
    
    // Se só tem horas:minutos, adiciona :00
    return timeString + ':00';
}

// Função para obter data atual no formato adequado
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Função para obter dia da semana em português
function getDayOfWeek(date) {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[new Date(date).getDay()];
}

// Função para abrir o modal
function openModal(dia = null, data = null, diaSemana = null) {
    // Verificar se o roteiro foi carregado
    if (!ROTEIRO_ATUAL) {
        showMessage('Roteiro não carregado. Recarregue a página.', 'error');
        return;
    }

    // Armazenar contexto do modal
    MODAL_CONTEXT = {
        dia: dia,
        data: data,
        diaSemana: diaSemana
    };

    // console.log('Abrindo modal para:', MODAL_CONTEXT);

    document.getElementById('tourModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Atualizar título do modal se houver contexto específico
    if (dia && data && diaSemana) {
        const modalTitle = document.querySelector('#tourModal h2');
        modalTitle.textContent = `Cadastro de Passeio - Dia ${dia} (${diaSemana})`;
    }
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('tourModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpa o formulário
    document.getElementById('tourForm').reset();
    document.getElementById('messageContainer').innerHTML = '';
    
    // Restaura título original
    const modalTitle = document.querySelector('#tourModal h2');
    modalTitle.textContent = 'Cadastro de Passeio';
    
    // Limpa contexto
    MODAL_CONTEXT = {
        dia: null,
        data: null,
        diaSemana: null
    };
}

// Fecha modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('tourModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Função principal para enviar dados
async function submitTour(formData) {
    // Verificar se o roteiro foi carregado
    if (!ROTEIRO_ATUAL) {
        showMessage('Roteiro não carregado. Recarregue a página.', 'error');
        return;
    }

    // Usar data do contexto do modal ou data atual como fallback
    let dataPasseio, diaSemana, diaPasseio;
    
    if (MODAL_CONTEXT.data && MODAL_CONTEXT.diaSemana && MODAL_CONTEXT.dia) {
        dataPasseio = MODAL_CONTEXT.data;
        diaSemana = MODAL_CONTEXT.diaSemana;
        diaPasseio = MODAL_CONTEXT.dia;
    } else {
        // Fallback para data atual
        const hoje = new Date();
        dataPasseio = hoje.toISOString().split('T')[0];
        diaSemana = getDayOfWeek(dataPasseio);
        diaPasseio = 1;
        // console.log('Usando data atual como fallback:', dataPasseio);
    }
    
    // Validação do preço
    const preco = parseFloat(formData.get('tourPrice'));
    if (isNaN(preco) || preco < 0) {
        showMessage('Preço deve ser um número válido e positivo', 'error');
        return;
    }
    
    // Validação do CEP
    const cepValue = formData.get('tourCep');
    if (!cepValue || cepValue.replace(/\D/g, '').length !== 8) {
        showMessage('CEP deve ter 8 dígitos', 'error');
        return;
    }
    
    const tourData = {
        nome: formData.get('tourName').trim(),
        duracao: formatDuration(formData.get('tourDuration')),
        preco: preco,
        categoria: formData.get('tourCategory'),
        descricao: formData.get('tourDescription').trim(),
        data_passeio: dataPasseio,
        dia_semana: diaSemana,
        dia_passeio: diaPasseio,
        fk_id_roteiro: ROTEIRO_ATUAL.id_roteiro, // Usar ID do roteiro atual
        endereco: {
            cep: cepValue.replace(/\D/g, ''), // Remove formatação, mantém apenas números
            rua: formData.get('tourRua').trim(),
            bairro: formData.get('tourBairro').trim(),
            complemento: formData.get('tourComplemento') ? formData.get('tourComplemento').trim() : ''
        }
    };

    // console.log('Dados sendo enviados:', tourData);
    // console.log('Dados do endereço:', tourData.endereco);
    // console.log('Contexto do modal:', MODAL_CONTEXT);

    try {
        const response = await fetch(`${API_BASE_URL}/passeios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
                'Accept': 'application/json'
            },
            body: JSON.stringify(tourData)
        });

        // console.log('Response status:', response.status);
        // console.log('Response headers:', response.headers);

        // Verifica se a resposta é JSON válida
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            console.error('Resposta não é JSON:', textResponse);
            showMessage('Erro interno do servidor. Verifique os logs.', 'error');
            return;
        }

        const result = await response.json();

        if (response.ok) {
            showMessage('Passeio cadastrado com sucesso!', 'success');
            // console.log('Passeio criado:', result);
            
            // Adicionar o passeio à coluna correta usando a nova estrutura
            const passeioCompleto = {
                ...tourData,
                id: result.id || result.id_passeio
            };
            adicionarPasseioNaColuna(passeioCompleto, passeioCompleto.id);
            
            // Limpa formulário após sucesso
            setTimeout(() => {
                closeModal();
            }, 2000);
            
        } else {
            console.error('Erro do servidor:', result);
            showMessage(result.erro || 'Erro ao cadastrar passeio', 'error');
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        if (error.name === 'SyntaxError') {
            showMessage('Erro de formato de resposta do servidor', 'error');
        } else {
            showMessage('Erro de conexão. Tente novamente.', 'error');
        }
    }
}

// Função para adicionar passeio na coluna correta
function adicionarPasseioNaColuna(dadosPasseio, idPasseio) {
    // console.log('Tentando adicionar passeio:', {
    //     id: idPasseio,
    //     dia_passeio: dadosPasseio.dia_passeio,
    //     data_passeio: dadosPasseio.data_passeio,
    //     nome: dadosPasseio.nome
    // });

    // Procurar a coluna baseada no dia_passeio (mais confiável)
    let diaColuna = document.querySelector(`[data-dia="${dadosPasseio.dia_passeio}"]`);
    
    // Se não encontrou pelo dia, tentar pela data
    if (!diaColuna && dadosPasseio.data_passeio) {
        diaColuna = document.querySelector(`[data-data="${dadosPasseio.data_passeio}"]`);
    }
    
    // Fallback para primeira coluna disponível
    if (!diaColuna) {
        console.warn('Coluna específica não encontrada, usando primeira coluna disponível');
        diaColuna = document.querySelector('.day-column');
    }
    
    if (!diaColuna) {
        console.error('Nenhuma coluna de dia encontrada');
        return;
    }

    // console.log('Adicionando passeio na coluna:', {
    //     coluna_dia: diaColuna.getAttribute('data-dia'),
    //     coluna_data: diaColuna.getAttribute('data-data'),
    //     passeio_dia: dadosPasseio.dia_passeio,
    //     passeio_data: dadosPasseio.data_passeio
    // });

    // Encontrar o container de task-card dentro da coluna
    const taskCardContainer = diaColuna.querySelector('.task-card');
    
    if (!taskCardContainer) {
        console.error('Container task-card não encontrado na coluna');
        return;
    }

    // Remover mensagem padrão se existir
    const mensagemPadrao = taskCardContainer.querySelector('p');
    if (mensagemPadrao && mensagemPadrao.textContent.includes('Clique no botão +')) {
        mensagemPadrao.remove();
    }

    // Criar elemento do passeio usando a nova função
    const passeioElement = createTourElement(dadosPasseio);

    // Adicionar o elemento ao container
    taskCardContainer.appendChild(passeioElement);

    // Adicionar animação
    passeioElement.style.opacity = '0';
    setTimeout(() => {
        passeioElement.style.opacity = '1';
    }, 100);

    // console.log('Passeio adicionado com sucesso na coluna', diaColuna.getAttribute('data-dia'));
}

// Função para editar passeio
function editTour(tourId) {
    // console.log('Editando passeio:', tourId);
    showMessage('Funcionalidade de edição será implementada em breve', 'info');
}

// Função para remover passeio
async function removeTour(tourId) {
    if (!confirm('Tem certeza que deseja remover este passeio?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/passeios/${tourId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': getCSRFToken(),
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showMessage('Passeio removido com sucesso!', 'success');
            
            // Remover elemento da interface
            const tourElement = document.querySelector(`[data-tour-id="${tourId}"]`);
            if (tourElement) {
                tourElement.style.opacity = '0';
                setTimeout(() => {
                    tourElement.remove();
                }, 300);
            }
        } else {
            const result = await response.json();
            showMessage(result.erro || 'Erro ao remover passeio', 'error');
        }
    } catch (error) {
        console.error('Erro ao remover passeio:', error);
        showMessage('Erro de conexão. Tente novamente.', 'error');
    }
}

// Event listener para o formulário
document.getElementById('tourForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.save-btn');
    const originalText = submitBtn.textContent;
    
    // Desabilita botão e mostra loading
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    submitBtn.textContent = 'Salvando...';
    
    try {
        const formData = new FormData(this);
        await submitTour(formData);
    } finally {
        // Restaura botão
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        submitBtn.textContent = originalText;
    }
});

// Inicialização da página
document.addEventListener('DOMContentLoaded', async function() {
    // console.log('Sistema de cadastro de passeios carregado');
    
    // Carregar roteiro atual
    const roteiroCarregado = await carregarRoteiroAtual();
    
    if (!roteiroCarregado) {
        console.error('Falha ao carregar roteiro atual');
        return;
    }
    
    // console.log('Página inicializada com sucesso');
});