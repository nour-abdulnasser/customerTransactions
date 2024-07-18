import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public customerSelected = new BehaviorSubject(0);
  currentCustomer = this.customerSelected.asObservable();

  private baseUrl = '../assets/db.json/';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map((data) => data.transactions));
  }

  setSelectedCustomer(customerSelected: any) {
    this.customerSelected.next(customerSelected);
    // console.log(customerSelected, "from service");
  }
}
