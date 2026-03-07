import { Component, OnInit, inject, Input, PLATFORM_ID, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify';
import { ProductService } from '../../../../services/common/models/product';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListComponent implements OnInit, AfterViewInit {
  private alertify = inject(AlertifyService);
  private productService = inject(ProductService);
  private platformId = inject(PLATFORM_ID);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = false;
  deleteLoadingId: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getProducts();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
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
