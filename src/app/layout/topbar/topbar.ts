import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  computed,
  inject,
  signal,
} from '@angular/core';

import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { filter, map, startWith } from 'rxjs/operators';

import { toSignal } from '@angular/core/rxjs-interop';

import { TranslationService } from '../../core/i18n/translation.service';
import { Language } from '../../core/i18n/translations';

import { ProjectService } from '../../core/services/project.service';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar implements OnDestroy {
  private readonly router = inject(Router);

  private readonly projectService = inject(ProjectService);

  private readonly invoiceService = inject(InvoiceService);

  readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Output()
  settingsRequested = new EventEmitter<void>();

  readonly isMobileMenuOpen = signal(false);

  readonly isNotificationsOpen = signal(false);

  private previousBodyOverflow = '';

  private readonly notificationsStorageKey = 'pulse-read-notifications';

  readonly readNotificationIds = signal<string[]>(this.loadReadNotifications());

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),

      map((event) => event.urlAfterRedirects),

      startWith(this.router.url),
    ),
    {
      initialValue: this.router.url,
    },
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

    return navigation.dashboard;
  });

  readonly notifications = computed(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const inSevenDays = new Date(today);

    inSevenDays.setDate(inSevenDays.getDate() + 7);

    const notifications: {
      id: string;
      type: 'danger' | 'warning' | 'info';
      title: string;
      description: string;
      route: '/invoices' | '/projects';
    }[] = [];

    for (const invoice of this.invoiceService.invoices()) {
      const dueDate = this.parseNotificationDate(invoice.dueDate);

      if (invoice.status === 'overdue') {
        notifications.push({
          id: `invoice-overdue-${invoice.id}`,

          type: 'danger',

          title: invoice.number,

          description: `${invoice.client} · ${this.formatNotificationCurrency(invoice.amount)}`,

          route: '/invoices',
        });

        continue;
      }

      if (invoice.status === 'sent' && dueDate >= today && dueDate <= inSevenDays) {
        notifications.push({
          id: `invoice-due-${invoice.id}`,

          type: 'warning',

          title: invoice.number,

          description: `${invoice.client} · ${this.formatNotificationDate(invoice.dueDate)}`,

          route: '/invoices',
        });
      }
    }

    for (const project of this.projectService.projects()) {
      if (project.status === 'completed') {
        continue;
      }

      const dueDate = this.parseNotificationDate(project.dueDate);

      if (dueDate >= today && dueDate <= inSevenDays) {
        notifications.push({
          id: `project-due-${project.id}`,

          type: 'info',

          title: project.name,

          description: `${project.client} · ${this.formatNotificationDate(project.dueDate)}`,

          route: '/projects',
        });
      }
    }

    return notifications.slice(0, 6);
  });

  readonly unreadNotificationCount = computed(
    () =>
      this.notifications().filter(
        (notification) => !this.readNotificationIds().includes(notification.id),
      ).length,
  );

  readonly notificationCount = this.unreadNotificationCount;

  setLanguage(language: Language): void {
    this.translation.setLanguage(language);
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
      return;
    }

    this.openMobileMenu();
  }

  openMobileMenu(): void {
    this.closeNotifications();

    this.previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    this.isMobileMenuOpen.set(true);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);

    document.body.style.overflow = this.previousBodyOverflow;
  }

  openSettings(): void {
    this.closeMobileMenu();

    this.settingsRequested.emit();
  }

  toggleNotifications(): void {
    this.isNotificationsOpen.update((value) => !value);
  }

  closeNotifications(): void {
    this.isNotificationsOpen.set(false);
  }

  isNotificationRead(id: string): boolean {
    return this.readNotificationIds().includes(id);
  }

  markNotificationAsRead(id: string): void {
    if (this.isNotificationRead(id)) {
      return;
    }

    const updatedIds = [...this.readNotificationIds(), id];

    this.readNotificationIds.set(updatedIds);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.notificationsStorageKey, JSON.stringify(updatedIds));
    }
  }

  openNotification(id: string): void {
    this.markNotificationAsRead(id);
    this.closeNotifications();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isNotificationsOpen()) {
      this.closeNotifications();
      return;
    }

    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  ngOnDestroy(): void {
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = this.previousBodyOverflow;
    }
  }

  private loadReadNotifications(): string[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const stored = localStorage.getItem(this.notificationsStorageKey);

    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private formatNotificationCurrency(value: number): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  private formatNotificationDate(value: string): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
    }).format(this.parseNotificationDate(value));
  }

  private parseNotificationDate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);

    return new Date(year, month - 1, day);
  }
}
