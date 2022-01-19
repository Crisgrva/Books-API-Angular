import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    read: false,
  };
  submitted = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  saveBook(): void {
    const data = {
      title: this.book.title,
      author: this.book.author,
      read: this.book.read
    };

    this.bookService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      author: '',
      read: false,
    };
  }
}
