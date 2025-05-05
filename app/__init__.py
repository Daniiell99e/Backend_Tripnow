# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Carrega as configurações do arquivo config.py
    app.config.from_object('config')

    # Inicializa a extensão do SQLAlchemy com a app
    db.init_app(app)

    # Importa e registra o blueprint das rotas
    from .routes import main
    app.register_blueprint(main)

    return app
