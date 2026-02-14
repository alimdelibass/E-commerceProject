import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../../../services/common/http-client';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private httpClientService = inject(HttpClientService);
  products: any[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.httpClientService.get<Products[]>({
      controller: 'api/products'
    }).subscribe(data => console.log(data));
  }

  createProduct(product: any): void {
    this.httpClientService.post({
      controller: 'api/products'
    }, product).subscribe({
      next: (response: any) => {
        console.log('Product created:', response);
        this.getProducts();
      },
      error: (err) => {
        console.error('Error creating product:', err);
      }
    });
  }

  updateProduct(product: any): void {
    this.httpClientService.put({
      controller: 'api/products'
    }, product).subscribe({
      next: (response: any) => {
        console.log('Product updated:', response);
        this.getProducts();
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }

  deleteProduct(id: string): void {
    this.httpClientService.delete({
      controller: 'api/products',
      queryString: id
    }).subscribe({
      next: (response: any) => {
        console.log('Product deleted:', response);
        this.getProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      }
    });
  }
}
