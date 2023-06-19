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
    NYT_API_ENDPOINT="https://api.nytimes.com/svc/movies/v2/reviews/search.json",
    DEFAULT_IMAGE_URL="https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    NYT_API_KEY=os.getenv("NYT_API_KEY"),
    SQLALCHEMY_DATABASE_URI=db_uri,
)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

api = Api(app)
api.prefix = "/api"

# avoid circular import
from api.endpoints.auth import Login, SignUp
from api.endpoints.folder import Folder
from api.endpoints.review import PublicReview, Review

api.add_resource(SignUp, "/signup")
api.add_resource(Login, "/auth")
api.add_resource(Folder, "/folder", "/folder/<int:folder_id>")
api.add_resource(Review, "/review", "/review/<int:review_id>")
api.add_resource(PublicReview, "/review/public")


if __name__ == "__main__":
    app.run()
