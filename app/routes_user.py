from flask import Blueprint, jsonify, render_template, request, redirect, session, flash, url_for
from app.models import *
from werkzeug.security import generate_password_hash, check_password_hash
import traceback
from .routes import main

@main.route('/login')
def login():
    return render_template('login.html')

@main.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')


@main.route('/autenticar', methods=["POST"])
def logar():
    # from models import User
    from flask import request, jsonify, session, url_for

    dados = request.get_json()

    usuario = User.query.filter_by(email_usuario=dados['username']).first()

    if usuario and check_password_hash(usuario.senha_usuario, dados['password']):
        session['usuario_logado'] = dados['username']
        return jsonify(success=True, redirect=url_for('main.home'))
    else:
        return jsonify(success=False, mensagem='Usuário ou senha inválidos'), 401

    
@main.route('/addUsuarioFormulario', methods=["POST"])
def add_usuario_formulario():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Requisição inválida, JSON ausente"}), 400

    nome = data.get("firstname")
    sobrenome = data.get("lastname")
    email = data.get("email")
    telefone = data.get("number")
    senha = data.get("password")
    confirmar_senha = data.get("confirmpassword")
    genero = data.get("gender")
    aceitou_termos = data.get("contrato")

    if not aceitou_termos:
        return jsonify({"message": "É necessário aceitar os termos"}), 400

    if senha != confirmar_senha:
        return jsonify({"message": "As senhas não coincidem"}), 400

    # Verifica se o email já está cadastrado
    usuario_existente = User.query.filter_by(email_usuario=email).first()
    if usuario_existente:
        return jsonify({"message": "Usuário já cadastrado com este e-mail"}), 409  # 409 = Conflict

    senha_hash = generate_password_hash(senha)

    novo_usuario = User(
        nome_usuario=f"{nome} {sobrenome}",
        primeiro_nome_usuario=nome,
        sobrenome_usuario=sobrenome,
        email_usuario=email,
        telefone_usuario=telefone,
        senha_usuario=senha_hash,
        id_genero=int(genero) if genero else None
    )

    try:
        db.session.add(novo_usuario)
        db.session.commit()
        return jsonify({"message": "Usuário cadastrado com sucesso"}), 200
    except Exception as e:
        print("Erro ao salvar:", e)
        traceback.print_exc()
        return jsonify({"message": "Erro ao salvar no banco de dados"}), 500

    
@main.route('/sair')
def sair():
    session['usuario_logado'] = None
    return redirect('main.login')