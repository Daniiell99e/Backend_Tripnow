CREATE DATABASE IF NOT EXISTS TripNow;
USE TripNow;

CREATE TABLE IF NOT EXISTS Genero (
  id_genero INT PRIMARY KEY NOT  NULL AUTO_INCREMENT,
  nome_genero VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Usuario (
  id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_usuario VARCHAR(100) NOT NULL,
  primeiro_nome_usuario VARCHAR(100) NOT NULL,
  sobrenome_usuario VARCHAR(100) NOT NULL,
  email_usuario VARCHAR(100) NOT NULL,
  senha_usuario VARCHAR(15) NOT NULL,
  telefone_usuario VARCHAR(20) NOT NULL,
  id_genero INT NOT NULL,
  cep VARCHAR(9) NOT NULL,
  rua VARCHAR(100) NOT NULL,
  bairro VARCHAR(50) NOT NULL,
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(2) NULL,
  pais VARCHAR(50) NULL,
  numero VARCHAR(45) NULL,
    FOREIGN KEY (id_genero) REFERENCES Genero (id_genero)
);

CREATE TABLE IF NOT EXISTS Destino (
  id_destino INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_destino VARCHAR(100) NOT NULL,
  desc_destino VARCHAR(100) NULL,
  pais VARCHAR(50) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS Hotel (
  id_hotel INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome_hotel VARCHAR(100) NOT NULL,
  hotel_descricao VARCHAR(120) NOT NULL,
  id_parceiro INT NOT NULL,
  fk_id_destino INT NOT NULL,
  cep VARCHAR(9) NOT NULL,
  rua VARCHAR(100) NOT NULL,
  bairro VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_parceiro) REFERENCES Parceiro (id_parceiro),
    FOREIGN KEY (fk_id_destino) REFERENCES Destino (id_destino)
);

CREATE TABLE IF NOT EXISTS endereco_atracao (
  id_endereco_atracao INT PRIMARY KEY NOT NULL,
  cep VARCHAR(10) NOT NULL,
  rua VARCHAR(100) NOT NULL,
  bairo VARCHAR(50) NOT NULL,
  complemento VARCHAR(45) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS Avaliacao (
  id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nota_avaliacao INT NOT NULL,
  data_avaliacao DATE NOT NULL,
  desc_avaliacao VARCHAR(100) NULL
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

CREATE TABLE IF NOT EXISTS Hotel_Avaliacao (
  d_hotel INT NOT NULL,
  id_avaliacao INT NOT NULL,
  PRIMARY KEY (d_hotel, id_avaliacao),
  INDEX fk_Hotel_has_Avaliacao_Avaliacao1_idx (id_avaliacao ASC),
  INDEX fk_Hotel_has_Avaliacao_Hotel1_idx (d_hotel ASC),
  CONSTRAINT fk_Hotel_has_Avaliacao_Hotel1
    FOREIGN KEY (d_hotel)
    REFERENCES Hotel (id_hotel)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Hotel_has_Avaliacao_Avaliacao1
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