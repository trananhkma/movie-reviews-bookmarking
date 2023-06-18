from http import HTTPStatus

from flask import jsonify
from flask_restful import Resource, fields, marshal_with, reqparse

from api.common.utils import valid_string
from api.services.auth import auth_required
from api.services.folder import create_folder, delete_folder, get_folders

review_fields = {
    "id": fields.Integer,
    "display_title": fields.String,
    "byline": fields.String,
    "summary_short": fields.String,
    "publication_date": fields.DateTime,
    "link": fields.String,
    "img": fields.String,
}

folder_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "reviews": fields.List(fields.Nested(review_fields)),
}


create_folder_request_body = reqparse.RequestParser()
create_folder_request_body.add_argument(
    "name",
    required=True,
    location="json",
    type=valid_string,
)


class Folder(Resource):
    # @marshal_with(folder_fields)
    @auth_required
    def get(self, current_user):
        folders = get_folders(current_user)
        return jsonify(folders.all()), HTTPStatus.OK

    @auth_required
    @marshal_with(folder_fields)
    def post(self, current_user):
        body = create_folder_request_body.parse_args()
        return create_folder(current_user, body["name"]), HTTPStatus.CREATED

    @auth_required
    def delete(self, current_user, folder_id):
        delete_folder(current_user, folder_id)
        return None, HTTPStatus.NO_CONTENT
