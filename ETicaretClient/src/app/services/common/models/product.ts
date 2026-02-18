import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '../http-client';
import { CreateProductRequest, UpdateProductRequest, ProductResponse } from '../../../contracts/product-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClientService = inject(HttpClientService);
  private controller = 'api/products';

  constructor() { }

  // Tüm ürünleri getir
  getProducts(): Observable<ProductResponse[]> {
    return this.httpClientService.get<ProductResponse[]>({
      controller: this.controller
    });
  }

  // Tek bir ürünü getir
  getProductById(id: string): Observable<ProductResponse> {
    return this.httpClientService.get<ProductResponse>({
      controller: this.controller,
      queryString: id
    });
  }

  // Ürün oluştur
  createProduct(request: CreateProductRequest): Observable<ProductResponse> {
    return this.httpClientService.post<ProductResponse>({
      controller: this.controller
    }, request);
  }

  // Ürünü güncelle
  updateProduct(id: string, request: UpdateProductRequest): Observable<ProductResponse> {
    return this.httpClientService.put<ProductResponse>({
      controller: this.controller,
      queryString: id
    }, request);
  }

  // Ürünü sil
  deleteProduct(id: string): Observable<any> {
    return this.httpClientService.delete({
      controller: this.controller,
      queryString: id
    });
  }
}
