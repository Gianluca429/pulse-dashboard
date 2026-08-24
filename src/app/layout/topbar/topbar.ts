import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { TranslationService } from '../../core/i18n/translation.service';
import { Language } from '../../core/i18n/translations';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  private readonly router = inject(Router);

  readonly translation = inject(TranslationService);
  readonly t = this.translation.t;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly pageTitle = computed(() => {
    const url = this.currentUrl();
    const navigation = this.t().navigation;

    if (url.startsWith('/projects')) {
      return navigation.projects;
    }

    if (url.startsWith('/clients')) {
      return navigation.clients;
    }

    if (url.startsWith('/invoices')) {
      return navigation.invoices;
    }

    if (url.startsWith('/settings')) {
      return navigation.settings;
    }

    return navigation.dashboard;
  });

  setLanguage(language: Language): void {
    this.translation.setLanguage(language);
  }
}
