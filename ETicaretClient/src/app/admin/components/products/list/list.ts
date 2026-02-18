import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify';
import { ProductService } from '../../../../services/common/models/product';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListComponent implements OnInit {
  private alertify = inject(AlertifyService);
  private productService = inject(ProductService);
  
  products: any[] = [];
  isLoading = false;
  deleteLoadingId: string | null = null;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Ürünler yüklenirken hata oluştu!';
        this.alertify.message(errorMsg, MessageType.Error, {
          position: Position.TopRight,
          delaySeconds: 5
        });
        this.isLoading = false;
        console.error('Error fetching products:', err);
      }
    });
  }

  deleteProduct(id: string): void {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      return;
    }

    this.deleteLoadingId = id;
    this.productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        this.alertify.message('Ürün başarıyla silindi!', MessageType.Success, {
          position: Position.TopRight,
          delaySeconds: 3
        });
        this.deleteLoadingId = null;
        this.getProducts();
      },
      error: (err) => {
        const errorMsg = err?.error?.message || 'Ürün silinirken hata oluştu!';
        this.alertify.message(errorMsg, MessageType.Error, {
          position: Position.TopRight,
          delaySeconds: 5
        });
        this.deleteLoadingId = null;
        console.error('Error deleting product:', err);
      }
    });
  }
}
