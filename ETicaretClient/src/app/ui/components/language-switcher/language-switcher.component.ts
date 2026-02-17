import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/common/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      <select 
        class="form-select form-select-sm"
        [value]="currentLanguage"
        (change)="changeLanguage($event)"
        aria-label="Language selector">
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: inline-block;
    }

    .form-select {
      padding: 0.375rem 2rem 0.375rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .form-select:hover {
      border-color: #999;
    }

    .form-select:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage: string = 'tr';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getLanguage();
  }

  changeLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
  }
}
