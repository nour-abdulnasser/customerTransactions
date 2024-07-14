// transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get(this.baseUrl + 'transactions');
  }
}
