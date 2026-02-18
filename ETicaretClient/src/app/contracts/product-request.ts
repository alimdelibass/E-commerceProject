export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
