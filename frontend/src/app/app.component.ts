import { Component } from '@angular/core';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private bookService: BookService
  ) {
    this.bookService.getBooks().subscribe(resp => {
      console.log(resp);

    })
  }
}
