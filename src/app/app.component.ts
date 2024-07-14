import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedCustomerId: number = 0;
  title = 'customerTransacs';

  onCustomerSelect(customerId: number): void {
    this.selectedCustomerId = customerId;
  }
}
