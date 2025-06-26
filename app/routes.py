from flask import Blueprint, jsonify, render_template, request, redirect, session, url_for
from app.models import *
import traceback
from datetime import datetime


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

@main.route('/criarRoteiro', methods=['POST'])
def criar_roteiro():
    if 'usuario_logado' not in session:
        return jsonify({'erro': 'Usuário não autenticado'}), 401

    email = session['usuario_logado']
    usuario = User.query.filter_by(email_usuario=email).first()

    if not usuario:
        return jsonify({'erro': 'Usuário não encontrado'}), 404

    data = request.get_json()

    try:
        roteiro = Roteiro(
            nome_roteiro=data['nome_roteiro'],
            fk_id_usuario=usuario.id_usuario,  # <- Agora temos o ID real
            fk_id_destino=data['fk_id_destino'],
            data_inicial=datetime.strptime(data['data_inicial'], '%Y-%m-%d').date(),
            data_final=datetime.strptime(data['data_final'], '%Y-%m-%d').date(),
            passeio_inicio=datetime.strptime(data['passeio_inicio'], '%H:%M').time(),
            passeio_fim=datetime.strptime(data['passeio_fim'], '%H:%M').time()
        )

        db.session.add(roteiro)
        db.session.commit()

        roteiro_hotel = Roteiro_Hotel(
            id_roteiro=roteiro.id_roteiro,
            id_hotel=data['id_hotel']
        )

        db.session.add(roteiro_hotel)
        db.session.commit()

        return jsonify({'mensagem': 'Roteiro criado com sucesso'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500
    

@main.route('/api/roteiroAtual')
def roteiro_atual():
    from flask import session, jsonify

    if 'usuario_logado' not in session:
        return jsonify({'erro': 'Usuário não autenticado'}), 401

    usuario = User.query.filter_by(email_usuario=session['usuario_logado']).first()
    if not usuario:
        return jsonify({'erro': 'Usuário não encontrado'}), 404

    # Pega o último roteiro criado (ou você pode usar outra lógica)
    roteiro = Roteiro.query.filter_by(fk_id_usuario=usuario.id_usuario).order_by(Roteiro.id_roteiro.desc()).first()

    if not roteiro:
        return jsonify({'erro': 'Nenhum roteiro encontrado'}), 404

    return jsonify({
        'id_roteiro': roteiro.id_roteiro,
        'nome_roteiro': roteiro.nome_roteiro,
        'data_inicial': roteiro.data_inicial.strftime('%Y-%m-%d'),
        'data_final': roteiro.data_final.strftime('%Y-%m-%d')
    })

