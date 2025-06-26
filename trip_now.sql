CREATE DATABASE IF NOT EXISTS TripNow;
USE TripNow;

CREATE TABLE IF NOT EXISTS Genero (
  id_genero INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_genero VARCHAR(50) NOT NULL
);

INSERT INTO genero (nome_genero)
VALUES 
  ('Masculino'),
  ('Feminino'),
  ('Outros'),
  ('Prefiro não informar');

CREATE TABLE IF NOT EXISTS Usuario (
  id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  primeiro_nome_usuario VARCHAR(100) NOT NULL,
  sobrenome_usuario VARCHAR(100) NOT NULL,
  email_usuario VARCHAR(100) NOT NULL,
  senha_usuario VARCHAR(255) NOT NULL,
  telefone_usuario VARCHAR(20) NOT NULL,
  id_genero INT NOT NULL,
  cep_usuario VARCHAR(9) NOT NULL,
  rua_usuario VARCHAR(100) NOT NULL,
  bairro_usuario VARCHAR(50) NOT NULL,
  cidade_usuario VARCHAR(50) NOT NULL,
  complemento_usuario VARCHAR(150),
  contrato_aceito boolean,
    FOREIGN KEY (id_genero) REFERENCES Genero (id_genero)
);

CREATE TABLE IF NOT EXISTS Destino (
  id_destino INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_destino VARCHAR(100) NOT NULL,
  desc_destino VARCHAR(100) NULL,
  pais VARCHAR(50) NOT NULL
);

INSERT INTO Destino (nome_destino, desc_destino, pais) VALUES
('Buenos Aires', 'Capital da Argentina', 'Argentina'),
('Gramado', 'Cidade turística na serra gaúcha', 'Brasil'),
('Natal', 'Capital do Rio Grande do Norte', 'Brasil'),
('Belém', 'Capital do Pará, região amazônica', 'Brasil'),
('Paris', 'Capital da França, famosa pela Torre Eiffel', 'França'),
('Recife', 'Capital de Pernambuco, rica em cultura', 'Brasil'),
('Rio de Janeiro', 'Cidade famosa pelo Cristo Redentor', 'Brasil'),
('Salvador', 'Capital da Bahia, conhecida pelo Carnaval', 'Brasil');

CREATE TABLE IF NOT EXISTS Roteiro (
  id_roteiro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_roteiro VARCHAR(100) NULL,
  fk_id_usuario INT NOT NULL,
  fk_id_destino INT NOT NULL,
  data_inicial DATE NOT NULL,
  data_final DATE NOT NULL,
  passeio_inicio TIME NOT NULL,
  passeio_fim TIME NOT NULL,
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario (id_usuario),
    FOREIGN KEY (fk_id_destino) REFERENCES Destino (id_destino)
);

CREATE TABLE IF NOT EXISTS Parceiro (
  id_parceiro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_parceiro VARCHAR(100) NOT NULL,
  tipo_parceiro VARCHAR(50) NOT NULL
);

INSERT INTO Parceiro (nome_parceiro, tipo_parceiro) VALUES
('José Augusto Turismo LTDA', 'Pessoa Jurídica'),
('Rede Hotéis Maranatha', 'Rede Hoteleira'),
('Ana Ribeiro da Silva', 'Pessoa Física'),
('Hoteis Costa & Mar', 'Administradora'),
('Empreendimentos Viver Bem S/A', 'Pessoa Jurídica'),
('Ricardo Almeida Gestão Hoteleira', 'Pessoa Física'),
('Rede Tropical Resorts', 'Rede Hoteleira'),
('Gestão Hoteleira Sul Brasil', 'Administradora'),
('Luana Ferreira Hotelaria ME', 'Pessoa Jurídica'),
('Grupo Morada do Sol', 'Rede Hoteleira'),
('Grupo Atlantica', 'Administrador'),
('Rede Nacional de Hotéis', 'Administrador'),
('Hospitality Solutions', 'Administrador'),
('Mares do Sul Administrações', 'Administrador');

-- Criação da tabela Avaliacao ANTES de ser referenciada
CREATE TABLE IF NOT EXISTS Avaliacao (
  id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nota_avaliacao INT NOT NULL,
  data_avaliacao DATE NOT NULL,
  desc_avaliacao VARCHAR(100) NULL
);

-- Criação da tabela endereco_atracao ANTES de ser referenciada
CREATE TABLE IF NOT EXISTS endereco_atracao (
  id_endereco_atracao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  cep VARCHAR(10) NOT NULL,
  rua VARCHAR(100) NOT NULL,
  bairro VARCHAR(50) NOT NULL,
  complemento VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS Hotel (
  id_hotel INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_hotel VARCHAR(100) NOT NULL,
  hotel_descricao TEXT NOT NULL,
  id_parceiro INT NOT NULL,
  fk_id_destino INT NOT NULL,
  cep VARCHAR(9) NOT NULL,
  rua VARCHAR(100) NOT NULL,
  bairro VARCHAR(50) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_parceiro) REFERENCES Parceiro (id_parceiro),
    FOREIGN KEY (fk_id_destino) REFERENCES Destino (id_destino)
);

INSERT INTO Hotel (nome_hotel, hotel_descricao, id_parceiro, fk_id_destino, cep, rua, bairro, telefone) VALUES
('Atlantic Bussines', 'Situado no centro do Rio de Janeiro e a 4 minutos a pé da estação de metrô Cinelândia, este hotel informal fica a 11 minutos a pé do Museu de Arte Moderna do Rio de Janeiro e a 1,2 km do Aeroporto Santos Dumont.', 1, 7, '20031-170', 'Centro', 'Centro', '(21) 3211-7890'),
('Hotel Nacional', 'Hotel tradicional com vista panorâmica.', 2, 7, '20081-140', 'Zona Sul', 'Zona Sul', '(21) 3222-4567'),
('Hotel Comfort', 'Hotel confortável e bem localizado.', 3, 7, '20771-000', 'Zona Norte', 'Zona Norte', '(21) 3233-9988'),
('Hotel Salvador Palace', 'Hotel no coração de Salvador.', 4, 8, '40026-280', 'Pelourinho', 'Pelourinho', '(71) 3111-2233'),
('Hotel exemplo', 'Hotel no coração de Salvador.', 5, 8, '40026-280', 'Pelourinho', 'Pelourinho', '(71) 3111-3344'),
('Bahiamar Hotel', 'Situado na Praia do Jardim de Alah, a poucos passos de várias opções de lojas e entretenimento, o Bahiamar Hotel disponibiliza acesso Wi-Fi gratuito em toda a propriedade, estacionamento privativo gratuito com vigilância 24 horas e uma piscina exterior. O Centro de Convenções de Salvador fica a 3 km.', 6, 8, '41770-100', 'Rua João Mendes da Costa Filho, 125', 'Jardim de Alah', '(71) 3344-5566'),
('Hotel Centro Naval', 'Os quartos do Hotel Centro Naval são confortavelmente mobiliados. Todos eles têm ar-condicionado, TV a cabo e cofre. Os banheiros incluem banheira, secador de cabelo e amenidades de banho gratuitas.', 7, 1, '12150-000', 'Jean Jaures, 1215', 'Balvanera', '(54) 11 4321-1000'),
('Gran Hotel Argentino', 'Os encantadores quartos do Gran Hotel Argentino incluem comodidades modernas, tais como ar condicionado, televisão por cabo e um cofre. Alguns quartos oferecem vistas para a cidade.', 8, 1, '10090-000', 'Carlos Pellegrini, 37', 'Centro', '(54) 11 4321-2000'),
('Hotel BA Abasto', 'Hotel BA Abasto é um alojamento de 4 estrelas situado em Buenos Aires, a 3,2 km de Museu Nacional das Belas Artes e a 3,4 km de Teatro Colon.', 9, 1, '12150-000', '896 Jean Jaures', 'Balvanera', '(54) 11 4321-3000'),
('Hotel Vista do Vale', 'Com vista para a natureza e um restaurante no local, o Hotel Vista do Vale é um alojamento situado em Gramado, a 800 metros do centro da cidade.', 10, 2, '95670-000', 'Av. das Hortênsias, 2989', 'Centro', '(54) 3286-1001'),
('Hotel Sky Gramado', 'O Hotel Sky disponibiliza acomodações modernas em Gramado, uma estrutura em madeira e uma localização privilegiada apenas a 800 metros do centro da cidade. Está disponível acesso Wi-Fi gratuito.', 11, 2, '95670-000', 'Av. das Hortênsias, 680', 'Centro', '(54) 3286-1002'),
('Pousada do Verde Gramado', 'Com uma localização atrativa no centro de Gramado, Pousada do Verde Gramado apresenta acesso Wi-Fi gratuito em toda a propriedade, um jardim e estacionamento privado gratuito para os hóspedes que viajam de carro.', 12, 2, '95670-000', 'Rua Tia Rita', 'Centro', '(54) 3286-1003'),
('Natal Praia Hotel', 'O Natal Praia Hotel beneficia de uma localização privilegiada, a 50 metros da Praia Dos Artistas e perto da popular zona de Ponta Negra.', 13, 3, '59012-100', 'Av. Gov. Sílvio Pedroza, 19', 'Praia dos Artistas', '(84) 3205-6000'),
('Villa Park Hotel', 'O Villa Park situa-se apenas a 500 metros do Centro Comercial Midway, em Natal. Disponibiliza um buffet de pequeno-almoço diário no seu restaurante.', 14, 3, '59075-000', 'Avenida Senador Salgado Filho, 1525', 'Lagoa Nova', '(84) 3205-6001');

-- Agora os INSERTs podem ser executados porque as tabelas já existem
INSERT INTO Avaliacao (nota_avaliacao, data_avaliacao, desc_avaliacao)
VALUES (5, '2025-06-01', 'Hotel limpo, bem localizado e com ótimo atendimento.');

CREATE TABLE IF NOT EXISTS Hotel_Avaliacao (
  id_hotel INT NOT NULL,
  id_avaliacao INT NOT NULL,
  PRIMARY KEY (id_hotel, id_avaliacao),
  INDEX fk_Hotel_has_Avaliacao_Avaliacao1_idx (id_avaliacao ASC),
  INDEX fk_Hotel_has_Avaliacao_Hotel1_idx (id_hotel ASC),
  CONSTRAINT fk_Hotel_has_Avaliacao_Hotel1
    FOREIGN KEY (id_hotel)
    REFERENCES Hotel (id_hotel)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Hotel_has_Avaliacao_Avaliacao1
    FOREIGN KEY (id_avaliacao)
    REFERENCES Avaliacao (id_avaliacao)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

INSERT INTO Hotel_Avaliacao (id_hotel, id_avaliacao)
VALUES (1, 1);

CREATE TABLE IF NOT EXISTS Atracao (
  id_atracao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  fk_id_destino INT NOT NULL,
  nome_atracao VARCHAR(100) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  descricao TEXT(400) NOT NULL,
  fk_endereco_atracao INT NOT NULL,
    FOREIGN KEY (fk_id_destino) REFERENCES Destino (id_destino),
    FOREIGN KEY (fk_endereco_atracao) REFERENCES endereco_atracao (id_endereco_atracao)
);

CREATE TABLE IF NOT EXISTS Roteiro_Hotel (
  id_roteiro INT NOT NULL,
  id_hotel INT NOT NULL,
  PRIMARY KEY (id_roteiro, id_hotel),
  INDEX fk_Roteiro_has_Hotel_Hotel1_idx (id_hotel ASC),
  INDEX fk_Roteiro_has_Hotel_Roteiro1_idx (id_roteiro ASC),
  CONSTRAINT fk_Roteiro_has_Hotel_Roteiro1
    FOREIGN KEY (id_roteiro)
    REFERENCES Roteiro (id_roteiro)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Roteiro_has_Hotel_Hotel1
    FOREIGN KEY (id_hotel)
    REFERENCES Hotel (id_hotel)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Atracao_Avaliacao (
  id_atracao INT NOT NULL,
  id_avaliacao INT NOT NULL,
  PRIMARY KEY (id_atracao, id_avaliacao),
  INDEX fk_Atracao_has_Avaliacao_Avaliacao1_idx (id_avaliacao ASC),
  INDEX fk_Atracao_has_Avaliacao_Atracao1_idx (id_atracao ASC),
  CONSTRAINT fk_Atracao_has_Avaliacao_Atracao1
    FOREIGN KEY (id_atracao)
    REFERENCES Atracao (id_atracao)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Atracao_has_Avaliacao_Avaliacao1
    FOREIGN KEY (id_avaliacao)
    REFERENCES Avaliacao (id_avaliacao)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Passeios (
  id_Passeios INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  fk_id_roteiro INT NOT NULL,
  Passeio VARCHAR(100) NOT NULL,
  Duracao TIME NOT NULL,
  Preco DECIMAL(10,2) NOT NULL,
  Categoria VARCHAR(50) NOT NULL,
  Descricao TEXT(400) NULL,
  Dia_passeio INT,
  Dia_semana VARCHAR(20),
  Data_passeio DATE,
  fk_endereco_atracao INT NOT NULL,
    FOREIGN KEY (fk_id_roteiro) REFERENCES Roteiro (id_roteiro),
    FOREIGN KEY (fk_endereco_atracao) REFERENCES endereco_atracao (id_endereco_atracao)
);

CREATE TABLE IF NOT EXISTS Avaliacao_has_Roteiro (
  Avaliacao_id_avaliacao INT NOT NULL,
  Roteiro_id_roteiro INT NOT NULL,
  PRIMARY KEY (Avaliacao_id_avaliacao, Roteiro_id_roteiro),
  INDEX fk_Avaliacao_has_Roteiro_Roteiro1_idx (Roteiro_id_roteiro ASC),
  INDEX fk_Avaliacao_has_Roteiro_Avaliacao1_idx (Avaliacao_id_avaliacao ASC),
  CONSTRAINT fk_Avaliacao_has_Roteiro_Avaliacao1
    FOREIGN KEY (Avaliacao_id_avaliacao)
    REFERENCES Avaliacao (id_avaliacao)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Avaliacao_has_Roteiro_Roteiro1
    FOREIGN KEY (Roteiro_id_roteiro)
    REFERENCES Roteiro (id_roteiro)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Consultas de verificação
SELECT * FROM Roteiro;
SELECT * FROM Roteiro_Hotel;
SELECT * FROM Hotel_Avaliacao;
SELECT * FROM usuario;
SELECT * FROM destino;