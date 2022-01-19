#!/usr/bin/python3
"""
Setup file
"""
from flask import Flask  # Flask
from flask_sqlalchemy import SQLAlchemy
from routes.books import books  # Books Routes
from utils.db import db  # Database
from flask_cors import CORS


# App instance configuration
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root@localhost/booksdb'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
SQLAlchemy(app)

# Getting books router
app.register_blueprint(books)

# Creating all tables of models in Database
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
