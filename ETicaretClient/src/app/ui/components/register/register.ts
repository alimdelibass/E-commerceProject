import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientService } from '../../../services/common/http-client';
import { CustomToastrService, ToastrMessageType } from '../../../services/ui/custom-toastr-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  frm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad: [''],
      kullaniciAdi: [''],
      email: [''],
      sifre: [''],
      sifreTekrar: ['']
    });
  }

  onSubmit(data: any) {
    debugger;
  }
}
