import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIHeaderComponent } from '../components/header/ui-header.component';
import { UIFooterComponent } from '../components/footer/ui-footer.component';

@Component({
  selector: 'app-ui-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    UIHeaderComponent,
    UIFooterComponent
  ],
  templateUrl: './ui-layout.component.html',
  styleUrl: './ui-layout.scss'
})
export class UILayoutComponent { }

