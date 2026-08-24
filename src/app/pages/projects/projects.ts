import { Component, computed, inject, signal } from '@angular/core';

import { TranslationService } from '../../core/i18n/translation.service';
import { PROJECTS } from '../../data/projects.data';

import {
  CreateProjectInput,
  Project,
  ProjectDescriptionKey,
  ProjectStatus,
} from '../../models/project.model';

import { ProjectFormModal } from '../../shared/components/project-form-modal/project-form-modal';

type ProjectFilter = 'all' | ProjectStatus;

@Component({
  selector: 'app-projects',
  imports: [ProjectFormModal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  readonly projects = signal<Project[]>(PROJECTS);

  readonly searchTerm = signal('');
  readonly activeFilter = signal<ProjectFilter>('all');

  readonly isCreateModalOpen = signal(false);

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

  openCreateModal(): void {
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  createProject(input: CreateProjectInput): void {
    const nextId = Math.max(0, ...this.projects().map((project) => project.id)) + 1;

    const newProject: Project = {
      id: nextId,
      name: input.name,
      client: input.client,
      description: input.description,
      status: input.status,
      progress:
        input.status === 'completed'
          ? 100
          : input.status === 'review'
            ? 80
            : input.status === 'in-progress'
              ? 35
              : 0,
      dueDate: input.dueDate,
      budget: input.budget,
    };

    this.projects.update((projects) => [newProject, ...projects]);

    this.activeFilter.set('all');
    this.searchTerm.set('');

    this.closeCreateModal();
  }

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

  getDescription(project: Project): string {
    if (project.description) {
      return project.description;
    }

    if (project.descriptionKey) {
      return this.getTranslatedDescription(project.descriptionKey);
    }

    return '';
  }

  private getTranslatedDescription(key: ProjectDescriptionKey): string {
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
