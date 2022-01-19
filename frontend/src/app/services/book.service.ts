import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  _url = 'http://127.0.0.1:5000/'

  constructor(
    private http: HttpClient
  ) {
    console.log("Hola");
  }

  getBooks() {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get(this._url, {
      headers: header
    })
  }
}
