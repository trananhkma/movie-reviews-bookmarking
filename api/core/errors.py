from http import HTTPStatus

INTERNAL_ERROR = HTTPStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR"
USER_ALREADY_EXIST = HTTPStatus.BAD_REQUEST, "USER_ALREADY_EXIST"
AUTHENTICATION_FAILED = HTTPStatus.UNAUTHORIZED, "AUTHENTICATION_FAILED"
