import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

const baseUrl = 'http://127.0.0.1:5000/';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl);
  }

  get(id: any): Observable<Book> {
    return this.http.get(`${baseUrl}books/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/new`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}books/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}delete/${id}`);
  }
}
