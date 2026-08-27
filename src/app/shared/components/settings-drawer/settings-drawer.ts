import { Component, EventEmitter, HostListener, OnDestroy, Output, inject } from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';
import { SettingsService } from '../../../core/services/settings.service';
import { Language } from '../../../core/i18n/translations';

@Component({
  selector: 'app-settings-drawer',
  imports: [],
  templateUrl: './settings-drawer.html',
  styleUrl: './settings-drawer.scss',
})
export class SettingsDrawer implements OnDestroy {
  readonly translation = inject(TranslationService);

  private readonly settingsService = inject(SettingsService);

  readonly t = this.translation.t;

  readonly emailNotifications = this.settingsService.emailNotifications;

  readonly projectReminders = this.settingsService.projectReminders;

  readonly invoiceReminders = this.settingsService.invoiceReminders;

  readonly compactInterface = this.settingsService.compactInterface;

  @Output()
  closed = new EventEmitter<void>();

  private readonly previousBodyOverflow = document.body.style.overflow;

  constructor() {
    document.body.style.overflow = 'hidden';
  }

  setLanguage(language: Language): void {
    this.translation.setLanguage(language);
  }

  toggleEmailNotifications(): void {
    this.settingsService.toggleEmailNotifications();
  }

  toggleProjectReminders(): void {
    this.settingsService.toggleProjectReminders();
  }

  toggleInvoiceReminders(): void {
    this.settingsService.toggleInvoiceReminders();
  }

  toggleCompactInterface(): void {
    this.settingsService.toggleCompactInterface();
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = this.previousBodyOverflow;
  }
}
