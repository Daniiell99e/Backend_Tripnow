from flask import Blueprint, jsonify, render_template, request, redirect, session, flash, url_for
from app.models import *
from werkzeug.security import generate_password_hash, check_password_hash
import traceback


main = Blueprint('main', __name__)

@main.route('/')
def home():
    if session.get('usuario_logado') is None:
        return redirect(url_for('main.login'))
    return render_template('index.html')


@main.route('/criarRoteiro')
def criarRoteiro():
    if session.get('usuario_logado') is None:
        return redirect(url_for('main.login'))
    return render_template('Criar novo roteiro2.html')

@main.route('/destinos', methods=['GET'])
def get_destinos():
    destinos = Destino.query.all()
    resultado = []
    for destino in destinos:
        resultado.append({
            'id_destino': destino.id_destino,
            'nome_destino': destino.nome_destino,
            'desc_destino': destino.desc_destino
        })
    return jsonify(resultado)

@main.route('/datasroteiro')
def datasRoteiro():
    if session.get('usuario_logado') is None:
        return redirect(url_for('main.login'))
    return render_template('datasRoteiro.html')

@main.route('/seusRoteiros')
def seusRoteiros():
    if session.get('usuario_logado') is None:
        return redirect(url_for('main.login'))
    return render_template('SeusRoteiros.html')

@main.route('/hotel')
def hotel():
    if session.get('usuario_logado') is None:
        return redirect(url_for('main.login'))
    return render_template('hotel.html')

@main.route('/api/hoteis')
def listar_hoteis():
    hoteis = Hotel.query.all()
    resultado = []
    for hotel in hoteis:
        avaliacoes = []
        for avaliacao in hotel.avaliacoes:
            avaliacoes.append({
                'id_avaliacao': avaliacao.id_avaliacao,
                'nota_avaliacao': avaliacao.nota_avaliacao,
                'data_avaliacao': avaliacao.data_avaliacao.strftime('%Y-%m-%d'),
                'desc_avaliacao': avaliacao.desc_avaliacao
            })

        endereco_completo = f"{hotel.rua}, {hotel.bairro}, CEP: {hotel.cep}"

        resultado.append({
            'id_hotel': hotel.id_hotel,
            'nome_hotel': hotel.nome_hotel,
            'hotel_descricao': hotel.hotel_descricao,
            'id_parceiro': hotel.id_parceiro,
            'fk_id_destino': hotel.fk_id_destino,
            'nome_destino': hotel.destino.nome_destino.lower().replace(' ', ''),
            'telefone': hotel.telefone,
            'endereco': endereco_completo,
            'avaliacoes': avaliacoes
        })

    return jsonify(resultado)


@main.route('/horarios')
def horarios():
    if session.get('usuario_logado') is None:
        return redirect(url_for('main.login'))
    return render_template('horarioroteiro.html')



