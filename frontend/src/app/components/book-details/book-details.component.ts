import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentBook: Book = {
    title: '',
    author: '',
    read: false,
  };
  message = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getBook(this.route.snapshot.params['id']);
    }
  }
  getBook(id: string): void {
    this.bookService.get(id).subscribe({
      next: (data) => {
        this.currentBook = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateRead(status: boolean): void {
    const data = {
      title: this.currentBook.title,
      author: this.currentBook.author,
      read: status,
    };

    this.message = '';

    this.bookService.update(this.currentBook.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentBook.read = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateBook(): void {
    this.message = '';
    this.bookService.update(this.currentBook.id, this.currentBook).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This book was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/books']);
      },
      error: (e) => console.error(e),
    });
  }
}
