import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ui-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ui-footer.component.html',
  styleUrl: './ui-footer.scss'
})
export class UIFooterComponent {
  currentYear = new Date().getFullYear();
}
