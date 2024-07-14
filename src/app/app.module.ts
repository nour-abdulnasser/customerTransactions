import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersDataComponent } from './customers/customers-data/customers-data.component';
import { TransactionsDataComponent } from './transactions/transactions-data/transactions-data.component';
import { ChartModule, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomersDataComponent,
    TransactionsDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule,
    
  ],
  providers: [LineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }


