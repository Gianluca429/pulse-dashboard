import { Injectable, effect, signal } from '@angular/core';

type SettingsPreferences = {
  emailNotifications: boolean;
  projectReminders: boolean;
  invoiceReminders: boolean;
  compactInterface: boolean;
};

const DEFAULT_SETTINGS: SettingsPreferences = {
  emailNotifications: true,
  projectReminders: true,
  invoiceReminders: false,
  compactInterface: false,
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly storageKey = 'pulse-settings';

  readonly emailNotifications = signal(DEFAULT_SETTINGS.emailNotifications);

  readonly projectReminders = signal(DEFAULT_SETTINGS.projectReminders);

  readonly invoiceReminders = signal(DEFAULT_SETTINGS.invoiceReminders);

  readonly compactInterface = signal(DEFAULT_SETTINGS.compactInterface);

  constructor() {
    this.loadPreferences();

    effect(() => {
      const preferences: SettingsPreferences = {
        emailNotifications: this.emailNotifications(),

        projectReminders: this.projectReminders(),

        invoiceReminders: this.invoiceReminders(),

        compactInterface: this.compactInterface(),
      };

      this.savePreferences(preferences);

      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('is-compact', preferences.compactInterface);
      }
    });
  }

  toggleEmailNotifications(): void {
    this.emailNotifications.update((value) => !value);
  }

  toggleProjectReminders(): void {
    this.projectReminders.update((value) => !value);
  }

  toggleInvoiceReminders(): void {
    this.invoiceReminders.update((value) => !value);
  }

  toggleCompactInterface(): void {
    this.compactInterface.update((value) => !value);
  }

  private loadPreferences(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const storedPreferences = localStorage.getItem(this.storageKey);

    if (!storedPreferences) {
      return;
    }

    try {
      const preferences = JSON.parse(storedPreferences) as Partial<SettingsPreferences>;

      if (typeof preferences.emailNotifications === 'boolean') {
        this.emailNotifications.set(preferences.emailNotifications);
      }

      if (typeof preferences.projectReminders === 'boolean') {
        this.projectReminders.set(preferences.projectReminders);
      }

      if (typeof preferences.invoiceReminders === 'boolean') {
        this.invoiceReminders.set(preferences.invoiceReminders);
      }

      if (typeof preferences.compactInterface === 'boolean') {
        this.compactInterface.set(preferences.compactInterface);
      }
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }

  private savePreferences(preferences: SettingsPreferences): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(preferences));
  }
}
