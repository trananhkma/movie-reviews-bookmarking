from werkzeug.exceptions import HTTPException


class GenericException(HTTPException):
    """Return response with predefined error"""

    def __init__(self, error):
        status_code, message = error
        self.code = status_code
        super().__init__(description=message)
