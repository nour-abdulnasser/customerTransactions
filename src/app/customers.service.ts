import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'https://gist.githubusercontent.com/nour-abdulnasser/b8258ac15e7ea565388c65a4e429412c/raw/a328acce237d1fabe8a5602eba09afae69c0dd3f/db.json';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(map((data) => data.customers));
  }
}
