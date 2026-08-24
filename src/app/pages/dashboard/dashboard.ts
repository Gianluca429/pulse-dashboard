import { Component, computed, inject } from '@angular/core';

import { TranslationService } from '../../core/i18n/translation.service';
import { ProjectService } from '../../core/services/project.service';
import { ClientService } from '../../core/services/client.service';

import { DashboardStat, DeadlineType } from '../../models/dashboard.model';

import { ProjectStatus } from '../../models/project.model';

import { RouterLink } from '@angular/router';

import { DASHBOARD_STATS, REVENUE_DATA, UPCOMING_DEADLINES } from '../../data/dashboard.data';

import { StatCard } from '../../shared/components/stat-card/stat-card';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly translation = inject(TranslationService);

  private readonly projectService = inject(ProjectService);

  private readonly clientService = inject(ClientService);

  readonly revenueTotal = 48580;

  formatCurrency(value: number): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  readonly t = this.translation.t;

  readonly projects = this.projectService.projects;

  readonly clients = this.clientService.clients;

  readonly revenue = REVENUE_DATA;

  readonly deadlines = UPCOMING_DEADLINES;

  readonly today = new Date();

  readonly maxRevenue = Math.max(...this.revenue.map((item) => item.value));

  readonly activeProjectsCount = computed(
    () => this.projects().filter((project) => project.status !== 'completed').length,
  );

  readonly completionRate = computed(() => {
    const projects = this.projects();

    if (projects.length === 0) {
      return 0;
    }

    const completed = projects.filter((project) => project.status === 'completed').length;

    return Math.round((completed / projects.length) * 100);
  });

  readonly recentProjects = computed(() => this.projects().slice(0, 4));

  readonly stats = computed<DashboardStat[]>(() => [
    {
      ...DASHBOARD_STATS[0],
    },

    {
      ...DASHBOARD_STATS[1],
      value: this.activeProjectsCount().toString(),
    },

    {
      ...DASHBOARD_STATS[2],
      value: this.clients().length.toString(),
    },

    {
      ...DASHBOARD_STATS[3],
      value: `${this.completionRate()}%`,
    },
  ]);

  getProjectStatusLabel(status: ProjectStatus): string {
    const translations = this.t().projects;

    const labels: Record<ProjectStatus, string> = {
      planning: translations.planning,

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
