import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../../../services/common/http-client';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private httpClientService = inject(HttpClientService);
  orders: any[] = [];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.httpClientService.get({
      controller: 'api/orders'
    }).subscribe({
      next: (data: any) => {
        this.orders = Array.isArray(data) ? data : data.data || [];
        console.log('Orders:', this.orders);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      }
    });
  }

  deleteOrder(id: string): void {
    if (confirm('Bu siparişi silmek istediğinize emin misiniz?')) {
      this.httpClientService.delete({
        controller: 'api/orders',
        queryString: id
      }).subscribe({
        next: () => {
          console.log('Order deleted');
          this.getOrders();
        },
        error: (err) => {
          console.error('Error deleting order:', err);
        }
      });
    }
  }
}
