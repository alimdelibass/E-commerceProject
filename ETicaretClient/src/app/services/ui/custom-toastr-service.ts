import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const toastr: any;

@Injectable({ providedIn: 'root' })
export class CustomToastrService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  message(
    message: string,
    type: ToastrMessageType = ToastrMessageType.Info,
    title?: string,
    position: ToastrPosition = ToastrPosition.TopRight,
    options?: Partial<ToastrOptions>
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // toastr script yüklenmediyse uygulamayı çökertmesin
    if (typeof toastr === 'undefined') return;

    toastr.options = {
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
      timeOut: 3000,
      positionClass: position,
      ...options,
    };

    toastr[type](message, title);
  }

  clear(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof toastr === 'undefined') return;
    toastr.clear();
  }
}

export enum ToastrMessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

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

export type ToastrOptions = {
  closeButton: boolean;
  progressBar: boolean;
  preventDuplicates: boolean;
  timeOut: number;
  positionClass: string;
};
