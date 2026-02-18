import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify';
import { ProductService } from '../../../../services/common/models/product';
import { CreateProductRequest } from '../../../../contracts/product-request';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class CreateComponent implements OnInit {
  @Output() productCreated = new EventEmitter<void>();
  
  private fb = inject(FormBuilder);
  private alertify = inject(AlertifyService);
  private productService = inject(ProductService);
  
  form!: FormGroup;
  isLoading = false;
  submitted = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    const request: CreateProductRequest = this.form.value;

    this.productService.createProduct(request).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.alertify.message('Ürün başarıyla oluşturuldu!', MessageType.Success, {
          position: Position.TopRight,
          delaySeconds: 3
        });
        this.form.reset();
        this.submitted = false;
        this.productCreated.emit();
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err?.error?.message || 'Ürün oluşturulurken hata oluştu!';
        this.alertify.message(errorMsg, MessageType.Error, {
          position: Position.TopRight,
          delaySeconds: 5
        });
        console.error('Error creating product:', err);
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}
