import os

from werkzeug.security import generate_password_hash

from api.app import db
from api.core.errors import USER_ALREADY_EXIST
from api.core.exceptions import GenericException
from api.models import User

MAX_STR_LENGTH = int(os.getenv("MAX_STR_LENGTH"))


def valid_string(s):
    if not s:
        raise ValueError("Must not be empty string")
    if len(s) > MAX_STR_LENGTH:
        raise ValueError("Longer than {} characters".format(MAX_STR_LENGTH))
    return s


def create_user(username, password):
    user = User.query.filter_by(username=username).first()
    if user:
        raise GenericException(USER_ALREADY_EXIST)
    user = User(username=username, password=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()
    return user
