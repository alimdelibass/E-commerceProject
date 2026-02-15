import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../../../services/common/http-client';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
})
export class Payments implements OnInit {
  private httpClientService = inject(HttpClientService);
  payments: any[] = [];

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.httpClientService.get({
      controller: 'api/payments'
    }).subscribe({
      next: (data: any) => {
        this.payments = Array.isArray(data) ? data : data.data || [];
        console.log('Payments:', this.payments);
      },
      error: (err) => {
        console.error('Error loading payments:', err);
      }
    });
  }

  deletePayment(id: string): void {
    if (confirm('Bu ödemeyi silmek istediğinize emin misiniz?')) {
      this.httpClientService.delete({
        controller: 'api/payments',
        queryString: id
      }).subscribe({
        next: () => {
          console.log('Payment deleted');
          this.getPayments();
        },
        error: (err) => {
          console.error('Error deleting payment:', err);
        }
      });
    }
  }
}
