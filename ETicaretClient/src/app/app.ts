import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr-service';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private toast = inject(CustomToastrService);

  ngOnInit(): void {
    //this.toast.message('Toastr çalışıyor', ToastrMessageType.Success, 'Test', ToastrPosition.TopRight, {timeOut: 2000 });
  }
}
