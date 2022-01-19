#!/usr/bin/python3
"""
Here you can find all routes to:
Create,
Read,
Update, and
Delete books
"""
from flask import Blueprint, request, Response
from models.books import Book
from utils.db import db


books = Blueprint('books', __name__)


@books.route("/", methods=["GET"])
def home():
    """
    Sends JSON string with all
    books saved in database
    """
    all_books = Book.query.all()
    return {book.id: book.json() for book in all_books}


@books.route("/new", methods=["POST"])
def new_book():
    """
    Checks if a new book can be created
    and adds this new record to the database
    """
    try:
        # Required fields, Raises an error if the key was not found.
        title = request.json["title"]
        author = request.json["author"]
    except KeyError:
        return Response(
            '{"message": "Title and Author fields are required"}',
            status=400
        )

    # Optional field
    read = request.json.get("read")

    new_book = Book(title, author, read)
    db.session.add(new_book)
    db.session.commit()

    return new_book.json(), 201


@books.route("/books/<id>", methods=["PUT", "GET"])
def update_book(id):
    """
    Checks if it has found a book with
    this id and updates its attributes
    """
    book = Book.query.get(id)

    if not book:
        return Response(
            '{"message":"This book could not be found"}',
            status=404
        )

    if request.method == "GET":
        return book.json(), 200
    elif request.method == "PUT":
        book.update(**request.json)
        db.session.commit()
        return Response(
            '{"message": "This book has been updated"}',
            status=200
        )


@books.route("/delete/<id>", methods=["DELETE"])
def delete_book(id):
    """
    Checks if it has found a book
    with this id and deletes it.
    """
    book = Book.query.get(id)
    if book:
        db.session.delete(book)
        db.session.commit()
        return Response(
            '{"message": "This book has been deleted"}',
            status=200
        )

    return Response(
        '{"message": "This book could not be found"}',
        status=404
    )
