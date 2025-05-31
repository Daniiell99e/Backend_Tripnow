-- Inserindo gêneros
INSERT INTO Genero (id_genero, nome_genero) VALUES
(1, 'Masculino'),
(2, 'Feminino');

-- Inserindo parceiros
INSERT INTO Parceiro (id_parceiro, nome_parceiro, tipo_parceiro) VALUES
(1, 'Agencia Viagem Plus', 'Agência'),
(2, 'Hospedagem Confort', 'Hotel');

-- Inserindo destinos
INSERT INTO Destino (id_destino, nome_destino, desc_destino) VALUES
(1, 'Paris', 'Cidade Luz'),
(2, 'Nova York', 'Cidade que nunca dorme');

-- Inserindo atrações
INSERT INTO Atracao (id_atracao, nome_atracao, tipo_atracao, id_destino) VALUES
(1, 'Torre Eiffel', 'Monumento', 1),
(2, 'Central Park', 'Parque', 2);

-- Inserindo hotéis
INSERT INTO Hotel (id_hotel, nome_hotel, endereco_hotel, id_parceiro) VALUES
(1, 'Hotel Paris Lux', 'Av. Champs-Élysées, Paris', 2),
(2, 'Hotel NY Central', '5th Avenue, New York', 2);

-- Inserindo usuários
INSERT INTO Usuario (id_usuario, nome_usuario, primeiro_nome_usuario, sobrenome_usuario, endereco_usuario, email_usuario, senha_usuario, telefone_usuario, id_genero) VALUES
(1, 'joaosilva', 'João', 'Silva', 'Rua A, 123', 'joao@gmail.com', 'senha123', '1111-1111', 1),
(2, 'mariasantos', 'Maria', 'Santos', 'Rua B, 456', 'maria@gmail.com', 'senha123', '2222-2222', 2),
(3, 'carlospereira', 'Carlos', 'Pereira', 'Rua C, 789', 'carlos@gmail.com', 'senha123', '3333-3333', 1),
(4, 'anapaula', 'Ana', 'Paula', 'Rua D, 101', 'ana@gmail.com', 'senha123', '4444-4444', 2),
(5, 'lucasrocha', 'Lucas', 'Rocha', 'Rua E, 202', 'lucas@gmail.com', 'senha123', '5555-5555', 1);

-- Inserindo roteiros
INSERT INTO Roteiro (id_roteiro, nome_roteiro, data_inicial, data_final, id_usuario, id_destino) VALUES
(1, 'Paris Maravilhosa', '2025-06-01', '2025-06-10', 1, 1),
(2, 'Explorando NY', '2025-07-05', '2025-07-15', 2, 2),
(3, 'Viagem Romântica Paris', '2025-08-01', '2025-08-10', 3, 1),
(4, 'NY Cultural', '2025-09-01', '2025-09-10', 4, 2),
(5, 'Aventura em Paris', '2025-10-01', '2025-10-12', 5, 1);

-- Relacionando roteiros com hotéis
INSERT INTO Roteiro_Hotel (id_roteiro, id_hotel) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 2),
(5, 1);

-- Inserindo avaliações
INSERT INTO Avaliacao (id_avaliacao, nota_avaliacao, data_avaliacao, desc_avaliacao) VALUES
(1, 5, '2025-06-11', 'Perfeito, experiência incrível!'),
(2, 4, '2025-07-16', 'Ótima viagem, recomendo!'),
(3, 5, '2025-08-11', 'Muito bom, adorei cada momento!'),
(4, 3, '2025-09-11', 'Foi bom, mas poderia melhorar.'),
(5, 5, '2025-10-13', 'Sensacional, superou expectativas!');

-- Relacionando avaliações com roteiros
INSERT INTO Avaliacao_Roteiro (id_avaliacao, id_roteiro) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Relacionando avaliações com hotéis
INSERT INTO Hotel_Avaliacao (id_hotel, id_avaliacao) VALUES
(1, 1),
(2, 2),
(1, 3),
(2, 4),
(1, 5);

-- Relacionando avaliações com atrações
INSERT INTO Atracao_Avaliacao (id_atracao, id_avaliacao) VALUES
(1, 1),
(2, 2),
(1, 3),
(2, 4),
(1, 5);






select* from avaliacao;

SELECT 
    nome_usuario,
    endereco_usuario,
    nome_genero,
    nome_roteiro,
    nome_destino,
    nome_atracao,
    desc_destino,
    tipo_atracao
from usuario  us 
inner join genero g on us.id_genero = g.id_genero
inner join roteiro r on us.id_usuario = r.id_usuario 
inner join destino d on r.id_destino = d.id_destino
inner join atracao a on d.id_destino = a.id_destino;

UPDATE Destino
SET 
	nome_destino = 'Buenos Aires',
    desc_destino = 'Cidade com forte cultura do tango e arquitetura clássica'
WHERE id_destino = 4;

UPDATE Destino
SET 
	nome_destino = 'Paris',
    desc_destino = 'Capital da França, conhecida como a cidade luz'
WHERE id_destino = 10;

DELETE FROM Destino
WHERE id_destino = 2;



INSERT INTO Destino (nome_destino, desc_destino) VALUES
('São Paulo', 'Centro financeiro e cultural do Brasil');

SELECT * FROM Destino;
