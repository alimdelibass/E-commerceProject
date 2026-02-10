import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
constructor(private spinner : NgxSpinnerService) {}
showSpineer(spinnerNameType : SpinnerType){
  this.spinner.show(spinnerNameType)
  setTimeout(() => this.hideSpinner(spinnerNameType), 3000);
}
hideSpinner(spinnerNameType : SpinnerType){
  this.spinner.hide(spinnerNameType)
}
}
export enum SpinnerType {
  BallAtom = "ls1",
  BallScaleMultiple = "s2",
  BallSpinClockwiseFadeRotating = "s3"
}