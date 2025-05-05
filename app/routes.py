from flask import Blueprint, jsonify, render_template, request, redirect, session, flash, url_for
from app.models import *

main = Blueprint('main', __name__)

@main.route('/')
def home():
    if session.get('usuario_logado') is None:
        return redirect(url_for('main.login'))
    return render_template('index.html')

@main.route('/login')
def login():
    return render_template('login.html')

@main.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

@main.route('/criarRoteiro')
def criarRoteiro():
    return render_template('Criar novo roteiro2.html')

@main.route('/seusRoteiros')
def seusRoteiros():
    return render_template('SeusRoteiros.html')

@main.route('/autenticar', methods = ["POST",])
def logar():

    usuario = User.query.filter_by(email_usuario = request.form['username']).first()
    
    if usuario:

        if request.form['password'] == usuario.senha_usuario:

            session['usuario_logado'] = request.form['username']

            flash(f'Usuário {usuario.email_usuario} logado com sucesso!')

            return redirect(url_for('main.home'))
        else:
            flash('Usuário ou senha inválidos!')

            return redirect(url_for('main.login'))
    else:

        flash('Usuário ou senha inválidos!')

        return redirect(url_for('main.login'))
    
@main.route('/sair')
def sair():
    session['usuario_logado'] = None
    return redirect('main.login')
