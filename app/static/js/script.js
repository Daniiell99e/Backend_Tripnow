//----------------------------------------Função para selecionar cidade---------------------------------------------------------------

// let selectedHotel = '';
// let selectedHotelId = null;

// icone de clique para expandir menu lateral - inicio
document.getElementById('open_btn').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open-sidebar');
});
// icone de clique para expandir menu lateral - final


// será usado partes do codigo js para a comunicação com o backend ----------------------------------------......
// // Carrega próxima viagem na tela inicial - início
// document.addEventListener("DOMContentLoaded", function () {
//   // Identifica o elemento <section> com a classe "proximaviagem"
//   const proximaviagemSection = document.querySelector("section.proximaviagem");

//   // Caminho atual da página
//   const currentPath = window.location.pathname;

//   // Verifica se estamos na página inicial do GitHub Pages
//   const isIndexPage =
//     currentPath.endsWith("/index.html") ||
//     currentPath === "/Projeto_integrador/" || // Caminho base do GitHub Pages
//     currentPath === "/Projeto_integrador/index.html";

//   if (isIndexPage && proximaviagemSection) {
//     // Verifica se há dados armazenados no localStorage
//     const dadosViagem = JSON.parse(localStorage.getItem("dadosViagem"));

//     if (dadosViagem) {
//       // Extração dos dados armazenados
//       const { cidade, dataInicio, cityImage } = dadosViagem;

//       if (!cityImage) {
//         console.error("A propriedade 'cityImage' não foi encontrada em dadosViagem.");
//         return;
//       }

//       // Cálculo de dias, horas e minutos restantes
//       const hoje = new Date();
//       const dataInicioDate = new Date(dataInicio);
//       const diferencaMs = dataInicioDate - hoje;

//       const diasRestantes = Math.max(0, Math.floor(diferencaMs / (1000 * 60 * 60 * 24)));
//       const horasRestantes = Math.max(0, Math.floor((diferencaMs / (1000 * 60 * 60)) % 24));
//       const minutosRestantes = Math.max(0, Math.floor((diferencaMs / (1000 * 60)) % 60));

//       // Criação do conteúdo dinâmico
//       const link = document.createElement("a");
//       link.href = "src/pages/detalhesviagem.html";
//       link.textContent = "Detalhes da viagem >";
//       link.className = "card-editar";

//       proximaviagemSection.innerHTML = `
//         <div class="card">
//           <img src="${cityImage}" alt="${cidade}" class="destino-imagem">
//           <h3>${cidade}</h3>
//           <p>Está chegando!</p>
//           <div class="contador">
//             <div class="tempo"><span>Dias</span><strong>${diasRestantes}</strong></div>
//             <div class="tempo"><span>Horas</span><strong>${horasRestantes}</strong></div>
//             <div class="tempo"><span>Minutos</span><strong>${minutosRestantes}</strong></div>
//           </div>
//           ${link.outerHTML}
//         </div>
//       `;
//     } else {
//       // Se não houver dados no localStorage, esconde a seção
//       proximaviagemSection.style.display = "none";
//     }
//   }
// });

// Carrega próxima viagem na tela inicial - final



// function selectCity(city, event) {
//   selectedCity = city;

//   // Remove a classe 'selected' de todas as cidades
//   document.querySelectorAll('.destination').forEach((el) => el.classList.remove('selected'));

//   // Adiciona a classe 'selected'
//   const destinoElement = event.target.closest('.destination');
//   destinoElement.classList.add('selected');

//   // Pega o id_destino
//   const cityId = destinoElement.dataset.id;

//   // Armazena no localStorage
//   localStorage.setItem('id_destino_selecionado', cityId);

//   // Habilita botão continuar (ou próximo passo)
//   const button = document.getElementById('continue-btn');
//   button.disabled = false;
// }




// // Função para selecionar uma cidade e armazená-la no LocalStorage
// function selectCity(city, event) {
// selectedCity = city;

// //  Remove a classe 'selected' de todas as cidades para destacar a selecionada
// document.querySelectorAll('.destination').forEach((el) => el.classList.remove('selected'));

// //  Adiciona a classe 'selected' à cidade clicada
// event.target.closest('.destination').classList.add('selected');

// //Gera um ID único para a cidade selecionada
// const cityId = Date.now();

// //   // Obtém o caminho da imagem (src) da cidade selecionada
// const cityImage = event.target.closest('.destination').querySelector('img').src;

// //  Cria um objeto com o ID, o nome da cidade e o caminho da imagem
//  const cityData = {
// name: city
// };

// //Armazena os dados da cidade selecionada no LocalStorage
// localStorage.setItem('selectedCity', JSON.stringify(cityData));

// //   // Habilita o botão de continuar
// const button = document.getElementById('continue-btn');
// button.disabled = false;
// }

// //---------------------------------------- Função para mostrar a página de datas -------------------------------------------------

// Função para mostrar a página de datas e carregar a cidade selecionada


// //---------------------------------------- Função para validar datas -------------------------------------------------------------

// Função para validar datas e habilitar o botão para seleção de hotéis



// //---------------------------------------- Função para mostrar a página de hotéis ------------------------------------------------

// // Dados dos hotéis disponíveis (expandindo o objeto original)
// const hotels = {
//   // Rio de Janeiro (baseado no código original)
//   1: { 
//       name: "Atlantic Bussines", 
//       image: "../assets/imagens/hotel-1-desc.jpg", 
//       description: "Situado no centro do Rio de Janeiro e a 4 minutos a pé da estação de metrô Cinelândia, este hotel informal fica a 11 minutos a pé do Museu de Arte Moderna do Rio de Janeiro e a 1,2 km do Aeroporto Santos Dumont.",
//       cidade: "rio de janeiro",
//       endereco: "Centro, Rio de Janeiro - RJ",
//       telefone: "(21) 3xxx-xxxx",
//       avaliacoes: [
//           { estrelas: 5, comentario: "Localização excelente!" },
//           { estrelas: 4, comentario: "Bom custo-benefício." }
//       ]
//   },
//   2: { 
//       name: "Hotel Nacional", 
//       image: "../assets/imagens/hotel-2.jpg", 
//       description: "Hotel tradicional com vista panorâmica.",
//       cidade: "rio de janeiro",
//       endereco: "Zona Sul, Rio de Janeiro - RJ",
//       telefone: "(21) 3yyy-yyyy",
//       avaliacoes: [
//           { estrelas: 5, comentario: "Vista incrível!" },
//           { estrelas: 4, comentario: "Ótimo serviço." }
//       ]
//   },
//   3: { 
//       name: "Hotel Comfort", 
//       image: "../assets/imagens/hotel-3.jpg", 
//       description: "Hotel confortável e bem localizado.",
//       cidade: "rio de janeiro",
//       endereco: "Zona Norte, Rio de Janeiro - RJ",
//       telefone: "(21) 3zzz-zzzz",
//       avaliacoes: [
//           { estrelas: 5, comentario: "Muito confortável!" },
//           { estrelas: 4, comentario: "Boa infraestrutura." }
//       ]
//   },
//   // Hotéis para outras cidades podem ser adicionados aqui
//   4: { 
//       name: "Hotel Salvador Palace", 
//       image: "../assets/imagens/hotel-salvador.jpg", 
//       description: "Hotel no coração de Salvador.",
//       cidade: "salvador",
//       endereco: "Pelourinho, Salvador - BA",
//       telefone: "(71) 3xxx-xxxx",
//       avaliacoes: [
//           { estrelas: 5, comentario: "Localização histórica incrível!" },
//           { estrelas: 4, comentario: "Ótima estrutura." }
//       ]
//   },
//   // Adicione mais hotéis conforme necessário
//   5: { 
//     name: "Hotel exemplo", 
//     image: "../assets/imagens/hotel-salvador.jpg", 
//     description: "Hotel no coração de Salvador.",
//     cidade: "salvador",
//     endereco: "Pelourinho, Salvador - BA",
//     telefone: "(71) 3xxx-xxxx",
//     avaliacoes: [
//         { estrelas: 5, comentario: "Localização histórica incrível!" },
//         { estrelas: 4, comentario: "Ótima estrutura." }
//     ]
// },
// 6: { 
//   name: "Bahiamar Hotel", 
//   image: "../assets/imagens/hotel-salvador3.jpg", 
//   description: "Situado na Praia do Jardim de Alah, a poucos passos de várias opções de lojas e entretenimento, o Bahiamar Hotel disponibiliza acesso Wi-Fi gratuito em toda a propriedade, estacionamento privativo gratuito com vigilância 24 horas e uma piscina exterior. O Centro de Convenções de Salvador fica a 3 km.",
//   cidade: "salvador",
//   endereco: "Rua João Mendes da Costa Filho, 125, Salvador",
//   telefone: "(71) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Tive uma experiência maravilhosa durante minha estadia!" },
//       { estrelas: 4, comentario: "Café da manhã excelente. Boa localização." }
//   ]
// },

// 7: { 
//   name: "Hotel Centro Naval", 
//   image: "../assets/imagens/hotel-buenos-aires1.jpg", 
//   description: "Os quartos do Hotel Centro Naval são confortavelmente mobiliados. Todos eles têm ar-condicionado, TV a cabo e cofre. Os banheiros incluem banheira, secador de cabelo e amenidades de banho gratuitas.",
//   cidade: "buenos aires",
//   endereco: "Jean Jaures, Balvanera, 1215 Buenos Aires",
//   telefone: "(54) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Bom valor, a internet era boa. O quarto era muito limpo, silencioso e funcional." },
//       { estrelas: 4, comentario: "Quarto espaçoso. Bom ar condicionado. Quarto limpo." }
//   ]
// },

// 8: { 
//   name: "Gran Hotel Argentino", 
//   image: "../assets/imagens/hotel-buenos-aires2.jpg", 
//   description: "Os encantadores quartos do Gran Hotel Argentino incluem comodidades modernas, tais como ar condicionado, televisão por cabo e um cofre. Alguns quartos oferecem vistas para a cidade.",
//   cidade: "buenos aires",
//   endereco: "Carlos Pellegrini, 37, 1009 Buenos Aires",
//   telefone: "(54) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Café da manhã muito bom. Hotel no centro da cidade, muito bem localizado." },
//       { estrelas: 4, comentario: "A localização do hotel é excelente. Os funcionários são bem atenciosos." }
//     ]
// },

// 9: { 
//   name: "Hotel BA Abasto", 
//   image: "../assets/imagens/hotel-buenos-aires3.jpg", 
//   description: "Hotel BA Abasto é um alojamento de 4 estrelas situado em Buenos Aires, a 3,2 km de Museu Nacional das Belas Artes e a 3,4 km de Teatro Colon.",
//   cidade: "buenos aires",
//   endereco: "896 Jean Jaures, Balvanera, 1215 Buenos Aires",
//   telefone: "(54) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Bom valor, a internet era boa. O quarto era muito limpo, silencioso e funcional." },
//       { estrelas: 4, comentario: "Quarto espaçoso. Bom ar condicionado. Quarto limpo. Funcionários educados" }
//     ]
// },

// 10: { 
//   name: "Hotel Vista do Vale", 
//   image: "../assets/imagens/hotel-gramado1.jpg", 
//   description: "Com vista para a natureza e um restaurante no local, o Hotel Vista do Vale é um alojamento situado em Gramado, a 800 metros do centro da cidade.",
//   cidade: "gramado",
//   endereco: "Av. das Hortênsias, 2989, Gramado",
//   telefone: "(54) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Funcionários muito atenciosos, ótimo custo benefício, café da manhã bom." },
//       { estrelas: 4, comentario: "Localização, simpatia dos funcionários, fácil acesso." }
//     ]
// },

// 11: { 
//   name: "Hotel Sky Gramado", 
//   image: "../assets/imagens/hotel-gramado2.jpg", 
//   description: "O Hotel Sky disponibiliza acomodações modernas em Gramado, uma estrutura em madeira e uma localização privilegiada apenas a 800 metros do centro da cidade. Está disponível acesso Wi-Fi gratuito.",
//   cidade: "gramado",
//   endereco: "Av. Das Hortensias, 680, Gramado",
//   telefone: "(54) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Todos atenciosos, café da manhã impecável como nunca vi em nenhum outro hotel." },
//       { estrelas: 4, comentario: "Gostamos da simpatia doa funcionários, do colchão, do café da manhã, do chá na recepção, da localização."}
//     ]
// },

// 12: { 
//   name: "Pousada do Verde Gramado", 
//   image: "../assets/imagens/hotel-gramado3.jpg", 
//   description: "Com uma localização atrativa no centro de Gramado, Pousada do Verde Gramado apresenta acesso Wi-Fi gratuito em toda a propriedade, um jardim e estacionamento privado gratuito para os hóspedes que viajam de carro.",
//   cidade: "gramado",
//   endereco: "Rua Tia Rita, Gramado City Centre, Gramado",
//   telefone: "(54) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Tudo bem limpo, localização boa, confortavel, preço acessível." },
//       { estrelas: 4, comentario: "A equipe foi sempre muito prestativa, tudo muito bem limpo e servido." }
//     ]
// },

// 13: { 
//   name: "Natal Praia Hotel", 
//   image: "../assets/imagens/hotel-natal1.jpg", 
//   description: "O Natal Praia Hotel beneficia de uma localização privilegiada, a 50 metros da Praia Dos Artistas e perto da popular zona de Ponta Negra.",
//   cidade: "natal",
//   endereco: "Av. Gov. Sílvio Pedroza, 19, Natal",
//   telefone: "(84) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Ótimo Lugar, piscina, quartos, café da manhã e atendimento, nota 10!" },
//       { estrelas: 4, comentario: "Da receptividade,os funcionários muito bem educados tudo perfeito" }
//     ]
// },

// 14: { 
//   name: "Villa Park Hotel", 
//   image: "../assets/imagens/hotel-natal2.jpg", 
//   description: "O Villa Park situa-se apenas a 500 metros do Centro Comercial Midway, em Natal. Disponibiliza um buffet de pequeno-almoço diário no seu restaurante.",
//   cidade: "natal",
//   endereco: "Avenida Senador Salgado Filho, 1525, Natal",
//   telefone: "(84) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Excelente atendimento dos funcionários. A suite do utlmo andar é muito boa." },
//       { estrelas: 4, comentario: "O Villa Park tem uma das melhores localizações de Natal: entre o maior shopping (Midway) e o Parque das Dunas, lugar belíssimo e excelente para andar e correr." }
//     ]
// },

// 15: { 
//   name: "Lumar Hotel PontaNegra", 
//   image: "../assets/imagens/hotel-natal3.jpg", 
//   description: "A apenas 70 metros da Praia de Ponta Negra, o aconchegante Lumar Hotel PontaNegra oferece vista para o mar, piscina ao ar livre e jardim encantador com terraço. Fica a 33 km do Aeroporto Internacional de São Gonçalo do Amarante.",
//   cidade: "natal",
//   endereco: "Av. Engenheiro Roberto Freire, 5120, Ponta Negra, Natal",
//   telefone: "(84) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Fomos muito bem recebidos, localizado em um local muito agradável, perto de restaurantes bons." },
//       { estrelas: 4, comentario: "mt bom, do lado da praia, com muitos restaurantes pertinhos. hotel limpinho e a piscina mt boa tb." }
//     ]
// },

// 16: { 
//   name: "Rede Andrade Docas", 
//   image: "../assets/imagens/hotel-belem1.jpg", 
//   description: "O Rede Andrade Docas está localizado em Belém, a 2 km da Basílica-Santuário de Nossa Senhora de Nazaré e a 800 metros da Catedral da Sé.",
//   cidade: "belém",
//   endereco: "532 Rua Senador Manoel Barata, Belém",
//   telefone: "(91) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Ótimo hotél. Numa localização ótima, dá pra ir à pé pra Estação das Docas. Custo-benefício excelente." },
//       { estrelas: 4, comentario: "Localização excelente, café da manhã com muitas opções, boas instalações, excelente custo-benefício" }
//     ]
// },

// 17: { 
//   name: "Belém Soft Hotel", 
//   image: "../assets/imagens/hotel-belem2.jpg", 
//   description: "O Belém Soft Hotel é um hotel económico localizado em Belém. Inclui acesso Wi-Fi gratuito e um pequeno-almoço gratuito com fruta fresca, pão, carnes frias e uma selecção de bebidas quentes e frias.",
//   cidade: "belém",
//   endereco: "Avenida Braz de Aguiar, 612 , Belém",
//   telefone: "(91) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Café da manhã bem diversificado, localização excelente, tudo limpo e quarto confortável, local pra deixar as malas antes e depois do checkin e checkout" },
//       { estrelas: 4, comentario: "O hotel é muito bem localizado e limpo. O café da manhã muito bom !" }
//     ]
// },

// 18: { 
//   name: "Hotel Princesa Louçã", 
//   image: "../assets/imagens/hotel-belem3.jpg", 
//   description: "Com uma localização privilegiada no centro da cidade de Belém, o Hotel Princesa Louçã proporciona belas vistas para os túneis de Guajará e Mangueiras. Dispõe de uma piscina, de um salão de beleza e de um ginásio.",
//   cidade: "belém",
//   endereco: "Avenida Presidente Vargas, 882, Belém",
//   telefone: "(91) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Hotel bonito, quarto amplo, limpo, bom café da manhã, com piscina, academia e boa localização." },
//       { estrelas: 4, comentario: "Bom blackout no quarto, camareiras super gentis! Café da manhã variado e farto!" }
//     ]
// },

// 19: { 
//   name: "HOTEL DU PRINTEMPS", 
//   image: "../assets/imagens/hotel-paris1.jpg", 
//   description: "Este hotel de 3 estrelas dispõe de quartos com ar condicionado e casa de banho privativa. O alojamento apresenta um serviço de concierge e depósito de bagagens.",
//   cidade: "paris",
//   endereco: "1 RUE DE L'ISLY, 8º arrondissement, 75008 Paris",
//   telefone: "(33) 3xxx-xxxx",
//   avaliacoes: [
//     { estrelas: 5, comentario: "Localização excelente, Funcionários atenciosos e amigáveis eLimpeza" },
//     { estrelas: 4, comentario: "Decoração linda. Tudo limpo e com uma apresentação excelente. Todos os rececionistas foram muito simpáticos." }
//   ]
// },

// 20: { 
//   name: "Le Madame By Sweett", 
//   image: "../assets/imagens/hotel-paris2.jpg", 
//   description: "Com uma localização ideal na área de 9º arrondissement, em Paris, Le Madame By Sweett localiza-se a 16 minutos a pé de Estação de Metro Pigalle, a 1,4 km de Gare de l'Est e a 15 minutos a pé de Sala de Espectáculos La Cigale.",
//   cidade: "paris",
//   endereco: "11 Rue Geoffroy-Marie, 9º arrondissement, 75009 Paris",
//   telefone: "(33) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Super good location! Staff very helpful… in particular the lady Chathu from the breakfast she is so nice and sweet!" },
//       { estrelas: 4, comentario: "Hotel novo, super charmoso e confortável, os funcionários são simpáticos e acolhedores! O pequeno almoço também é ótimo!" }
//     ]
// },

// 21: { 
//   name: "Hôtel Flor Rivoli", 
//   image: "../assets/imagens/hotel-paris3.jpg", 
//   description: "Com uma localização bastante central, este hotel de 2 estrelas dispõe de quartos insonorizados com casa de banho privativa e de uma receção 24 horas.",
//   cidade: "paris",
//   endereco: "13 Rue Des Deux Boules, 1º arrondissement, 75001 Paris",
//   telefone: "(33) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Ótima localização, na frente do metrô. Funcionários simpáticos e acolhedores." },
//       { estrelas: 4, comentario: "Beautiful staff, amazing location, I loved having a bath after each day of long walks and amazing activities." }
//     ]
// },

// 22: { 
//   name: "Bianca Praia Hotel", 
//   image: "../assets/imagens/hotel-recife1.jpg", 
//   description: "Idealmente localizado, o Bianca Praia Hotel fica a 200 metros da Praia Boa Viagem e apenas a 100 metros de uma variedade de restaurantes e bares animados.",
//   cidade: "recife",
//   endereco: "Rua Mamanguape, 142 - Boa Viagem, Boa Viagem, Recife",
//   telefone: "(81) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "A localização é ótima da pousada, perto da praia, do carrefour e farmácias. O quarto é bom com banheiro grande e o café da manhã é muito bom!" },
//       { estrelas: 4, comentario: "Hotel muito bom, quarto organizado e ótima localização" }
//     ]
// },

// 23: { 
//   name: "Park Hotel", 
//   image: "../assets/imagens/hotel-recife2.jpg", 
//   description: "O Park Hotel fica a 100 metros da Praia de Boa Viagem, em Pernambuco. Localizado perto de uma variedade de restaurantes, o hotel dispõe de uma piscina com vista panorâmica do oceano. Um buffet de café da manhã variado é servido diariamente.",
//   cidade: "recife",
//   endereco: "Rua dos Navegantes, 09, Boa Viagem, Recife",
//   telefone: "(81) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Excelente pequeno almoço. Funcionários muito atenciosos e educados. Atendimento ótimo" },
//       { estrelas: 4, comentario: "tudo dentro da expectativa, ficamos muito satisfeitos." }
//     ]
// },

// 24: { 
//   name: "Rede Andrade LG Inn", 
//   image: "../assets/imagens/hotel-recife3", 
//   description: "O Rede Andrade LG Inn está localizado apenas a 200 metros da Praia de Boa Viagem, em Recife, e disponibiliza uma piscina interior, 2 bares, um ginásio, elevadores panorâmicos e um centro de negócios. O acesso Wi-Fi é gratuito.",
//   cidade: "recife",
//   endereco: "Av. Domingos Ferreira, 3067 - Boa Viagem , Boa Viagem, Recife",
//   telefone: "(81) 3xxx-xxxx",
//   avaliacoes: [
//       { estrelas: 5, comentario: "Localização, em frente ao Carrefour que fez eu economizar na compra de água e outros snacks, além de ser a poucos metros da praia, e perto de ótimos restaurantes" },
//       { estrelas: 4, comentario: "Foi bom!! Hotel confortável, serviço de vallet rápido, café simples mas bom." }
//     ]
// }
// };

// // Variáveis globais


// // Função para exibir a página de hotéis
// function showHotelsPage() {
//   // Recupera o nome da cidade do LocalStorage
//   const cityFromStorage = localStorage.getItem('selectedCity');

//   // Parse o JSON para obter o objeto cidade
//   const cityData = JSON.parse(cityFromStorage);

//   // Atualiza a variável global com o nome da cidade
//   selectedCity = cityData.name.toLowerCase();

//   // Atualiza o texto da cidade na página de hotéis
//   const selectedCityElement = document.getElementById('selected-city');
//   if (selectedCityElement) {
//       selectedCityElement.textContent = selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);
//   }

//   // Filtra hotéis pela cidade selecionada
//   const hotelListContainer = document.querySelector('.hotel-list');
//   hotelListContainer.innerHTML = ''; // Limpa lista anterior

//   // Adiciona hotéis filtrados
//   Object.keys(hotels).forEach(hotelId => {
//       const hotel = hotels[hotelId];
//       if (hotel.cidade === selectedCity) {
//           const hotelCard = document.createElement('div');
//           hotelCard.className = 'hotel-card';
//           hotelCard.dataset.hotelId = hotelId;
          
//           hotelCard.innerHTML = `
//               <img src="${hotel.image}" alt="${hotel.name}">
//               <h3>${hotel.name}</h3>
//           `;
          
//           hotelListContainer.appendChild(hotelCard);
//       }
//   });

//   // Configura eventos para novos cartões
//   document.querySelectorAll(".hotel-card").forEach(card => {
//       card.addEventListener("click", () => {
//           selectedHotelId = card.dataset.hotelId;
//           const hotel = hotels[selectedHotelId];

//           if (hotel) {
//               // Atualiza detalhes do hotel
//               document.getElementById("hotel-image").src = hotel.image;
//               document.getElementById("hotel-name").textContent = hotel.name;
//               document.getElementById("hotel-description").textContent = hotel.description;
              
//               // Atualiza endereço e detalhes adicionais
//               const detailsRight = document.querySelector('.hotel-right');
//               detailsRight.querySelector('h2 + p').textContent = `${hotel.endereco} • ${hotel.telefone}`;
              
//               // Atualiza avaliações
//               const avaliacoesContainer = detailsRight.querySelector('h3 + p').parentNode;
//               const avaliacoesHTML = hotel.avaliacoes.map(avaliacao => 
//                   `<p><strong>${"⭐".repeat(avaliacao.estrelas)}</strong> ${avaliacao.comentario}</p>`
//               ).join('');
              
//               // Limpa avaliações anteriores e adiciona novas
//               const existingAvaliacoes = avaliacoesContainer.querySelectorAll('p:not(:first-of-type)');
//               existingAvaliacoes.forEach(el => el.remove());
//               avaliacoesContainer.insertAdjacentHTML('beforeend', avaliacoesHTML);

//               // Transição de etapas
//               document.getElementById("hotel-selection").classList.add("hidden");
//               document.getElementById("hotel-details").classList.remove("hidden");
//           }
//       });
//   });

//   // Mostra a página de hotéis e oculta a página de datas
//   document.getElementById('page-2').classList.add('hidden');
//   document.getElementById('page-3').classList.remove('hidden');
// }

// // Função para carregar dados do roteiro
// function loadRoteiroFromLocalStorage() {
//   const storedData = localStorage.getItem('dadosViagem');

//   if (storedData) {
//       const { cidade, dataInicio, dataFim } = JSON.parse(storedData);

//       if (isNaN(new Date(dataInicio)) || isNaN(new Date(dataFim))) {
//           console.error('As datas no localStorage estão em um formato inválido.');
//           return;
//       }

//       const nomeCidadeElement = document.getElementById('nome-cidade');
//       if (nomeCidadeElement) {
//           nomeCidadeElement.textContent = `${cidade}`;
//       } else {
//           console.error('Elemento com id "nome-cidade" não encontrado.');
//       }
//   }
// }

// // Configuração de eventos para confirmação e remoção de hotel
// document.getElementById("continue-to-confirmation")?.addEventListener("click", () => {
//   const hotel = hotels[selectedHotelId];
//   if (hotel) {
//       document.getElementById("confirm-hotel-image").src = hotel.image;
//       document.getElementById("confirm-hotel-name").textContent = hotel.name;
      
//       // Salva hotel selecionado no localStorage
//       localStorage.setItem('hotelSelecionado', JSON.stringify(hotel));
      
//       document.getElementById("hotel-details").classList.add("hidden");
//       document.getElementById("hotel-confirmation").classList.remove("hidden");
//   }
// });

// document.getElementById("remove-hotel")?.addEventListener("click", () => {
//   // Remove hotel do localStorage
//   localStorage.removeItem('hotelSelecionado');
  
//   selectedHotelId = null;
//   document.getElementById("hotel-confirmation").classList.add("hidden");
//   document.getElementById("hotel-selection").classList.remove("hidden");
// });

// // Evento para próxima etapa (placeholder)
// document.getElementById("continue-to-next")?.addEventListener("click", () => {
//   alert("Próxima etapa!");
// });

// // Carrega dados quando o DOM estiver pronto
// document.addEventListener('DOMContentLoaded', () => {
//   loadRoteiroFromLocalStorage();
//   // Se já estiver na página de hotéis, chama showHotelsPage
//   if (document.getElementById('page-3') && !document.getElementById('page-3').classList.contains('hidden')) {
//       showHotelsPage();
//   }
// });
  
//   // Função para mostrar a página de horários
//   function showHorario() {
//     document.getElementById('hotel-confirmation').classList.add('hidden');
//     document.getElementById('page-3').classList.add('hidden');
//     document.getElementById('page-4').classList.remove('hidden');
//   }
  
//  // Função para calcular e validar a criação de passeios
// function QtdPasseios() {
//   event.preventDefault();

//   // Recupera os dados da cidade selecionada do LocalStorage
//   const selectedCityData = JSON.parse(localStorage.getItem('selectedCity'));
  
//   if (!selectedCityData) {
//     alert('Por favor, selecione uma cidade antes de continuar.');
//     return false;
//   }

//   const { id: cityId, name: cidade, image: cityImage } = selectedCityData;

//   const startDate = document.getElementById('start-date').value;
//   const endDate = document.getElementById('end-date').value;
//   const hotelName = selectedHotelId;
//   const startTime = document.getElementById('start-time').value;
//   const endTime = document.getElementById('end-time').value;

//   // Validação para garantir que todos os campos estão preenchidos
//   if (!cidade || !startDate || !endDate || !hotelName || !startTime || !endTime) {
//     alert('Por favor, preencha todos os campos antes de continuar.');
//     return false;
//   }

//   // Criação do objeto com os dados completos da viagem
//   const destination = {
//     id: cityId,           // ID da cidade
//     cidade: cidade,       // Nome da cidade
//     cityImage: cityImage, // Caminho da imagem da cidade
//     dataInicio: startDate,
//     dataFim: endDate,
//     hotel: hotelName,
//     horarioInicio: startTime,
//     horarioFim: endTime
//   };

//   try {
//     // Armazena os dados da viagem no LocalStorage
//     localStorage.setItem('dadosViagem', JSON.stringify(destination));
//     window.location.href = 'https://daniiell99e.github.io/Projeto_integrador/src/pages/SeusRoteiros.html';

//   } catch (error) {
//     console.error('Erro ao salvar dados:', error);
//     alert('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');

//   }
// }
  
//   // Função para calcular dias entre duas datas
//   function calculateDaysBetween(startDate, endDate) {
//     const start = new Date(startDate + "T00:00:00");
//     const end = new Date(endDate + "T00:00:00");
//     const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//     return difference + 1;
//   }
  
//   // Função para formatar datas
//   function formatDate(date) {
//     const options = { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' };
//     return new Date(date).toLocaleDateString('pt-BR', options);
//   }
  
//   // Função para criar HTML do Kanban
//   function createBaiaHTML(dataInicio, dataFim) {
//     const kanbanContainer = document.querySelector('.kanban');
//     kanbanContainer.innerHTML = '';
  
//     const totalDays = calculateDaysBetween(dataInicio, dataFim);
  
//     for (let i = 0; i < totalDays; i++) {
//       const currentDate = new Date(dataInicio + "T00:00:00");
//       currentDate.setDate(currentDate.getDate() + i);
  
//       const formattedDate = formatDate(currentDate);
  
//       const baiaHTML = `
//         <div class="day-column">
//          <div class="containerdat"> 
//           <div class="day-header">Dia ${i + 1} | ${formattedDate}</div>
//            </div>
//             <div class="add-task-container">
//                     <button class="add-task">+</button>
//                   </div>
//           <div class="task-card">
            
//           </div>
//         </div>
//       `;
//       kanbanContainer.innerHTML += baiaHTML;
//     }
//   }
  
//   // Função para carregar o roteiro do LocalStorage
//   function loadRoteiroFromLocalStorage() {
//     const storedData = localStorage.getItem('dadosViagem');
  
//     if (storedData) {
//       const { cidade, dataInicio, dataFim } = JSON.parse(storedData);
  
//       if (isNaN(new Date(dataInicio)) || isNaN(new Date(dataFim))) {
//         console.error('As datas no localStorage estão em um formato inválido.');
//         return;
//       }
  
//       const nomeCidadeElement = document.getElementById('nome-cidade');
//       if (nomeCidadeElement) {
//         nomeCidadeElement.textContent = `${cidade}`;
//       } else {
//         console.error('Elemento com id "nome-cidade" não encontrado.');
//       }
  
//       createBaiaHTML(dataInicio, dataFim);
//     }
//   }
  
//   // Carregar roteiro ao carregar a página
//   document.addEventListener('DOMContentLoaded', () => {
//     loadRoteiroFromLocalStorage();
    
//     const form = document.getElementById('new-itinerary-form');
//     if (form) {
//       form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         QtdPasseios();
//       });
//     }
//   });

  
  
// //----------------------------------------------------------------------------------------------

// // Estrutura de dados para armazenar os passeios
// let tours = JSON.parse(localStorage.getItem('tours')) || [];

// // Função para abrir o modal de cadastro
// function openModal() {
//   const modal = document.getElementById('tourModal');
//   modal.style.display = 'block';
// }

// // Função para fechar o modal
// function closeModal() {
//   const modal = document.getElementById('tourModal');
//   modal.style.display = 'none';
//   clearForm();
// }

// // Função para limpar o formulário
// function clearForm() {
//   document.getElementById('tourForm').reset();
//   const form = document.getElementById('tourForm');
//   form.removeAttribute('data-editing-id');
// }

// // Função para salvar ou atualizar um passeio
// function saveOrUpdateTour(event) {
//   event.preventDefault();
//   const form = document.getElementById('tourForm');
//   const editingId = form.getAttribute('data-editing-id');
//   const activeColumn = document.querySelector('.day-column.active');
//   const selectedDate = activeColumn ? activeColumn.querySelector('.day-header').textContent.split('|')[1].trim() : '';

//   // Obter dados de cidade do localStorage
//   const dadosViagem = JSON.parse(localStorage.getItem("dadosViagem"));
//   const cidadeId = dadosViagem ? dadosViagem.id : null;
//   const cidadeNome = dadosViagem ? dadosViagem.cidade : null;

//   const tourData = {
//     name: document.getElementById('tourName').value,
//     duration: document.getElementById('tourDuration').value,
//     price: document.getElementById('tourPrice').value,
//     description: document.getElementById('tourDescription').value,
//     location: document.getElementById('tourLocation').value,
//     category: document.getElementById('tourCategory').value,
//     date: selectedDate,
//     cidadeId: cidadeId,
//     cidadeNome: cidadeNome
//   };

//   if (editingId) {
//     // Atualizar passeio existente
//     updateTour(parseInt(editingId), tourData);
//   } else {
//     // Salvar novo passeio
//     const tour = {
//       id: Date.now(),
//       ...tourData,
//       createdAt: new Date().toISOString()
//     };
//     tours.push(tour);
//     localStorage.setItem('tours', JSON.stringify(tours));
//     addTourToColumn(tour);
//   }

//   closeModal();
// }

// // Função para adicionar passeio à coluna do dia correto
// function addTourToColumn(tour) {
//   const dayColumns = document.querySelectorAll('.day-column');
//   dayColumns.forEach(column => {
//     const header = column.querySelector('.day-header').textContent;
//     if (header.includes(tour.date)) {
//       const taskCard = column.querySelector('.task-card');
//       const tourElement = createTourElement(tour);
//       taskCard.appendChild(tourElement);
//     }
//   });
// }

// // Criar elemento de passeio
// function createTourElement(tour) {
//   const tourElement = document.createElement('div');
//   tourElement.className = 'tour-card';
//   tourElement.setAttribute('data-tour-id', tour.id);
  
//   tourElement.innerHTML = `
//     <div class="tour-content">
//       <h4>${tour.name}</h4>
//       <div class="tour-details">
//         <span class="duration"><i class="far fa-clock"></i> ${tour.duration}</span>
//         <span class="price"><i class="fas fa-tag"></i> R$ ${tour.price}</span>
//       </div>
//       <p class="location"><i class="fas fa-map-marker-alt"></i> ${tour.location}</p>
//       <p class="description">${tour.description}</p>
//       <span class="category">${tour.category}</span>
//       <div class="tour-actions">
//         <button onclick="editTour(${tour.id})" class="edit-btn">
//           <i class="fas fa-edit"></i> Editar
//         </button>
//         <button onclick="removeTour(${tour.id})" class="remove-btn">
//           <i class="fas fa-trash"></i> Remover
//         </button>
//       </div>
//     </div>
//   `;
  
//   return tourElement;
// }

// // Função para remover um passeio
// function removeTour(tourId) {
//   const confirmDelete = confirm('Tem certeza que deseja remover este passeio?');
  
//   if (confirmDelete) {
//     tours = tours.filter(tour => tour.id !== tourId);
//     localStorage.setItem('tours', JSON.stringify(tours));
    
//     const tourElement = document.querySelector(`[data-tour-id="${tourId}"]`);
//     if (tourElement) {
//       tourElement.remove();
//     }
//   }
// }

// // Função para editar um passeio
// function editTour(tourId) {
//   const tour = tours.find(t => t.id === tourId);
//   if (!tour) return;
  
//   document.getElementById('tourName').value = tour.name;
//   document.getElementById('tourDuration').value = tour.duration;
//   document.getElementById('tourPrice').value = tour.price;
//   document.getElementById('tourDescription').value = tour.description;
//   document.getElementById('tourLocation').value = tour.location;
//   document.getElementById('tourCategory').value = tour.category;
  
//   // Mudar o comportamento do formulário para atualização
//   const form = document.getElementById('tourForm');
//   form.setAttribute('data-editing-id', tourId);
  
//   openModal();
// }

// // Função para atualizar um passeio existente
// function updateTour(tourId, updatedData) {
//   tours = tours.map(tour => {
//     if (tour.id === tourId) {
//       return { ...tour, ...updatedData };
//     }
//     return tour;
//   });
  
//   localStorage.setItem('tours', JSON.stringify(tours));
  
//   const tourElement = document.querySelector(`[data-tour-id="${tourId}"]`);
//   if (tourElement) {
//     tourElement.querySelector('h4').textContent = updatedData.name;
//     tourElement.querySelector('.duration').innerHTML = `<i class="far fa-clock"></i> ${updatedData.duration}`;
//     tourElement.querySelector('.price').innerHTML = `<i class="fas fa-tag"></i> R$ ${updatedData.price}`;
//     tourElement.querySelector('.location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${updatedData.location}`;
//     tourElement.querySelector('.description').textContent = updatedData.description;
//     tourElement.querySelector('.category').textContent = updatedData.category;
//   }
// }

// // Event Listeners
// document.addEventListener('DOMContentLoaded', () => {
//   // Carregar passeios do localStorage
//   tours.forEach(addTourToColumn);
  
//   // Adicionar event listener para o botão de adicionar passeio
//   const addButtons = document.querySelectorAll('.add-task');
//   addButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       openModal();
//       // Definir a coluna ativa
//       document.querySelectorAll('.day-column').forEach(column => column.classList.remove('active'));
//       button.closest('.day-column').classList.add('active');
//     });
//   });
  
//   // Adicionar event listener para fechar o modal
//   const closeButton = document.querySelector('.close-modal');
//   if (closeButton) {
//     closeButton.addEventListener('click', closeModal);
//   }
  
//   // Fechar modal quando clicar fora dele
//   window.addEventListener('click', (event) => {
//     const modal = document.getElementById('tourModal');
//     if (event.target === modal) {
//       closeModal();
//     }
//   });
  
//   // Adicionar event listener para o formulário
//   const form = document.getElementById('tourForm');
//   if (form) {
//     form.addEventListener('submit', saveOrUpdateTour);
//   }
// });

// //tela de detalhes da viagem - inicio----------------------------------------------------------------------------------------------
// function updateCountdown() {
//   const dadosViagem = JSON.parse(localStorage.getItem("dadosViagem"));
//   const travelDate = new Date(`${dadosViagem.dataInicio}T00:00:00Z`); // Adiciona 'Z' para forçar UTC
//   const now = new Date();
//   const difference = travelDate - now;

//   const days = Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
//   const hours = Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24));
//   const minutes = Math.max(0, Math.floor((difference / (1000 * 60)) % 60));

//   document.getElementById('countdown').innerHTML = 
//       `Contagem Regressiva: ${days} dias, ${hours} horas, ${minutes} minutos`;
// }

// function checkPage() {
//   const currentPage = window.location.pathname;
//   if (currentPage.includes('detalhesviagem.html')) {
//     setInterval(updateCountdown, 1000);
//     updateCountdown(); // Chama imediatamente para evitar atraso inicial
//   }
// }

// checkPage();

// //função para atualizar o nome da cidade na tela de detalhes da viagem-----------------------------
// function updateCityName() {
//   const dadosViagem = JSON.parse(localStorage.getItem("dadosViagem"));
//   const cityName = dadosViagem.cidade;

//   document.querySelector(".header-detViagem h1 span").textContent = cityName;
// }

// document.addEventListener("DOMContentLoaded", updateCityName);

// //função para atualizar foto da cidade na tela de detalhes da viagem-----------------------------
// function updateCityImage() {
//   const dadosViagem = JSON.parse(localStorage.getItem("dadosViagem"));
//   const cityImage = dadosViagem.cityImage;

//   document.querySelector(".details-detViagem img").src = cityImage;
// }

// document.addEventListener("DOMContentLoaded", updateCityImage);

// //----------------------------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//   // Recuperar dados do localStorage
//   const hotelSelecionado = JSON.parse(localStorage.getItem('hotelSelecionado'));

//   if (hotelSelecionado) {
//       // Preencher detalhes do hotel
//       document.getElementById('hotel-name').textContent = hotelSelecionado.name;
//       document.getElementById('hotel-image').src = hotelSelecionado.image;
//       document.getElementById('hotel-cidade').textContent = hotelSelecionado.cidade;
//       document.getElementById('hotel-endereco').textContent = hotelSelecionado.endereco;
//       document.getElementById('hotel-telefone').textContent = hotelSelecionado.telefone;
//       document.getElementById('hotel-description').textContent = hotelSelecionado.description;

//       // Renderizar avaliações
//       const avaliacoesContainer = document.getElementById('avaliacoes-container');
//       hotelSelecionado.avaliacoes.forEach(avaliacao => {
//           const avaliacaoDiv = document.createElement('div');
//           avaliacaoDiv.classList.add('avaliacao');

//           // Criar estrelas
//           const starsHTML = '★'.repeat(avaliacao.estrelas) + '☆'.repeat(5 - avaliacao.estrelas);
//           avaliacaoDiv.innerHTML = `
//               <p class="stars">${starsHTML}</p>
//               <p>${avaliacao.comentario}</p>
//           `;

//           avaliacoesContainer.appendChild(avaliacaoDiv);
//       });
//   }
// });

// //função para atualizar data da viagem na tela de detalhes da viagem-----------------------------
// function updateTravelDate() {
//   const dadosViagem = JSON.parse(localStorage.getItem("dadosViagem"));
//   const travelDate = dadosViagem.dataInicio;
//   const travelEndDate = dadosViagem.dataFim;

//   const diferencaEmDias = calcularDiasViagem(travelDate, travelEndDate);

//   const dataInicioFormatada = formatarData(travelDate);
//   const dataFimFormatada = formatarData(travelEndDate);

//   document.querySelector(".details-detViagem_dataInicio span").textContent = dataInicioFormatada;
//   document.querySelector(".details-detViagem_dataFim span").textContent = dataFimFormatada;
//   document.querySelector(".details-detViagem_duracao span").textContent = diferencaEmDias + " dias";
// }

// function calcularDiasViagem(dataInicio, dataFim) {
//   const dataInicioObj = new Date(dataInicio);
//   const dataFimObj = new Date(dataFim);

//   const diferencaEmMilissegundos = dataFimObj - dataInicioObj;
//   const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

//   return diferencaEmDias;
// }

// function formatarData(data) {
//   const dataObj = new Date(data);
//   dataObj.setDate(dataObj.getDate() + 1); // Adiciona um dia à data
//   const dia = dataObj.getDate();
//   const mes = getMes(dataObj.getMonth());
//   const ano = dataObj.getFullYear();

//   return `${dia} de ${mes} de ${ano}`;
// }

// function getMes(mes) {
//   const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
//   return meses[mes];
// }

// document.addEventListener("DOMContentLoaded", updateTravelDate);

// //função para atualizar o nome da cidade na tela de detalhes da viagem-----------------------------
// function updateCityDestino() {
//   const dadosViagem = JSON.parse(localStorage.getItem("dadosViagem"));
//   const cityName = dadosViagem.cidade;

//   document.querySelector(".details-detViagem_destino span").textContent = cityName;
// }

// document.addEventListener("DOMContentLoaded", updateCityDestino);

// //função para editar datas na tela de detalhes da viagem---------------------------------------------
// // Função para ir para a página de edição de datas
// function goToEditPage() {
//   // Mostra a página de edição de datas em pop-up
//   const editPage = document.getElementById("details-edit_dates");
//   editPage.classList.remove("hidden");
//   editPage.style.position = "fixed";
//   editPage.style.top = "45%";
//   editPage.style.left = "59%";
//   editPage.style.transform = "translate(-50%, -50%)";
//   editPage.style.zIndex = "1000";
//   editPage.style.width = "79%";
//   // Chama a função atualizarDetalhesViagem
//   atualizarDetalhesViagem();
// }

// function atualizarDetalhesViagem() {
//   const dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));
//   // Atualiza o campo de entrada com o nome da cidade
//   const cityNameInput = document.getElementById('city-name_edit');
//   if (cityNameInput) {
//     cityNameInput.value = dadosViagem.cidade;
//   }
//   // Atualiza os campos de data
//   const startDateInput = document.getElementById('start-date_edit');
//   if (startDateInput) {
//     startDateInput.value = dadosViagem.dataInicio;
//   }
//   const endDateInput = document.getElementById('end-date_edit');
//   if (endDateInput) {
//     endDateInput.value = dadosViagem.dataFim;
//   }
//   verificarDatas();
// }

// function verificarDatas() {
//   const startDateInput = document.getElementById('start-date_edit');
//   const endDateInput = document.getElementById('end-date_edit');
//   const startDate = new Date(startDateInput.value);
//   const endDate = new Date(endDateInput.value);
//   if (startDate >= endDate) {
//     alert("A data de início deve ser anterior à data de fim");
//   }
// }

// // Função para salvar as alterações e voltar para a tela de detalhes
// function salvarAlteracoes() {
//   // Pega os novos valores dos campos de data
//   const startDateInput = document.getElementById('start-date_edit');
//   const endDateInput = document.getElementById('end-date_edit');
//   // Atualiza o localStorage com os novos valores
//   const dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));
//   dadosViagem.dataInicio = startDateInput.value;
//   dadosViagem.dataFim = endDateInput.value;
//   localStorage.setItem('dadosViagem', JSON.stringify(dadosViagem));
//   // Volta para a tela de detalhes
//   const editPage = document.getElementById("details-edit_dates");
//   editPage.classList.add("hidden");
//   // Recarrega a página
//   location.reload();
// }

// function fecharEditPage() {
//   const editPage = document.getElementById("details-edit_dates");
//   editPage.classList.add("hidden");
// }
//tela de detalhes da viagem - final----------------------------------------------------------------------------------------------
  
  
  //----------------------------------------------------------------------------------------------

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const carousel = document.getElementById('carousel-list');
let scrollPosition = 0;
const itemWidth = 95; // Largura de cada item, incluindo margem
const visibleItems = 4; // Quantidade de itens visíveis na tela ao mesmo tempo


//trocar a cor do link quando clicar inicio
const list = document.querySelectorAll('.list');
function activeLink(){
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
    item.addEventListener('click', activeLink));
//trocar a cor do link quando clicar fim

// Esse é o javascript do carrocel - inicio

nextBtn.addEventListener('click', () => {
    const maxScroll = (carousel.children.length - visibleItems) * itemWidth;

    // Verifica se a scrollPosition atingiu o máximo
    if (scrollPosition >= maxScroll) {
        // Se sim, vai para o início
        scrollPosition = 0;
    } else {
        // Caso contrário, aumenta a posição
        scrollPosition = Math.min(scrollPosition + itemWidth, maxScroll);
    }

    carousel.style.transform = `translateX(-${scrollPosition}px)`;
});

prevBtn.addEventListener('click', () => {
            scrollPosition = Math.max(scrollPosition - itemWidth, 0);
            carousel.style.transform = `translateX(-${scrollPosition}px)`;
        });
      
//----------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slidecarro');
    const dotsContainer = document.querySelector('.dots-container');
    
    let currentIndex = 0;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let animationID = 0;
    
    // Touch events
    carousel.addEventListener('touchstart', touchStart);
    carousel.addEventListener('touchmove', touchMove);
    carousel.addEventListener('touchend', touchEnd);

    // Mouse events (para teste no desktop)
    carousel.addEventListener('mousedown', touchStart);
    carousel.addEventListener('mousemove', touchMove);
    carousel.addEventListener('mouseup', touchEnd);
    carousel.addEventListener('mouseleave', touchEnd);

    // Prevenir comportamento padrão de arrastar imagem
    carousel.addEventListener('dragstart', (e) => e.preventDefault());

    // Botões de navegação
    prevBtn.addEventListener('click', () => navigate('prev'));
    nextBtn.addEventListener('click', () => navigate('next'));

    function touchStart(event) {
        startX = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        carousel.style.cursor = 'grabbing';
    }

    function touchMove(event) {
        if (!isDragging) return;
        
        const currentX = getPositionX(event);
        currentTranslate = prevTranslate + currentX - startX;
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        carousel.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;
        
        // Determinar se houve swipe significativo
        if (Math.abs(movedBy) > 100) {
            if (movedBy > 0) {
                navigate('prev');
            } else {
                navigate('next');
            }
        } else {
            // Voltar para a posição original se o movimento foi pequeno
            goToSlide(currentIndex);
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function navigate(direction) {
        const slideWidth = items[0].offsetWidth + 20; // 20 é o gap entre slides
        
        if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'next' && currentIndex < items.length - 1) {
            currentIndex++;
        }

        goToSlide(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        const slideWidth = items[0].offsetWidth + 20;
        currentTranslate = prevTranslate = -slideWidth * currentIndex;
        
        carousel.style.transition = 'transform 0.3s ease-out';
        carousel.style.transform = `translateX(${currentTranslate}px)`;

        // Atualizar estado dos botões
        updateNavigationButtons();
    }

    

    // Ajustar carrossel quando a janela é redimensionada
    window.addEventListener('resize', () => {
        goToSlide(currentIndex);
    });

    // Inicializar estado dos botões
    updateNavigationButtons();
});
        
//carrocel final - 


//slide inicio
        let currentIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
                
        function showSlide(index) {
        // Remove qualquer classe zoom ou reset de todas as imagens
        slides.forEach(slide => slide.classList.remove('zoom', 'reset'));
                
        // Calcula o índice da imagem atual
        currentIndex = (index + totalSlides) % totalSlides;
                
        // Exibe a imagem atual (sem ainda aplicar o zoom)
        document.querySelector('.slides').style.transform = `translateX(${-currentIndex * 100}%)`;
                
        // Após exibir, aplica o zoom in na imagem atual
        setTimeout(() => {
        slides[currentIndex].classList.add('zoom');
        }, 1000); // Dá meio segundo para a transição de slide antes de aplicar o zoom
                
        // Depois de 2 segundos, remove o zoom (zoom out)
            setTimeout(() => {
                slides[currentIndex].classList.remove('zoom');
                slides[currentIndex].classList.add('reset');
                }, 2700); // 2 segundos para o efeito de zoom in, depois zoom out
            }
                
        // Função para iniciar o slider automaticamente
        function startSlider() {
            showSlide(currentIndex); // Exibe a primeira imagem
                
                setInterval(() => {
                    currentIndex++; // Incrementa para a próxima imagem
                    showSlide(currentIndex); // Exibe a próxima imagem e aplica o zoom
                }, 6000); // 5 segundos para cada ciclo (tempo para zoom in, zoom out e troca de imagem)
        }
                
        // Inicia o slider
        startSlider();
    // slide - final