import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private defaultLanguage = 'tr';
  private supportedLanguages = ['tr', 'en'];

  constructor(private translateService: TranslateService) {
    this.initializeTranslation();
  }

  private initializeTranslation(): void {
    const browserLanguage = this.getBrowserLanguage();
    const savedLanguage = localStorage.getItem('selectedLanguage') || browserLanguage;
    const language = this.supportedLanguages.includes(savedLanguage)
      ? savedLanguage
      : this.defaultLanguage;

    this.setLanguage(language);
  }

  setLanguage(language: string): void {
    if (this.supportedLanguages.includes(language)) {
      this.translateService.setDefaultLang(language);
      this.translateService.use(language);
      localStorage.setItem('selectedLanguage', language);
      document.documentElement.lang = language;
    }
  }

  getLanguage(): string {
    return this.translateService.currentLang || this.defaultLanguage;
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  private getBrowserLanguage(): string {
    const browserLang = this.translateService.getBrowserLang();
    return this.supportedLanguages.includes(browserLang || '')
      ? browserLang || this.defaultLanguage
      : this.defaultLanguage;
  }

  translate(key: string, params?: any): Promise<any> {
    return this.translateService.get(key, params).toPromise();
  }

  instant(key: string, params?: any): string {
    return this.translateService.instant(key, params);
  }
}
