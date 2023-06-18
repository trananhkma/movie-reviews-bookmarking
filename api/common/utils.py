import os

MAX_STR_LENGTH = int(os.getenv("MAX_STR_LENGTH"))


def valid_string(s):
    if not s:
        raise ValueError("Must not be empty string")
    if len(s) > MAX_STR_LENGTH:
        raise ValueError("Longer than {} characters".format(MAX_STR_LENGTH))
    return s
