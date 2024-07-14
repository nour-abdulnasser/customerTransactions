import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersDataComponent } from './customers/customers-data/customers-data.component';
import { TransactionsDataComponent } from './transactions/transactions-data/transactions-data.component';

const routes: Routes = [
  { path: 'customers', component: CustomersDataComponent },
  { path: 'transactions', component: TransactionsDataComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' } // Redirect to customers by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
