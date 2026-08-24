import { Component, computed, inject, signal } from '@angular/core';

import { TranslationService } from '../../core/i18n/translation.service';
import { ProjectService } from '../../core/services/project.service';

import {
  CreateProjectInput,
  Project,
  ProjectDescriptionKey,
  ProjectStatus,
} from '../../models/project.model';

import { ProjectFormModal } from '../../shared/components/project-form-modal/project-form-modal';
import { ProjectDeleteModal } from '../../shared/components/project-delete-modal/project-delete-modal';

type ProjectFilter = 'all' | ProjectStatus;

@Component({
  selector: 'app-projects',
  imports: [ProjectFormModal, ProjectDeleteModal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly translation = inject(TranslationService);

  readonly projectToDelete = signal<Project | null>(null);

  private readonly projectService = inject(ProjectService);

  readonly t = this.translation.t;

  readonly projects = this.projectService.projects;

  readonly searchTerm = signal('');

  readonly activeFilter = signal<ProjectFilter>('all');

  readonly isProjectModalOpen = signal(false);

  readonly selectedProject = signal<Project | null>(null);

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
    this.selectedProject.set(null);
    this.isProjectModalOpen.set(true);
  }

  openEditModal(project: Project): void {
    this.selectedProject.set(project);
    this.isProjectModalOpen.set(true);
  }

  closeProjectModal(): void {
    this.isProjectModalOpen.set(false);
    this.selectedProject.set(null);
  }

  createProject(input: CreateProjectInput): void {
    this.projectService.createProject(input);

    this.activeFilter.set('all');
    this.searchTerm.set('');

    this.closeProjectModal();
  }

  updateProject(input: CreateProjectInput): void {
    const project = this.selectedProject();

    if (!project) {
      return;
    }

    this.projectService.updateProject(project.id, input);

    this.closeProjectModal();
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

  openDeleteModal(project: Project): void {
    this.projectToDelete.set(project);
  }

  closeDeleteModal(): void {
    this.projectToDelete.set(null);
  }

  deleteProject(): void {
    const project = this.projectToDelete();

    if (!project) {
      return;
    }

    this.projectService.deleteProject(project.id);

    this.closeDeleteModal();
  }
}
