# Localization (i18n) Setup Guide - Turkish Character Support

## Overview

Your e-commerce project now has a complete localization system using **ngx-translate**. This allows you to support multiple languages (Turkish and English) throughout your application with proper Turkish character support.

## Installation

All necessary packages have been installed:

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

## Project Structure

### Translation Files
Translation files are located in `src/assets/i18n/`:

```
src/assets/i18n/
├── tr.json    (Turkish translations)
└── en.json    (English translations)
```

### Core Files

1. **Translation Service** - `src/app/services/common/translation.service.ts`
   - Manages language selection and translations
   - Handles persisting language choice to localStorage
   - Auto-detects browser language

2. **Translation Pipe** - `src/app/pipes/translate.pipe.ts`
   - Used in templates with syntax: `{{ 'key' | i18n }}`
   - Converts translation keys to actual text

3. **Language Switcher Component** - `src/app/ui/components/language-switcher/language-switcher.component.ts`
   - Dropdown component for switching languages
   - Already integrated in the header

4. **App Config** - `src/app/app.config.ts`
   - Configured TranslateModule with HTTP loader
   - Sets default language to Turkish

## Usage

### 1. In Templates (Recommended)

Use the `i18n` pipe to translate text:

```html
<!-- Simple translation -->
<h1>{{ 'common.appTitle' | i18n }}</h1>

<!-- Navigation links -->
<a routerLink="/">{{ 'common.home' | i18n }}</a>

<!-- Button labels -->
<button>{{ 'common.login' | i18n }}</button>

<!-- Form placeholders -->
<input [placeholder]="'common.search' | i18n" />
```

### 2. In Components (TypeScript)

```typescript
import { TranslationService } from '../services/common/translation.service';

export class MyComponent implements OnInit {
  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    // Get instant translation (synchronously)
    const title = this.translationService.instant('common.appTitle');

    // Get async translation (as Promise)
    this.translationService.translate('common.appTitle').then((text) => {
      console.log(text);
    });

    // Set language
    this.translationService.setLanguage('en');

    // Get current language
    const currentLang = this.translationService.getLanguage();
  }
}
```

## Translation Structure

The translation JSON files are organized by category:

```json
{
  "common": {
    "appTitle": "E-Ticaret",
    "home": "Anasayfa",
    "products": "Ürünler",
    "cart": "Sepet",
    ...
  },
  "admin": {
    "dashboard": "Yönetim Paneli",
    "customers": "Müşteriler",
    ...
  },
  "product": {
    "name": "Ürün Adı",
    "price": "Fiyat",
    ...
  },
  "validation": {
    "required": "Bu alan gerekli",
    ...
  }
}
```

## Adding New Translations

### Step 1: Add to Turkish File (src/assets/i18n/tr.json)

```json
{
  "myfeature": {
    "title": "Benim Özelliğim",
    "description": "Bu benim açıklamamdır"
  }
}
```

### Step 2: Add to English File (src/assets/i18n/en.json)

```json
{
  "myfeature": {
    "title": "My Feature",
    "description": "This is my description"
  }
}
```

### Step 3: Use in Component

**In templates:**
```html
<h2>{{ 'myfeature.title' | i18n }}</h2>
<p>{{ 'myfeature.description' | i18n }}</p>
```

**In TypeScript:**
```typescript
const title = this.translationService.instant('myfeature.title');
```

## Turkish Character Support

The system fully supports Turkish characters:
- ç, ğ, ı, ö, ş, ü (lowercase)
- Ç, Ğ, İ, Ö, Ş, Ü (uppercase)

These are all correctly handled in the translation files since they're stored as standard JSON with UTF-8 encoding.

## Language Switching

The language switcher component is already integrated in the header. Users can:

1. Click the language dropdown in the top navigation
2. Select "Türkçe" for Turkish or "English" for English
3. The selection is saved in localStorage
4. Page content updates automatically

## Features

- **Persistent Storage**: Selected language is saved to localStorage
- **Auto-Detection**: Automatically selects language based on browser settings
- **Default Language**: Turkish (tr) is the default language
- **HTTP Loader**: Translations are loaded from JSON files via HTTP
- **Easy to Extend**: Add new languages by creating new JSON files

### Supported Languages

- **tr** - Turkish (Türkçe)
- **en** - English

To add more languages:
1. Create a new JSON file: `src/assets/i18n/[lang-code].json`
2. Update the `supportedLanguages` array in `translation.service.ts`
3. Add option to language switcher component

## Example: Implementing in a Component

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../pipes/translate.pipe';
import { TranslationService } from '../services/common/translation.service';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div>
      <h1>{{ 'common.appTitle' | i18n }}</h1>
      <p>{{ 'common.welcome' | i18n }}</p>
      
      <button (click)="switchLanguage()">
        {{ 'common.switchLanguage' | i18n }}
      </button>
    </div>
  `
})
export class ExampleComponent {
  constructor(private translationService: TranslationService) {}

  switchLanguage() {
    const currentLang = this.translationService.getLanguage();
    const newLang = currentLang === 'tr' ? 'en' : 'tr';
    this.translationService.setLanguage(newLang);
  }
}
```

## Best Practices

1. **Use Namespacing**: Organize keys by feature (common.*, admin.*, product.*, etc.)
2. **Keep Keys Descriptive**: Use full English keys even for Turkish translations
3. **Avoid Hardcoding**: Always use translation keys instead of hardcoded strings
4. **Consistency**: Keep naming conventions consistent across translation files
5. **Reuse Keys**: Use the same key for repeated concepts across the app

## File Structure Reference

```
src/
├── app/
│   ├── pipes/
│   │   └── translate.pipe.ts          ← Pipe for templates
│   ├── services/
│   │   └── common/
│   │       └── translation.service.ts ← Main service
│   ├── ui/
│   │   └── components/
│   │       └── language-switcher/
│   │           └── language-switcher.component.ts ← Language selector
│   └── app.config.ts                  ← Configuration
└── assets/
    └── i18n/
        ├── tr.json                    ← Turkish translations
        └── en.json                    ← English translations
```

## Troubleshooting

### Translations Not Loading
- Ensure JSON files are in the correct location: `src/assets/i18n/`
- Check browser console for HTTP errors
- Verify file names are lowercase: `tr.json`, `en.json`

### Turkish Characters Not Displaying
- Ensure JSON files are saved with UTF-8 encoding
- Check that the HTML file has `<meta charset="utf-8">` in the head

### Language Not Persisting
- Clear browser localStorage
- Check that localStorage is enabled in browser settings
- Verify that the language code matches the JSON filename

## Additional Resources

- [ngx-translate Documentation](https://github.com/ngx-translate/core)
- [ngx-translate/http-loader](https://github.com/ngx-translate/http-loader)
- [Angular Localization Guide](https://angular.io/guide/i18n)

---

**Happy localizing! Your app now supports Turkish and English with full character support.**
