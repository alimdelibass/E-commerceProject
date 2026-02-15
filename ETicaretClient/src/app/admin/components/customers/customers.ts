import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../../../services/common/http-client';
import { BaseComponent, SpinnerType } from '../../../base-component/base-component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers extends BaseComponent implements OnInit {
  private httpClientService = inject(HttpClientService);
  customers: any[] = [];

  constructor(spinner: NgxSpinnerService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpineer(SpinnerType.BallAtom);
    this.getCustomers();
  }

  getCustomers(): void {
    this.httpClientService.get({
      controller: 'api/customers'
    }).subscribe({
      next: (data: any) => {
        this.customers = Array.isArray(data) ? data : data.data || [];
        console.log('Customers:', this.customers);
        this.hideSpinner(SpinnerType.BallAtom);
      },
      error: (err) => {
        console.error('Error loading customers:', err);
        this.hideSpinner(SpinnerType.BallAtom);
      }
    });
  }

  deleteCustomer(id: string): void {
    if (confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) {
      this.httpClientService.delete({
        controller: 'api/customers',
        queryString: id
      }).subscribe({
        next: () => {
          console.log('Customer deleted');
          this.getCustomers();
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
        }
      });
    }
  }
}
