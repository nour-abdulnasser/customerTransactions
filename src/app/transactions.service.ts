import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  public customerSelected = new BehaviorSubject(0)
  currentCustomer = this.customerSelected.asObservable();

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get(this.baseUrl + 'transactions');
  }

  setSelectedCustomer(customerSelected:any){

    this.customerSelected.next(customerSelected)
    // console.log(customerSelected, "from service");
    
  }

  }

