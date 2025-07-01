# app/models.py
from . import db

class User(db.Model):
    __tablename__ = 'Usuario'

    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    primeiro_nome_usuario = db.Column(db.String(100), nullable=False)
    sobrenome_usuario = db.Column(db.String(100), nullable=False)
    email_usuario = db.Column(db.String(100), nullable=False, unique=True)
    senha_usuario = db.Column(db.String(255), nullable=False)
    telefone_usuario = db.Column(db.String(20), nullable=False)
    id_genero = db.Column(db.Integer, db.ForeignKey('Genero.id_genero'), nullable=False)
    cep_usuario = db.Column(db.String(9), nullable=False)
    rua_usuario = db.Column(db.String(100), nullable=False)
    bairro_usuario = db.Column(db.String(100), nullable=False)
    cidade_usuario = db.Column(db.String(100), nullable=False)
    complemento_usuario = db.Column(db.String(100), nullable=True)
    contrato_aceito = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Usuario {self.primeiro_nome_usuario} {self.sobrenome_usuario}>'
    
class Genero(db.Model):
    __tablename__ = 'Genero'

    id_genero = db.Column(db.Integer, primary_key=True)
    nome_genero = db.Column(db.String(50), nullable=False)

    usuarios = db.relationship('User', backref='genero_relacionado', lazy=True)

    def __repr__(self):
        return f'<Genero {self.nome_genero}>'
    
class Destino(db.Model):
    __tablename__ = 'Destino'

    id_destino = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_destino = db.Column(db.String(100), nullable=False)
    desc_destino = db.Column(db.String(100))

    def __repr__(self):
        return f"<Destino {self.id_destino} - {self.nome_destino}>"

class Roteiro(db.Model):
    __tablename__ = 'Roteiro'

    id_roteiro = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_roteiro = db.Column(db.String(100), nullable=True)
    fk_id_usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id_usuario'), nullable=False)
    fk_id_destino = db.Column(db.Integer, db.ForeignKey('Destino.id_destino'), nullable=False)
    data_inicial = db.Column(db.Date, nullable=False)
    data_final = db.Column(db.Date, nullable=False)
    passeio_inicio = db.Column(db.Time, nullable=False)
    passeio_fim = db.Column(db.Time, nullable=False)

    def __repr__(self):
        return f"<Roteiro id={self.id_roteiro} nome={self.nome_roteiro}>"


class Parceiro(db.Model):
    __tablename__ = 'Parceiro'

    id_parceiro = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_parceiro = db.Column(db.String(100), nullable=False)
    tipo_parceiro = db.Column(db.String(50), nullable=False)



class Hotel(db.Model):
    __tablename__ = 'Hotel'

    id_hotel = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_hotel = db.Column(db.String(100), nullable=False)
    hotel_descricao = db.Column(db.String(120), nullable=False)
    id_parceiro = db.Column(db.Integer, db.ForeignKey('Parceiro.id_parceiro'), nullable=False)
    fk_id_destino = db.Column(db.Integer, db.ForeignKey('Destino.id_destino'), nullable=False)

    cep = db.Column(db.String(9), nullable=False)
    rua = db.Column(db.String(100), nullable=False)
    bairro = db.Column(db.String(50), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)

    parceiro = db.relationship('Parceiro', backref='hoteis')
    destino = db.relationship('Destino', backref='hoteis')

    # Ajustado: overlaps entre 'avaliacoes' e 'hotel_avaliacoes'
    avaliacoes = db.relationship(
        'Avaliacao',
        secondary='Hotel_Avaliacao',
        backref=db.backref('hoteis', lazy='dynamic', overlaps="hotel_avaliacoes"),
        lazy='dynamic',
        overlaps="hotel_avaliacoes"
    )

    def __repr__(self):
        return f"<Hotel {self.id_hotel} - {self.nome_hotel}>"
    

class Roteiro_Hotel(db.Model):
    __tablename__ = 'Roteiro_Hotel'

    id_roteiro = db.Column(db.Integer, db.ForeignKey('Roteiro.id_roteiro'), primary_key=True)
    id_hotel = db.Column(db.Integer, db.ForeignKey('Hotel.id_hotel'), primary_key=True)

    # Relacionamentos opcionais para facilitar acesso
    roteiro = db.relationship('Roteiro', backref=db.backref('roteiro_hoteis', cascade='all, delete-orphan'))
    hotel = db.relationship('Hotel', backref=db.backref('roteiro_hoteis', cascade='all, delete-orphan'))

    def __repr__(self):
        return f"<Roteiro_Hotel roteiro_id={self.id_roteiro} hotel_id={self.id_hotel}>"


class Hotel_Avaliacao(db.Model):
    __tablename__ = 'Hotel_Avaliacao'

    id_hotel = db.Column(db.Integer, db.ForeignKey('Hotel.id_hotel'), primary_key=True)
    id_avaliacao = db.Column(db.Integer, db.ForeignKey('Avaliacao.id_avaliacao'), primary_key=True)

    hotel = db.relationship(
        'Hotel',
        backref=db.backref('hotel_avaliacoes', cascade='all, delete-orphan', overlaps="avaliacoes,hoteis"),
        overlaps="avaliacoes,hoteis"
    )
    avaliacao = db.relationship(
        'Avaliacao',
        backref=db.backref('hotel_avaliacoes', cascade='all, delete-orphan', overlaps="avaliacoes,hoteis"),
        overlaps="avaliacoes,hoteis"
    )

    def __repr__(self):
        return f"<Hotel_Avaliacao hotel_id={self.id_hotel} avaliacao_id={self.id_avaliacao}>"


class Avaliacao(db.Model):
    __tablename__ = 'Avaliacao'

    id_avaliacao = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nota_avaliacao = db.Column(db.Integer, nullable=False)
    data_avaliacao = db.Column(db.Date, nullable=False)
    desc_avaliacao = db.Column(db.String(100))

    def __repr__(self):
        return f"<Avaliacao id={self.id_avaliacao} nota={self.nota_avaliacao}>"



class Passeio(db.Model):
    __tablename__ = 'Passeios'

    id_Passeios = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fk_id_roteiro = db.Column(db.Integer, db.ForeignKey('Roteiro.id_roteiro'), nullable=False)
    fk_endereco_atracao = db.Column(db.Integer, db.ForeignKey('endereco_atracao.id_endereco_atracao'), nullable=False)

    Passeio = db.Column(db.String(100), nullable=False)
    Duracao = db.Column(db.Time, nullable=False)
    Preco = db.Column(db.Numeric(10, 2), nullable=False)
    Categoria = db.Column(db.String(50), nullable=False)
    Descricao = db.Column(db.Text(length=400), nullable=True)
    
    Dia_passeio = db.Column(db.Integer, nullable=True)
    Dia_semana = db.Column(db.String(20), nullable=True)
    Data_passeio = db.Column(db.Date, nullable=True)

    roteiro = db.relationship('Roteiro', backref='passeios')
    endereco = db.relationship('EnderecoAtracao', back_populates='passeios')


class EnderecoAtracao(db.Model):
    __tablename__ = 'endereco_atracao'

    id_endereco_atracao = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cep = db.Column(db.String(10), nullable=False)
    rua = db.Column(db.String(100), nullable=False)
    bairro = db.Column(db.String(50), nullable=False)
    complemento = db.Column(db.String(45), nullable=False)

    passeios = db.relationship('Passeio', back_populates='endereco', lazy=True)