from flask import Blueprint, jsonify, render_template, request, redirect, session, url_for
from app.models import *
import traceback
from datetime import datetime
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


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
    

from flask import session, jsonify
from datetime import datetime



@main.route('/api/roteiroAtual')
def roteiro_atual():
    if 'usuario_logado' not in session:
        return jsonify({'erro': 'Usuário não autenticado'}), 401

    usuario = User.query.filter_by(email_usuario=session['usuario_logado']).first()
    if not usuario:
        return jsonify({'erro': 'Usuário não encontrado'}), 404

    # Pega o último roteiro criado (ou você pode usar outra lógica)
    roteiro = Roteiro.query.filter_by(fk_id_usuario=usuario.id_usuario).order_by(Roteiro.id_roteiro.desc()).first()

    if not roteiro:
        return jsonify({'erro': 'Nenhum roteiro encontrado para o usuário logado'}), 404

    # Buscar todos os passeios associados a este roteiro
    passeios = Passeio.query.filter_by(fk_id_roteiro=roteiro.id_roteiro).all()

    # Preparar a lista de passeios com seus detalhes, incluindo endereço
    lista_passeios = []
    for passeio in passeios:
        endereco = EnderecoAtracao.query.get(passeio.fk_endereco_atracao)
        passeio_data = {
            'id': passeio.id_Passeios,
            'nome': passeio.Passeio,
            'duracao': str(passeio.Duracao), # Converter time para string HH:MM:SS
            'preco': float(passeio.Preco),
            'categoria': passeio.Categoria,
            'descricao': passeio.Descricao,
            'dia_passeio': passeio.Dia_passeio,
            'dia_semana': passeio.Dia_semana,
            'data_passeio': passeio.Data_passeio.strftime('%Y-%m-%d') if passeio.Data_passeio else None,
            'endereco': {
                'id_endereco_atracao': endereco.id_endereco_atracao,
                'cep': endereco.cep,
                'rua': endereco.rua,
                'bairro': endereco.bairro,
                'complemento': endereco.complemento
            } if endereco else None
        }
        lista_passeios.append(passeio_data)

    return jsonify({
        'id_roteiro': roteiro.id_roteiro,
        'nome_roteiro': roteiro.nome_roteiro,
        'data_inicial': roteiro.data_inicial.strftime('%Y-%m-%d'),
        'data_final': roteiro.data_final.strftime('%Y-%m-%d'),
        'passeios': lista_passeios  # Adiciona a lista de passeios aqui
    })

@main.route('/api/passeios', methods=['POST'])
def criar_passeio():
    # Verificação de autenticação
    if 'usuario_logado' not in session:
        return jsonify({'erro': 'Usuário não autenticado'}), 401

    try:
        # Verificar se há dados na requisição
        if not request.is_json:
            return jsonify({'erro': 'Content-Type deve ser application/json'}), 400
            
        data = request.get_json()
        
        if not data:
            return jsonify({'erro': 'Nenhum dado recebido'}), 400

        print("=== DEBUG: Dados recebidos ===")
        print(f"Dados completos: {data}")
        print(f"Tipo dos dados: {type(data)}")

        # Validação de campos obrigatórios
        campos_obrigatorios = ['nome', 'duracao', 'preco', 'categoria', 'descricao', 'fk_id_roteiro', 'endereco']
        
        for campo in campos_obrigatorios:
            if campo not in data:
                print(f"Campo obrigatório ausente: {campo}")
                return jsonify({'erro': f"Campo obrigatório '{campo}' está faltando"}), 400
            
            # Verificar se o campo não está vazio (exceto para números)
            if campo not in ['preco', 'fk_id_roteiro'] and not str(data[campo]).strip():
                print(f"Campo obrigatório vazio: {campo}")
                return jsonify({'erro': f"Campo obrigatório '{campo}' não pode estar vazio"}), 400

        # Validação específica do endereço
        endereco_data = data.get('endereco')
        if not isinstance(endereco_data, dict):
            return jsonify({'erro': 'Endereço deve ser um objeto válido'}), 400
            
        campos_endereco_obrigatorios = ['cep', 'rua', 'bairro']
        for campo in campos_endereco_obrigatorios:
            if campo not in endereco_data or not str(endereco_data[campo]).strip():
                print(f"Campo de endereço obrigatório ausente/vazio: {campo}")
                return jsonify({'erro': f"Campo de endereço '{campo}' é obrigatório"}), 400

        # Garantir que complemento existe, mesmo que vazio
        endereco_data['complemento'] = endereco_data.get('complemento', '').strip()

        print("=== DEBUG: Validação de tipos ===")
        
        # Validação e conversão de tipos
        try:
            preco = float(data['preco'])
            if preco < 0:
                return jsonify({'erro': 'Preço não pode ser negativo'}), 400
        except (ValueError, TypeError):
            return jsonify({'erro': 'Preço deve ser um número válido'}), 400

        try:
            fk_id_roteiro = int(data['fk_id_roteiro'])
        except (ValueError, TypeError):
            return jsonify({'erro': 'ID do roteiro deve ser um número válido'}), 400

        # Validação da duração
        duracao_str = data['duracao']
        try:
            # Verificar se está no formato HH:MM:SS
            if len(duracao_str.split(':')) != 3:
                return jsonify({'erro': 'Duração deve estar no formato HH:MM:SS'}), 400
            
            # Tentar converter para verificar se é válida
            datetime.strptime(duracao_str, '%H:%M:%S').time()
        except ValueError:
            return jsonify({'erro': 'Formato de duração inválido. Use HH:MM:SS'}), 400

        # Validação da data
        data_passeio = data.get('data_passeio')
        if data_passeio:
            try:
                data_passeio_obj = datetime.strptime(data_passeio, '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'erro': 'Formato de data inválido. Use YYYY-MM-DD'}), 400
        else:
            data_passeio_obj = datetime.now().date()

        print("=== DEBUG: Processando endereço ===")
        
        # Verificar se o roteiro existe (opcional, mas recomendado)
        roteiro = Roteiro.query.get(fk_id_roteiro)
        if not roteiro:
            return jsonify({'erro': 'Roteiro não encontrado'}), 404

        # Processar endereço
        endereco = EnderecoAtracao.query.filter_by(
            cep=endereco_data['cep'],
            rua=endereco_data['rua'],
            bairro=endereco_data['bairro'],
            complemento=endereco_data['complemento']
        ).first()

        if not endereco:
            print("Criando novo endereço...")
            endereco = EnderecoAtracao(
                cep=endereco_data['cep'],
                rua=endereco_data['rua'],
                bairro=endereco_data['bairro'],
                complemento=endereco_data['complemento']
            )
            db.session.add(endereco)
            db.session.flush()  # Para obter o ID
            print(f"Endereço criado com ID: {endereco.id_endereco_atracao}")
        else:
            print(f"Endereço existente encontrado com ID: {endereco.id_endereco_atracao}")

        print("=== DEBUG: Criando passeio ===")
        
        # Criar o passeio
        passeio = Passeio(
            fk_id_roteiro=fk_id_roteiro,
            Passeio=data['nome'].strip(),
            Duracao=datetime.strptime(duracao_str, '%H:%M:%S').time(),
            Preco=preco,
            Categoria=data['categoria'].strip(),
            Descricao=data['descricao'].strip(),
            Dia_passeio=data.get('dia_passeio', 1),
            Dia_semana=data.get('dia_semana', ''),
            Data_passeio=data_passeio_obj,
            fk_endereco_atracao=endereco.id_endereco_atracao
        )

        db.session.add(passeio)
        db.session.commit()

        print(f"=== DEBUG: Passeio criado com sucesso - ID: {passeio.id_Passeios} ===")
        
        return jsonify({
            'mensagem': 'Passeio criado com sucesso',
            'id': passeio.id_Passeios,
            'endereco_id': endereco.id_endereco_atracao
        }), 201

    except IntegrityError as e:
        db.session.rollback()
        print(f"Erro de integridade do banco: {str(e)}")
        return jsonify({'erro': 'Erro de integridade dos dados. Verifique se todos os relacionamentos estão corretos.'}), 400
        
    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"Erro SQLAlchemy: {str(e)}")
        return jsonify({'erro': 'Erro na base de dados'}), 500
        
    except Exception as e:
        db.session.rollback()
        print(f"=== DEBUG: Erro não tratado ===")
        print(f"Tipo do erro: {type(e)}")
        print(f"Mensagem: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        return jsonify({'erro': f'Erro interno: {str(e)}'}), 500

#---------------------------------------------------------------------------------
