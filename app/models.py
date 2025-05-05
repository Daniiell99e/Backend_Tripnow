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