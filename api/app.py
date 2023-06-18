import os

from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from werkzeug.exceptions import HTTPException

from api.core.errors import INTERNAL_ERROR
from api.core.exceptions import GenericException

app = Flask(__name__)


@app.errorhandler(Exception)
def error_handler(e):
    if not isinstance(e, HTTPException):
        raise GenericException(INTERNAL_ERROR)

    return jsonify(error=str(e)), e.code


db_uri = "postgresql+psycopg2://{user}:{pw}@{host}/{db}".format(
    user=os.getenv("POSTGRES_USER"),
    pw=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    db=os.getenv("POSTGRES_DB"),
)

app.config.update(
    SECRET_KEY=os.getenv("SECRET_KEY"),
    SQLALCHEMY_DATABASE_URI=db_uri,
)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

api = Api(app)
api.prefix = "/api"

# avoid circular import
from api.endpoints.auth import Login, SignUp

api.add_resource(SignUp, "/signup")
api.add_resource(Login, "/auth")


if __name__ == "__main__":
    app.run()
