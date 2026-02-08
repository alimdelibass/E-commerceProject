import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class CustomToastrService {
  constructor(
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  message(
    message: string,
    type: ToastrMessageType = ToastrMessageType.Info,
    title?: string,
    position: ToastrPosition = ToastrPosition.TopRight,
    options?: Partial<IndividualConfig>
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const opt: Partial<IndividualConfig> = {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      positionClass: position, // <-- pozisyon burada
      ...options,
    };

    switch (type) {
      case ToastrMessageType.Success:
        this.toastr.success(message, title, opt);
        return;
      case ToastrMessageType.Warning:
        this.toastr.warning(message, title, opt);
        return;
      case ToastrMessageType.Error:
        this.toastr.error(message, title, opt);
        return;
      default:
        this.toastr.info(message, title, opt);
        return;
    }
  }

  clear(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.toastr.clear();
  }
}

export enum ToastrMessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

// ngx-toastr positionClass değerleri
export enum ToastrPosition {
  TopRight = 'toast-top-right',
  TopLeft = 'toast-top-left',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
}
