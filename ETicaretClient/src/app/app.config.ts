import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { routes } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';

export const BASE_URL = new InjectionToken<string>('baseUrl');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    
    { provide: BASE_URL, useValue: 'http://localhost:5292' },

    // ngx-spinner
    importProvidersFrom(
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    ),

    // ngx-translate
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'tr'
      })
    ),
  ],
};
