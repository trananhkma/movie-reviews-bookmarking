import os
from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import request
from werkzeug.security import check_password_hash, generate_password_hash

from api.app import db
from api.core.errors import (
    AUTHENTICATION_FAILED,
    AUTHORIZATION_HEADER_REQUIRED,
    INVALID_TOKEN,
    TOKEN_EXPIRED,
    TOKEN_REQUIRED,
    USER_ALREADY_EXIST,
)
from api.core.exceptions import GenericException
from api.models import User


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


def auth_required(f):
    @wraps(f)
    def decorated(self, *args, **kwargs):
        """Check token by looking for Authorization header.
        Authorization: Token xxxxx
        """
        token = None
        if "Authorization" not in request.headers:
            raise GenericException(AUTHORIZATION_HEADER_REQUIRED)

        value = request.headers["Authorization"]
        if value.startswith("Token "):
            token = value.split(" ")[1]

        if not token:
            raise GenericException(TOKEN_REQUIRED)

        try:
            data = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms="HS256")
            current_user = User.query.filter_by(username=data["username"]).first()
            if datetime.utcnow().timestamp() >= data["exp"]:
                raise GenericException(TOKEN_EXPIRED)
        except:
            raise GenericException(INVALID_TOKEN)

        return f(self, current_user, *args, **kwargs)

    return decorated
