import os

from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

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


if __name__ == "__main__":
    app.run()
