import { Component, signal, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

import { SettingsService } from '../../core/services/settings.service';
import { SettingsDrawer } from '../../shared/components/settings-drawer/settings-drawer';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, Sidebar, Topbar, SettingsDrawer],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {
  private readonly settingsService = inject(SettingsService);

  readonly isSettingsOpen = signal(false);

  openSettings(): void {
    this.isSettingsOpen.set(true);
  }

  closeSettings(): void {
    this.isSettingsOpen.set(false);
  }
}
