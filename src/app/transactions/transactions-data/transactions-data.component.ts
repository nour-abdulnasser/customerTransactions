import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { TransactionService } from 'src/app/transactions.service';

@Component({
  selector: 'app-transactions-data',
  templateUrl: './transactions-data.component.html',
  styleUrls: ['./transactions-data.component.css']
})
export class TransactionsDataComponent implements OnChanges {
  @Input() customerId: number = 0;
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;

  transactions: any[] = [];
  graphData: any[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnChanges(): void {
    if (this.customerId) {
      this.transactionService.getTransactions().subscribe(transactions => {
        this.transactions = transactions.filter((transaction: any) => transaction.customer_id === this.customerId);
        this.prepareGraphData();
        this.createChart();
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
      date,
      amount: data[date]
    }));
  }

  createChart(): void {
    const dates = this.graphData.map(d => d.date);
    const amounts = this.graphData.map(d => d.amount);

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Total Amount',
            data: amounts,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Amount'
            }
          }
        }
      }
    };

    if (this.lineChart && this.lineChart.nativeElement) {
      new Chart(this.lineChart.nativeElement, chartConfig);
    }
  }
}
