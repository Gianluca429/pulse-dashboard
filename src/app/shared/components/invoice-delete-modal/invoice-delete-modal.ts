import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';

import { TranslationService } from '../../../core/i18n/translation.service';
import { Invoice } from '../../../models/invoice.model';

@Component({
  selector: 'app-invoice-delete-modal',
  imports: [],
  templateUrl: './invoice-delete-modal.html',
  styleUrl: './invoice-delete-modal.scss',
})
export class InvoiceDeleteModal implements OnDestroy {
  readonly translation = inject(TranslationService);
  readonly t = this.translation.t;

  @Input({ required: true })
  invoice!: Invoice;

  @Output()
  closed = new EventEmitter<void>();

  @Output()
  confirmed = new EventEmitter<void>();

  @ViewChild('cancelButton')
  private cancelButton?: ElementRef<HTMLButtonElement>;

  private previousBodyOverflow = document.body.style.overflow;

  constructor() {
    document.body.style.overflow = 'hidden';
  }

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
