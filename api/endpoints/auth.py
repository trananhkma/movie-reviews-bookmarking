from http import HTTPStatus

from flask_pydantic import validate
from flask_restful import Resource
from pydantic import BaseModel, validator

from api.common.utils import valid_string
from api.services.auth import create_token, create_user


class SignupRequest(BaseModel):
    username: str
    password: str

    username_validator = validator("username", allow_reuse=True)(valid_string)
    password_validator = validator("password", allow_reuse=True)(valid_string)


class SignupResponse(BaseModel):
    username: str


class SignUp(Resource):
    @validate()
    def post(self, body: SignupRequest):
        user = create_user(body.username, body.password)
        return SignupResponse(username=user.username), HTTPStatus.CREATED


########################################################################################


class LoginRequest(SignupRequest):
    pass


class LoginResponse(BaseModel):
    token: str


class Login(Resource):
    @validate()
    def post(self, body: LoginRequest):
        token = create_token(body.username, body.password)
        return LoginResponse(token=token), HTTPStatus.OK
