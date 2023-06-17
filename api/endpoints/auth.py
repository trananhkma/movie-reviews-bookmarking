from flask_restful import Resource, fields, marshal_with, reqparse

from api.common.utils import create_user, valid_string

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
        return user
