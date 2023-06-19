import os

from api.app import db

MAX_STR_LENGTH = int(os.getenv("MAX_STR_LENGTH"))


def valid_string(s):
    if not s:
        raise ValueError("Must not be empty string")
    if len(s) > MAX_STR_LENGTH:
        raise ValueError("Longer than {} characters".format(MAX_STR_LENGTH))
    return s


def get_or_create(model, data):
    instance = model.query.filter_by(**data).first()
    if instance:
        return instance
    else:
        instance = model(**data)
        db.session.add(instance)
        db.session.commit()
        return instance
