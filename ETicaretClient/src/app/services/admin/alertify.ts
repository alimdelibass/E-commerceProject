import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({ providedIn: 'root' })
export class AlertifyService {

  message(
    message: string,
    type: MessageType,
    options?: {
      position?: Position;
      delaySeconds?: number;     // kaç sn sonra kapansın
      onDismiss?: () => void;    // kapanınca çalışsın
      dismissOthers?: boolean;   // önceki bildirimleri kapat
    }
  ) {
    const position = options?.position ?? Position.TopRight;
    const delay = options?.delaySeconds ?? 5;

    try {
      alertify.set('notifier', 'position', position);
    } catch {}

    if (options?.dismissOthers) {
      try { alertify.dismissAll(); } catch {}
    }

    // notify'nin imzası farklı: notify(message, type?, wait?, cb?)
    if (type === MessageType.Notify) {
      alertify.notify(message, '', delay, options?.onDismiss);
      return;
    }

    // success/error/warning/message: (message, wait?, cb?)
    alertify[type](message, delay, options?.onDismiss);
  }
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum Position {
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
}
