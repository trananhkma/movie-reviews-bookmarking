from http import HTTPStatus

from flask_restful import Resource, fields, marshal_with, reqparse

from api.common.utils import valid_string
from api.services.auth import create_token, create_user

signup_request_body = reqparse.RequestParser()
signup_request_body.add_argument(
    "username",
    required=True,
    location="json",
    type=valid_string,
)
signup_request_body.add_argument(
    "password",
    required=True,
    location="json",
    type=valid_string,
)

signup_response = {
    "username": fields.String,
}


class SignUp(Resource):
    @marshal_with(signup_response)
    def post(self):
        body = signup_request_body.parse_args()
        user = create_user(body["username"], body["password"])
        return user, HTTPStatus.CREATED


########################################################################################


login_request_body = reqparse.RequestParser()
login_request_body.add_argument(
    "username",
    required=True,
    location="json",
    type=valid_string,
)
login_request_body.add_argument(
    "password",
    required=True,
    location="json",
    type=valid_string,
)
login_response = {
    "token": fields.String,
}


class Login(Resource):
    @marshal_with(login_response)
    def post(self):
        body = login_request_body.parse_args()
        token = create_token(body["username"], body["password"])
        return {"token": token}, HTTPStatus.OK
