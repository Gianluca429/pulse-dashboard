import { Injectable, signal } from '@angular/core';

import { PROJECTS } from '../../data/projects.data';

import { CreateProjectInput, Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly storageKey = 'pulse-projects';

  readonly projects = signal<Project[]>(this.loadProjects());

  createProject(input: CreateProjectInput): Project {
    const nextId = Math.max(0, ...this.projects().map((project) => project.id)) + 1;

    const newProject: Project = {
      id: nextId,
      name: input.name,
      client: input.client,
      description: input.description,
      status: input.status,
      progress: this.getInitialProgress(input.status),
      dueDate: input.dueDate,
      budget: input.budget,
    };

    this.projects.update((projects) => [newProject, ...projects]);

    this.saveProjects();

    return newProject;
  }

  updateProject(id: number, input: CreateProjectInput): void {
    this.projects.update((projects) =>
      projects.map((project) => {
        if (project.id !== id) {
          return project;
        }

        return {
          ...project,
          name: input.name,
          client: input.client,
          description: input.description,
          descriptionKey: undefined,
          status: input.status,
          progress: this.getUpdatedProgress(project.progress, input.status),
          dueDate: input.dueDate,
          budget: input.budget,
        };
      }),
    );

    this.saveProjects();
  }

  private loadProjects(): Project[] {
    if (typeof localStorage === 'undefined') {
      return PROJECTS;
    }

    const storedProjects = localStorage.getItem(this.storageKey);

    if (!storedProjects) {
      return PROJECTS;
    }

    try {
      const parsedProjects = JSON.parse(storedProjects) as Project[];

      return Array.isArray(parsedProjects) ? parsedProjects : PROJECTS;
    } catch {
      return PROJECTS;
    }
  }

  private saveProjects(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.projects()));
  }

  private getInitialProgress(status: CreateProjectInput['status']): number {
    switch (status) {
      case 'completed':
        return 100;

      case 'review':
        return 80;

      case 'in-progress':
        return 35;

      default:
        return 0;
    }
  }

  private getUpdatedProgress(
    currentProgress: number,
    status: CreateProjectInput['status'],
  ): number {
    if (status === 'completed') {
      return 100;
    }

    if (status === 'planning') {
      return Math.min(currentProgress, 20);
    }

    if (status === 'review') {
      return Math.max(currentProgress, 80);
    }

    if (status === 'in-progress' && currentProgress === 0) {
      return 35;
    }

    return currentProgress;
  }
}
