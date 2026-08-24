import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../core/i18n/translation.service';
import { PROJECTS } from '../../data/projects.data';
import { Project, ProjectStatus } from '../../models/project.model';

type ProjectFilter = 'all' | ProjectStatus;

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  readonly projects = signal<Project[]>(PROJECTS);

  readonly searchTerm = signal('');
  readonly activeFilter = signal<ProjectFilter>('all');

  readonly filters: ProjectFilter[] = ['all', 'planning', 'in-progress', 'review', 'completed'];

  readonly filteredProjects = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    const filter = this.activeFilter();

    return this.projects().filter((project) => {
      const matchesStatus = filter === 'all' || project.status === filter;

      const matchesSearch =
        !search ||
        project.name.toLowerCase().includes(search) ||
        project.client.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  });

  readonly projectCount = computed(() => this.filteredProjects().length);

  setSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchTerm.set(input.value);
  }

  setFilter(filter: ProjectFilter): void {
    this.activeFilter.set(filter);
  }

  getStatusLabel(status: ProjectStatus): string {
    const translations = this.t().projects;

    const labels: Record<ProjectStatus, string> = {
      planning: translations.planning,
      'in-progress': translations.inProgress,
      review: translations.review,
      completed: translations.completed,
    };

    return labels[status];
  }

  getFilterLabel(filter: ProjectFilter): string {
    if (filter === 'all') {
      return this.t().projects.all;
    }

    return this.getStatusLabel(filter);
  }

  getDescription(key: Project['descriptionKey']): string {
    return this.t().projects.descriptions[key];
  }

  formatDate(date: string): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    const [year, month, day] = date.split('-').map(Number);

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(year, month - 1, day));
  }

  formatCurrency(value: number): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
