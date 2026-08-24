import { Component, EventEmitter, Output, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslationService } from '../../../core/i18n/translation.service';

import { CreateProjectInput, ProjectStatus } from '../../../models/project.model';

@Component({
  selector: 'app-project-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './project-form-modal.html',
  styleUrl: './project-form-modal.scss',
})
export class ProjectFormModal {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Output() closed = new EventEmitter<void>();
  @Output() projectCreated = new EventEmitter<CreateProjectInput>();

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),

    client: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),

    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),

    status: new FormControl<ProjectStatus>('planning', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    dueDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    budget: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (value.budget === null) {
      return;
    }

    this.projectCreated.emit({
      name: value.name.trim(),
      client: value.client.trim(),
      description: value.description.trim(),
      status: value.status,
      dueDate: value.dueDate,
      budget: value.budget,
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
