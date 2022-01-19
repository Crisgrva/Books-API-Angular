#!/usr/bin/python3
"""
Books Model
"""
from utils.db import db
from uuid import uuid4


class Book(db.Model):
    """
    Given this Model:
        id: uuid.uuid4().hex
        title: str
        author: str
        read: Boolean
    """
    id = db.Column(db.String(32), primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    author = db.Column(db.String(25), nullable=False)
    read = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, title, author, read):
        """
        Constructor method:
            id: Set unique identifier with uuid module
        """
        self.id = uuid4().hex
        self.title = title
        self.author = author
        self.read = read

    def update(self, **kwargs):
        """ Update instance from dict """
        setattr(self, "title", kwargs["title"])
        setattr(self, "author", kwargs["author"])
        setattr(self, "read", kwargs["read"])

    def json(self):
        """ Return instance as JSON """
        return {book.name: getattr(self, book.name)
                for book in self.__table__.columns}
