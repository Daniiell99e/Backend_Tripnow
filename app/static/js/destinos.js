async function carregarImagem(nome) {
  const extensoes = ['webp', 'jpeg', 'jpg', 'png'];
  const nomeFormatado = nome.toLowerCase().replace(/ /g, '');

  for (const ext of extensoes) {
    const caminho = `../static/assets/imagens/${nomeFormatado}.${ext}`;
    try {
      const resposta = await fetch(caminho, { method: 'HEAD' });
      if (resposta.ok) {
        return caminho;
      }
    } catch (erro) {
      // Continua tentando com a próxima extensão
    }
  }

  // Imagem padrão se nenhuma for encontrada
  return '../static/assets/imagens/default.jpg';
}

async function carregarDestinos() {
  try {
    const resposta = await fetch('/destinos');
    const destinos = await resposta.json();

    const container = document.getElementById('lista-destinos');
    container.innerHTML = '';

    for (const destino of destinos) {
      const div = document.createElement('div');
      div.classList.add('destination');
      div.setAttribute('onclick', `selectCity('${destino.nome_destino}', event)`);
      div.setAttribute('loading', 'lazy');
      div.setAttribute('aria-label', `Selecionar ${destino.nome_destino}`);
      div.dataset.id = destino.id_destino;

      const imagemUrl = await carregarImagem(destino.nome_destino);

      div.innerHTML = `
        <h1>${destino.nome_destino}</h1>
        <img src="${imagemUrl}" alt="${destino.nome_destino} ">
      `;

      container.appendChild(div);
    }

  } catch (erro) {
    console.error('Erro ao carregar destinos:', erro);
  }
}

window.onload = carregarDestinos;