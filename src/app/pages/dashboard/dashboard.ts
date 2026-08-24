import { Component, inject } from '@angular/core';

import { TranslationService } from '../../core/i18n/translation.service';

import { DeadlineType, ProjectStatus } from '../../models/dashboard.model';

import {
  DASHBOARD_STATS,
  RECENT_PROJECTS,
  REVENUE_DATA,
  UPCOMING_DEADLINES,
} from '../../data/dashboard.data';

import { StatCard } from '../../shared/components/stat-card/stat-card';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  readonly stats = DASHBOARD_STATS;
  readonly revenue = REVENUE_DATA;
  readonly projects = RECENT_PROJECTS;
  readonly deadlines = UPCOMING_DEADLINES;

  readonly today = new Date();

  readonly maxRevenue = Math.max(...this.revenue.map((item) => item.value));

  getProjectStatusLabel(status: ProjectStatus): string {
    const translations = this.t().dashboard;

    const labels: Record<ProjectStatus, string> = {
      'in-progress': translations.inProgress,
      review: translations.review,
      completed: translations.completed,
    };

    return labels[status];
  }

  getDeadlineTypeLabel(type: DeadlineType): string {
    const translations = this.t().dashboard;

    const labels: Record<DeadlineType, string> = {
      meeting: translations.meeting,
      delivery: translations.delivery,
      review: translations.review,
    };

    return labels[type];
  }

  getDeadlineTitle(key: 'clientReview' | 'homepageDelivery' | 'kickoffMeeting'): string {
    return this.t().dashboard[key];
  }

  formatLongDate(date: Date): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date);
  }

  formatShortDate(date: string): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
    }).format(this.parseDate(date));
  }

  formatMonth(month: number): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      month: 'short',
    }).format(new Date(2026, month - 1, 1));
  }

  private parseDate(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);

    return new Date(year, month - 1, day);
  }
}
