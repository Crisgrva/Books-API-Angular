import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books?: Book[];
  currentBook: Book = {};
  currentIndex = -1;
  title = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = [];
        for (const [key, value] of Object.entries(data)) {
          this.books.push(value);
        }
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = {};
    this.currentIndex = -1;
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }
}
