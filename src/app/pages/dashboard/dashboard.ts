import { Component, computed, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { TranslationService } from '../../core/i18n/translation.service';

import { ProjectService } from '../../core/services/project.service';
import { ClientService } from '../../core/services/client.service';
import { InvoiceService } from '../../core/services/invoice.service';

import { DashboardStat, RevenuePoint } from '../../models/dashboard.model';

import { Project, ProjectStatus } from '../../models/project.model';

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

  private readonly invoiceService = inject(InvoiceService);

  readonly t = this.translation.t;

  readonly projects = this.projectService.projects;

  readonly clients = this.clientService.clients;

  readonly invoices = this.invoiceService.invoices;

  readonly today = new Date();

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

  readonly recentProjects = computed(() =>
    [...this.projects()].sort((a, b) => b.id - a.id).slice(0, 4),
  );

  readonly upcomingDeadlines = computed(() => {
    const today = this.startOfDay(new Date());

    return [...this.projects()]
      .filter(
        (project) => project.status !== 'completed' && this.parseDate(project.dueDate) >= today,
      )
      .sort((a, b) => this.parseDate(a.dueDate).getTime() - this.parseDate(b.dueDate).getTime())
      .slice(0, 3);
  });

  readonly revenueTotal = computed(() => this.invoiceService.totalRevenue());

  readonly revenue = computed<RevenuePoint[]>(() => {
    const months = this.getLastSixMonths();

    const paidInvoices = this.invoices().filter((invoice) => invoice.status === 'paid');

    return months.map(({ year, month }) => {
      const value = paidInvoices
        .filter((invoice) => {
          const issueDate = this.parseDate(invoice.issueDate);

          return issueDate.getFullYear() === year && issueDate.getMonth() + 1 === month;
        })
        .reduce((total, invoice) => total + invoice.amount, 0);

      return {
        year,
        month,
        value,
      };
    });
  });

  readonly maxRevenue = computed(() => {
    const values = this.revenue().map((item) => item.value);

    const maximum = Math.max(...values, 0);

    return maximum > 0 ? maximum : 1;
  });

  readonly stats = computed<DashboardStat[]>(() => [
    {
      key: 'revenue',
      value: this.formatCurrency(this.revenueTotal()),
    },
    {
      key: 'activeProjects',
      value: this.activeProjectsCount().toString(),
    },
    {
      key: 'clients',
      value: this.clients().length.toString(),
    },
    {
      key: 'completionRate',
      value: `${this.completionRate()}%`,
    },
  ]);

  formatCurrency(value: number): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

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

  formatMonth(year: number, month: number): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      month: 'short',
    }).format(new Date(year, month - 1, 1));
  }

  private getLastSixMonths(): {
    year: number;
    month: number;
  }[] {
    const result: {
      year: number;
      month: number;
    }[] = [];

    const current = new Date();

    for (let index = 5; index >= 0; index--) {
      const date = new Date(current.getFullYear(), current.getMonth() - index, 1);

      result.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      });
    }

    return result;
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private parseDate(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);

    return new Date(year, month - 1, day);
  }
}
