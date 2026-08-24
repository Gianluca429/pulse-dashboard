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

import { TranslationService } from '../../../core/i18n/translation.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-delete-modal',
  imports: [],
  templateUrl: './project-delete-modal.html',
  styleUrl: './project-delete-modal.scss',
})
export class ProjectDeleteModal implements OnInit, AfterViewInit, OnDestroy {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Input({ required: true }) project!: Project;

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  @ViewChild('cancelButton')
  private cancelButton?: ElementRef<HTMLButtonElement>;

  private previousBodyOverflow = '';

  ngOnInit(): void {
    this.lockBodyScroll();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cancelButton?.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    this.restoreBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

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

  private lockBodyScroll(): void {
    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private restoreBodyScroll(): void {
    document.body.style.overflow = this.previousBodyOverflow;
  }
}
