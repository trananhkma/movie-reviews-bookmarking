import requests

from api.app import app, db
from api.common.utils import get_or_create
from api.core.errors import (
    BAD_REQUEST,
    FOLDER_NOT_FOUND,
    REVIEW_NOT_FOUND,
    SERVICE_UNAVAILABLE,
)
from api.core.exceptions import GenericException
from api.models import Folder, Review


def get_public_reviews(query=None, offset=0):
    response = requests.get(
        app.config["NYT_API_ENDPOINT"],
        params={"query": query, "offset": offset, "api-key": app.config["NYT_API_KEY"]},
    )

    if not response.ok:
        if response.status_code == 400:
            raise GenericException(BAD_REQUEST)
        raise GenericException(SERVICE_UNAVAILABLE)

    data = response.json()
    results = data.get("results") or []

    for r in results:
        r["link"] = r["link"]["url"]
        try:
            r["img"] = r["multimedia"]["src"]
        except Exception:
            r["img"] = app.config["DEFAULT_IMAGE_URL"]

    return results


def create_review(user, data):
    query = {"user_id": user.id, "id": data.folder_id}
    folder = Folder.query.filter_by(**query).first()
    if not folder:
        raise GenericException(FOLDER_NOT_FOUND)

    data_dict = data.dict()
    data_dict["user_id"] = user.id
    review = get_or_create(Review, data_dict)
    return review


def delete_review(user, review_id):
    query = {"user_id": user.id, "id": review_id}
    review = Review.query.filter_by(**query).first()
    if not review:
        raise GenericException(REVIEW_NOT_FOUND)

    db.session.delete(review)
    db.session.commit()
