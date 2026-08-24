import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-delete-modal',
  imports: [],
  templateUrl: './project-delete-modal.html',
  styleUrl: './project-delete-modal.scss',
})
export class ProjectDeleteModal {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Input({ required: true }) project!: Project;

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
