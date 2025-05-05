# config.py
import os

SECRET_KEY = 'dan123asasasafefw'

SQLALCHEMY_DATABASE_URI = (
    '{SGBD}://{usuario}:{senha}@{servidor}/{database}'.format(
        SGBD='mysql+mysqlconnector',
        usuario='root',
        senha='AdmDan20_3',
        servidor='localhost',
        database='trip_now'
    )
)

SQLALCHEMY_TRACK_MODIFICATIONS = False
