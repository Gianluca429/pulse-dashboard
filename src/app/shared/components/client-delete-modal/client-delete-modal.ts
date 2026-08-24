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
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-delete-modal',
  imports: [],
  templateUrl: './client-delete-modal.html',
  styleUrl: './client-delete-modal.scss',
})
export class ClientDeleteModal implements OnInit, AfterViewInit, OnDestroy {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Input({ required: true })
  client!: Client;

  @Output()
  closed = new EventEmitter<void>();

  @Output()
  confirmed = new EventEmitter<void>();

  @ViewChild('cancelButton')
  private cancelButton?: ElementRef<HTMLButtonElement>;

  private previousBodyOverflow = '';

  ngOnInit(): void {
    this.previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cancelButton?.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = this.previousBodyOverflow;
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
}
