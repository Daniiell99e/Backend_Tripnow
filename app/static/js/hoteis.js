document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Pega a cidade selecionada no localStorage
    const dadosRoteiro = localStorage.getItem('dadosRoteiro');
    if (!dadosRoteiro) {
      console.warn('Nenhuma cidade selecionada no localStorage.');
      return;
    }

    const cidade = JSON.parse(dadosRoteiro);
    const idDestinoSelecionado = cidade.fk_id_destino;

    // Faz a requisição para buscar os hotéis
    const resposta = await fetch('/api/hoteis');
    if (!resposta.ok) throw new Error(`Erro na requisição: ${resposta.status}`);

    const hoteis = await resposta.json();

    // Filtra os hotéis que pertencem ao destino escolhido
    const hoteisFiltrados = hoteis.filter(hotel => hotel.fk_id_destino == idDestinoSelecionado);

    const listaHoteis = document.querySelector('.hotel-list');
    if (!listaHoteis) {
      console.error('Elemento .hotel-list não encontrado');
      return;
    }

    listaHoteis.innerHTML = ''; // limpa a lista

    if (hoteisFiltrados.length === 0) {
      listaHoteis.innerHTML = '<p>Nenhum hotel encontrado para este destino.</p>';
      return;
    }

    // Criar um contador para cada destino
    const destinoContador = {};

    // Cria os cards para os hotéis filtrados
    hoteisFiltrados.forEach(hotel => {
      // Atualiza o contador por destino
      if (!destinoContador[hotel.nome_destino]) {
        destinoContador[hotel.nome_destino] = 1;
      } else {
        destinoContador[hotel.nome_destino]++;
      }

      // Pega o número de ocorrência atual
      const numeroImagem = destinoContador[hotel.nome_destino];

      // Salva o número dentro do objeto hotel
      hotel.numeroImagem = numeroImagem;

      const card = document.createElement('div');
      card.className = 'hotel-card';
      card.dataset.hotelId = hotel.id_hotel;

      card.innerHTML = `
        <img src="static/assets/imagens/hotel-${hotel.nome_destino}${numeroImagem}.jpg" alt="${hotel.nome_hotel}">
        <h3>${hotel.nome_hotel}</h3>
      `;

      card.addEventListener('click', () => mostrarDetalhesHotel(hotel));
      listaHoteis.appendChild(card);
    });

  } catch (error) {
    console.error('Erro ao buscar hotéis:', error);
  }
});

function mostrarDetalhesHotel(hotel) {
  document.getElementById('hotel-selection')?.classList.add('hidden');
  document.getElementById('hotel-details')?.classList.remove('hidden');

  document.getElementById('hotel-image').src = `static/assets/imagens/hotel-${hotel.nome_destino}${hotel.numeroImagem}.jpg`;
  document.getElementById('hotel-name').textContent = hotel.nome_hotel;
  document.getElementById('hotel-description').textContent = hotel.hotel_descricao;

  // Atualiza endereço dinamicamente
  const enderecoElement = document.getElementById('hotel-endereco');
  if (enderecoElement) {
    enderecoElement.textContent = hotel.endereco;
  }

  // Atualiza avaliações dinamicamente
  const avaliacoesContainer = document.getElementById('hotel-avaliacoes');
  if (avaliacoesContainer) {
    avaliacoesContainer.innerHTML = ''; // Limpa avaliações antigas

    if (hotel.avaliacoes && hotel.avaliacoes.length > 0) {
      hotel.avaliacoes.forEach(avaliacao => {
        const p = document.createElement('p');
        const estrelas = '⭐'.repeat(avaliacao.nota_avaliacao);
        p.innerHTML = `<strong>${estrelas}</strong> ${avaliacao.desc_avaliacao}`;
        avaliacoesContainer.appendChild(p);
      });
    } else {
      avaliacoesContainer.innerHTML = '<p>Este hotel ainda não possui avaliações.</p>';
    }
  }

  // Confirmação
  document.getElementById('continue-to-confirmation').onclick = () => {
    document.getElementById('hotel-details').classList.add('hidden');
    document.getElementById('hotel-confirmation').classList.remove('hidden');

    document.getElementById('confirm-hotel-image').src = `static/assets/imagens/hotel-${hotel.nome_destino}${hotel.numeroImagem}.jpg`;
    document.getElementById('confirm-hotel-name').textContent = hotel.nome_hotel;
    
  };

    // Agora vamos colocar o id no botão:
    const botao = document.getElementById('continue-btn');
    botao.setAttribute('onclick', `showHorario(${hotel.id_hotel})`);

  document.getElementById('remove-hotel').onclick = () => {
    document.getElementById('hotel-confirmation').classList.add('hidden');
    document.getElementById('hotel-selection').classList.remove('hidden');
  };
}


