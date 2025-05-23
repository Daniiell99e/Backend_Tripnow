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
    return render_template('Criar novo roteiro2.html')

@main.route('/seusRoteiros')
def seusRoteiros():
    return render_template('SeusRoteiros.html')


