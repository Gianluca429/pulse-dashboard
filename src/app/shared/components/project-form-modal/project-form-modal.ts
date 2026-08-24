import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslationService } from '../../../core/i18n/translation.service';

import { CreateProjectInput, Project, ProjectStatus } from '../../../models/project.model';

@Component({
  selector: 'app-project-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './project-form-modal.html',
  styleUrl: './project-form-modal.scss',
})
export class ProjectFormModal implements OnInit, AfterViewInit, OnDestroy {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Input() project: Project | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() projectCreated = new EventEmitter<CreateProjectInput>();
  @Output() projectUpdated = new EventEmitter<CreateProjectInput>();

  @ViewChild('projectNameInput')
  private projectNameInput?: ElementRef<HTMLInputElement>;

  private previousBodyOverflow = '';

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

  ngOnInit(): void {
    this.lockBodyScroll();

    if (!this.project) {
      return;
    }

    this.form.patchValue({
      name: this.project.name,
      client: this.project.client,
      description: this.project.description ?? '',
      status: this.project.status,
      dueDate: this.project.dueDate,
      budget: this.project.budget,
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.projectNameInput?.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    this.restoreBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  get isEditMode(): boolean {
    return this.project !== null;
  }

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

    const input: CreateProjectInput = {
      name: value.name.trim(),
      client: value.client.trim(),
      description: value.description.trim(),
      status: value.status,
      dueDate: value.dueDate,
      budget: value.budget,
    };

    if (this.isEditMode) {
      this.projectUpdated.emit(input);
      return;
    }

    this.projectCreated.emit(input);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  private lockBodyScroll(): void {
    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private restoreBodyScroll(): void {
    document.body.style.overflow = this.previousBodyOverflow;
  }
}
