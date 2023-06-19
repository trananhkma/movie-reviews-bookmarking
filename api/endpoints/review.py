from datetime import date
from http import HTTPStatus
from typing import List

from flask_pydantic import validate
from flask_restful import Resource
from pydantic import BaseModel, validator

from api.common.utils import valid_string
from api.services.auth import auth_required
from api.services.review import create_review, delete_review, get_public_reviews


class PublicReviewResponse(BaseModel):
    display_title: str
    byline: str
    summary_short: str
    publication_date: date
    link: str
    img: str

    title_validator = validator("display_title", allow_reuse=True)(valid_string)
    byline_validator = validator("byline", allow_reuse=True)(valid_string)


class ListPublicReviewResponse(BaseModel):
    __root__: List[PublicReviewResponse]


class CreateReviewRequest(PublicReviewResponse):
    folder_id: int


class ReviewResponse(CreateReviewRequest):
    id: int

    class Config:
        orm_mode = True
        fields = {"folder_id": {"exclude": True}}


class ListReviewQuery(BaseModel):
    query: str = None
    offset: int = 0


class Review(Resource):
    @validate()
    def get(self, query: ListReviewQuery):
        reviews = get_public_reviews(query.query, query.offset)
        return ListPublicReviewResponse(__root__=reviews), HTTPStatus.OK

    @auth_required
    @validate()
    def post(self, current_user, body: CreateReviewRequest):
        review = create_review(current_user, body)
        return ReviewResponse.from_orm(review), HTTPStatus.CREATED

    @auth_required
    def delete(self, current_user, review_id):
        delete_review(current_user, review_id)
        return None, HTTPStatus.NO_CONTENT
