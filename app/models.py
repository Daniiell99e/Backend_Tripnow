# app/models.py
from . import db

class User(db.Model):
    __tablename__ = 'Usuario'

    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_usuario = db.Column(db.String(100), nullable=False)
    primeiro_nome_usuario = db.Column(db.String(100))
    sobrenome_usuario = db.Column(db.String(100))
    endereco_usuario = db.Column(db.String(250))
    email_usuario = db.Column(db.String(100), nullable=False, unique=True)
    senha_usuario = db.Column(db.String(255), nullable=False)
    telefone_usuario = db.Column(db.String(20))
    id_genero = db.Column(db.Integer, db.ForeignKey('Genero.id_genero'))


    def __repr__(self):
        return f'<Usuario {self.nome_usuario}>'
    
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

class Parceiro(db.Model):
    __tablename__ = 'Parceiro'

    id_parceiro = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)

    # Relação com Hotel
    hoteis = db.relationship('Hotel', backref='parceiro', lazy=True)

class Hotel(db.Model):
    __tablename__ = 'Hotel'

    id_hotel = db.Column(db.Integer, primary_key=True)
    nome_hotel = db.Column(db.String(100), nullable=False)
    endereco_hotel = db.Column(db.String(250), nullable=False)

    id_parceiro = db.Column(db.Integer, db.ForeignKey('Parceiro.id_parceiro'), nullable=False)