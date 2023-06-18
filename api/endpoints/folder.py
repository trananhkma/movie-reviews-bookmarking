from datetime import datetime
from http import HTTPStatus
from typing import List

from flask_pydantic import validate
from flask_restful import Resource
from pydantic import BaseModel, validator

from api.common.utils import valid_string
from api.services.auth import auth_required
from api.services.folder import create_folder, delete_folder, get_folders


class ReviewResponse(BaseModel):
    id: int
    display_title: str
    byline: str
    summary_short: str
    publication_date: datetime
    link: str
    img: str

    class Config:
        orm_mode = True


class FolderResponse(BaseModel):
    id: int
    name: str
    reviews: List[ReviewResponse]

    class Config:
        orm_mode = True


class ListFolderResponse(BaseModel):
    __root__: List[FolderResponse]

    class Config:
        orm_mode = True


class CreateFolderRequest(BaseModel):
    name: str

    name_validator = validator("name", allow_reuse=True)(valid_string)


class Folder(Resource):
    @auth_required
    @validate()
    def get(self, current_user):
        folders = get_folders(current_user)
        return ListFolderResponse(__root__=folders.all()), HTTPStatus.OK

    @auth_required
    @validate()
    def post(self, current_user, body: CreateFolderRequest):
        folder = create_folder(current_user, body.name)
        return (
            FolderResponse(id=folder.id, name=folder.name, reviews=folder.reviews),
            HTTPStatus.CREATED,
        )

    @auth_required
    def delete(self, current_user, folder_id):
        delete_folder(current_user, folder_id)
        return None, HTTPStatus.NO_CONTENT
