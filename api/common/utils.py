import os
from datetime import datetime, timedelta

import jwt
from werkzeug.security import check_password_hash, generate_password_hash

from api.app import db
from api.core.errors import AUTHENTICATION_FAILED, USER_ALREADY_EXIST
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


def create_token(username, password):
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        raise GenericException(AUTHENTICATION_FAILED)

    token = jwt.encode(
        {"username": username, "exp": datetime.utcnow() + timedelta(days=1)},
        os.getenv("SECRET_KEY"),
    )

    return token
