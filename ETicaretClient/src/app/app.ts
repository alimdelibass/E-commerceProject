import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr-service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  private toast = inject(CustomToastrService);
  private spinner = inject(NgxSpinnerService);

  showSpinner(duration = 2000): void {
    (this.spinner as any).show(undefined, {
      bdColor: 'rgba(0,0,0,0.8)',
      size: 'medium',
      color: '#fff',
      type: 'square-jelly-box',
      fullScreen: true,
      template: '<div style="text-align:center;color:#fff"><div></div><p>Loading...</p></div>'
    });

    setTimeout(() => {
      (this.spinner as any).hide();
    }, duration);
  }

  hideSpinner(): void {
    (this.spinner as any).hide();
  }

  ngOnInit(): void {
    //this.toast.message('Toastr çalışıyor', ToastrMessageType.Success, 'Test', ToastrPosition.TopRight, {timeOut: 2000 });
  }
}
