import { Component, EventEmitter, Output, inject } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { TranslationService } from '../../core/i18n/translation.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly t = inject(TranslationService).t;

  @Output()
  settingsRequested = new EventEmitter<void>();

  openSettings(): void {
    this.settingsRequested.emit();
  }
}
