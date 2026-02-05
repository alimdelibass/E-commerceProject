import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root',
})
export class Alertify {
  massage(message: string, type: messageType) {
    if (type === messageType.Error) alertify.error(message);
    if (type === messageType.Warning) alertify.warning(message);
    if (type === messageType.Notify) alertify.notify(message);
    if (type === messageType.Message) alertify.message(message);
    if (type === messageType.Success) alertify.success(message);
  }

}

export enum messageType {
  Success = "Success",
  Error = "Error",
  Warning = "Warning",
  Notify = "Notify",
  Message = "Message",
}