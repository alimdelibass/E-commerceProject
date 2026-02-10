import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base-component/base-component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner)
  }
  ngOnInit(): void {
    this.showSpineer(SpinnerType.BallAtom);
  }
}
