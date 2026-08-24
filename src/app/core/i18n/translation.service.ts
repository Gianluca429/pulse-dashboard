import { Injectable, computed, signal } from '@angular/core';
import { Language, TRANSLATIONS } from './translations';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly storageKey = 'pulse-language';

  readonly language = signal<Language>(this.getInitialLanguage());

  readonly t = computed(() => {
    return TRANSLATIONS[this.language()];
  });

  setLanguage(language: Language): void {
    this.language.set(language);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, language);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.language() === 'en' ? 'it' : 'en');
  }

  private getInitialLanguage(): Language {
    if (typeof localStorage === 'undefined') {
      return 'en';
    }

    const savedLanguage = localStorage.getItem(this.storageKey);

    return savedLanguage === 'it' ? 'it' : 'en';
  }
}
