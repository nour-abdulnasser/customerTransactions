import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'src/app/customers.service';
import { TransactionService } from 'src/app/transactions.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customers-data.component.html',
  styleUrls: ['./customers-data.component.css'],
})
export class CustomersDataComponent implements OnInit {
  customers: any[] = [];
  transactions: any[] = [];
  filteredCustomers: any[] = [];

  customerSelected!: number;
  constructor(
    private customerService: CustomerService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.filteredCustomers = customers;
    });

    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  filterTable(filterText: string): void {
    this.filteredCustomers = this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  getTransactionsForCustomer(customerId: number): any[] {
    return this.transactions.filter(
      (transaction) => transaction.customer_id == customerId
    );
  }

  onCustomerSelect(customerId: number): void {
    // console.log(' event from custo data component', customerId);

    this.transactionService.setSelectedCustomer(customerId);
    // console.log(
    //   this.transactionService.currentCustomer.subscribe((par) =>
    //     console.log(par, 'from par')
    //   ),
    //   'current custo'
    // );
  }
}
