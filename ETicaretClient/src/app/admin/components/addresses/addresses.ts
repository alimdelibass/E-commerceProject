import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientService } from '../../../services/common/http-client';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addresses.html',
  styleUrl: './addresses.scss',
})
export class Addresses implements OnInit {
  private httpClientService = inject(HttpClientService);
  addresses: any[] = [];
  showForm = false;
  newAddress: any = {
    customerId: '',
    title: '',
    city: '',
    district: '',
    fullAddress: '',
    isDefault: false
  };

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(): void {
    this.httpClientService.get({
      controller: 'api/addresses'
    }).subscribe({
      next: (data: any) => {
        this.addresses = Array.isArray(data) ? data : data.data || [];
        console.log('Addresses:', this.addresses);
      },
      error: (err) => {
        console.error('Error loading addresses:', err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  createAddress(): void {
    if (!this.newAddress.customerId || !this.newAddress.title || !this.newAddress.fullAddress) {
      alert('Lütfen tüm zorunlu alanları doldurunuz');
      return;
    }

    this.httpClientService.post({
      controller: 'api/addresses'
    }, this.newAddress).subscribe({
      next: () => {
        console.log('Address created');
        this.getAddresses();
        this.resetForm();
        this.showForm = false;
      },
      error: (err) => {
        console.error('Error creating address:', err);
      }
    });
  }

  deleteAddress(id: string): void {
    if (confirm('Bu adresi silmek istediğinize emin misiniz?')) {
      this.httpClientService.delete({
        controller: 'api/addresses',
        queryString: id
      }).subscribe({
        next: () => {
          console.log('Address deleted');
          this.getAddresses();
        },
        error: (err) => {
          console.error('Error deleting address:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.newAddress = {
      customerId: '',
      title: '',
      city: '',
      district: '',
      fullAddress: '',
      isDefault: false
    };
  }
}
