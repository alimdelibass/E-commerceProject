import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientService } from '../../../services/common/http-client';
import { CustomToastrService, ToastrMessageType } from '../../../services/ui/custom-toastr-service';

@Component({
  selector: 'app-admin-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class AdminRegister {
  // Form alanları
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  // UI durumları
  isLoading: boolean = false;
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {}

  // Şifre görünürlüğünü değiştir
  togglePassword(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    }
  }

  // Form validasyonu
  isFormValid(): boolean {
    return (
      this.firstName.trim().length > 0 &&
      this.lastName.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.isValidEmail(this.email) &&
      this.password.length >= 6 &&
      this.password === this.passwordConfirm
    );
  }

  // Email formatı kontrolü
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Kayıt işlemi
  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.toastrService.message('Lütfen tüm alanları doğru şekilde doldurun', ToastrMessageType.Error, 'Hata');
      return;
    }

    if (this.password !== this.passwordConfirm) {
      this.toastrService.message('Şifreler eşleşmiyor', ToastrMessageType.Error, 'Hata');
      return;
    }

    this.isLoading = true;

    try {
      const registerData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      };

      this.httpClientService.post({
        controller: 'users',
        action: 'admin'
      }, registerData).subscribe({
        next: () => {
          this.toastrService.message('Admin kaydı başarılı! Giriş yapabilirsiniz.', ToastrMessageType.Success, 'Başarılı');
          this.router.navigate(['/admin/login']);
        },
        error: (error) => {
          this.toastrService.message(
            error.error?.message || 'Kayıt sırasında bir hata oluştu',
            ToastrMessageType.Error,
            'Hata'
          );
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } catch (error) {
      this.isLoading = false;
      this.toastrService.message('Beklenmeyen bir hata oluştu', ToastrMessageType.Error, 'Hata');
    }
  }
}
