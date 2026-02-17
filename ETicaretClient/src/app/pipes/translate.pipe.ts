import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/common/translation.service';

@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string, params?: any): string {
    return this.translationService.instant(key, params);
  }
}
