import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { TransactionService } from 'src/app/transactions.service';

Chart.register(...registerables);

@Component({
  selector: 'app-transactions-data',
  templateUrl: './transactions-data.component.html',
  styleUrls: ['./transactions-data.component.css'],
})
export class TransactionsDataComponent implements OnInit {
  customerId!: number;
  transactions: any[] = [];
  graphData: any[] = [];
  chart: any;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.currentCustomer.subscribe((id) => {
      this.customerId = id;
      console.log(this.customerId, 'from transactions');
      this.loadTransactions();
    });
  }

  loadTransactions(): void {
    if (this.customerId) {
      this.transactionService.getTransactions().subscribe((allTransactions) => {
        this.transactions = allTransactions.filter((transaction: any) => {
          return transaction.customer_id == this.customerId;
        });
        console.log(this.transactions, 'filtered transactions');
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

    this.graphData = Object.keys(data).map((date) => ({
      name: date,
      value: data[date],
    }));

    if (this.chart) {
      this.chart.data.labels = this.graphData.map(d => d.name);
      this.chart.data.datasets[0].data = this.graphData.map(d => d.value);
      this.chart.update();
    }
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.graphData.map(d => d.name),
        datasets: [
          {
            label: 'Transaction Amount',
            data: this.graphData.map(d => d.value),
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
