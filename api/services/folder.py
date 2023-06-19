from api.app import db
from api.core.errors import FOLDER_ALREADY_EXIST, FOLDER_NOT_FOUND
from api.core.exceptions import GenericException
from api.models import Folder


def get_folders(user):
    return Folder.query.filter_by(user_id=user.id).order_by(Folder.name).all()


def create_folder(user, name):
    query = {"user_id": user.id, "name": name}
    folder = Folder.query.filter_by(**query).first()
    if folder:
        raise GenericException(FOLDER_ALREADY_EXIST)
    folder = Folder(**query)
    db.session.add(folder)
    db.session.commit()
    return folder


def delete_folder(user, folder_id):
    query = {"user_id": user.id, "id": folder_id}
    folder = Folder.query.filter_by(**query).first()
    if not folder:
        raise GenericException(FOLDER_NOT_FOUND)

    db.session.delete(folder)
    db.session.commit()
