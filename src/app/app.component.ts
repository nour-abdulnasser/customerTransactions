import { Component } from '@angular/core';
import { TransactionService } from './transactions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private transactionService: TransactionService){

  }
  selectedCustomerId: number = 0;
  title = 'customerTransacs';

 
}
