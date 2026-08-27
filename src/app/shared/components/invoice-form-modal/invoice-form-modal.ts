import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { ClientService } from '../../../core/services/client.service';
import { TranslationService } from '../../../core/i18n/translation.service';

import { CreateInvoiceInput, Invoice, InvoiceStatus } from '../../../models/invoice.model';

function invoiceDatesValidator(control: AbstractControl): ValidationErrors | null {
  const issueDate = control.get('issueDate')?.value;
  const dueDate = control.get('dueDate')?.value;

  if (!issueDate || !dueDate) {
    return null;
  }

  return dueDate < issueDate ? { invalidDateRange: true } : null;
}

@Component({
  selector: 'app-invoice-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-form-modal.html',
  styleUrl: './invoice-form-modal.scss',
})
export class InvoiceFormModal implements OnChanges, AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly clientService = inject(ClientService);

  readonly translation = inject(TranslationService);
  readonly t = this.translation.t;

  @Input() invoice: Invoice | null = null;

  @Output() closed = new EventEmitter<void>();

  @Output()
  saved = new EventEmitter<CreateInvoiceInput>();

  @ViewChild('clientSelect')
  private clientSelect?: ElementRef<HTMLSelectElement>;

  readonly clients = this.clientService.clients;

  private previousBodyOverflow = '';

  readonly form = this.fb.nonNullable.group(
    {
      client: ['', Validators.required],

      issueDate: ['', Validators.required],

      dueDate: ['', Validators.required],

      amount: [0, [Validators.required, Validators.min(1)]],

      status: ['draft' as InvoiceStatus, Validators.required],
    },
    {
      validators: invoiceDatesValidator,
    },
  );

  get isEditMode(): boolean {
    return this.invoice !== null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['invoice']) {
      return;
    }

    if (this.invoice) {
      this.form.reset({
        client: this.invoice.client,
        issueDate: this.invoice.issueDate,
        dueDate: this.invoice.dueDate,
        amount: this.invoice.amount,
        status: this.invoice.status,
      });

      return;
    }

    this.form.reset({
      client: '',
      issueDate: this.getToday(),
      dueDate: '',
      amount: 0,
      status: 'draft',
    });
  }

  ngAfterViewInit(): void {
    this.previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.clientSelect?.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = this.previousBodyOverflow;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.emit(this.form.getRawValue());
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  private getToday(): string {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
