import os

from .app import db

MAX_STR_LENGTH = int(os.getenv("MAX_STR_LENGTH"))


class BaseFields:
    id = db.Column(db.Integer, primary_key=True)


class User(db.Model, BaseFields):
    __table_name__ = "user"
    username = db.Column(db.String(MAX_STR_LENGTH), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    folders = db.relationship("Folder", backref="user", lazy=True)
    reviews = db.relationship("Review", backref="user", lazy=True)

    def __repf__(self):
        return "<User {}>".format(self.username)


class Folder(db.Model, BaseFields):
    __table_name__ = "folder"
    __table_args__ = (db.UniqueConstraint("name", "user_id"),)

    name = db.Column(db.String(MAX_STR_LENGTH))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    reviews = db.relationship("Review", backref="folder", lazy=True)

    def __repf__(self):
        return "<Folder {}>".format(self.name)


class Review(db.Model, BaseFields):
    __table_name__ = "review"
    __table_args__ = (db.UniqueConstraint("display_title", "user_id"),)

    display_title = db.Column(db.String(MAX_STR_LENGTH))
    byline = db.Column(db.String(MAX_STR_LENGTH))
    summary_short = db.Column(db.Text)
    publication_date = db.Column(db.DateTime)
    link = db.Column(db.Text)
    img = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    folder_id = db.Column(db.Integer, db.ForeignKey("folder.id"), nullable=False)

    def __repf__(self):
        return "<Review {}>".format(self.display_title)
