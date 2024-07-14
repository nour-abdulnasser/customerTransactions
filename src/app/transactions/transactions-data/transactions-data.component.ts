import { Component } from '@angular/core';
import { Input, OnChanges } from '@angular/core';
import { TransactionService } from 'src/app/transactions.service';

@Component({
  selector: 'app-transactions-data',
  templateUrl: './transactions-data.component.html',
  styleUrls: ['./transactions-data.component.css']
})
export class TransactionsDataComponent implements OnChanges {
  @Input() customerId: number = 0;
  transactions: any[] = [];
  graphData: any[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnChanges(): void {
    if (this.customerId) {
      this.transactionService.getTransactions().subscribe(transactions => {
        this.transactions = transactions.filter((transaction: any) => transaction.customer_id === this.customerId);
        this.prepareGraphData();
      });
    }
  }

  prepareGraphData(): void {
    const data = this.transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});

    this.graphData = Object.keys(data).map(date => ({
      name: date,
      value: data[date]
    }));
  }
}


