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

import { Client, ClientStatus, CreateClientInput } from '../../../models/client.model';

@Component({
  selector: 'app-client-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form-modal.html',
  styleUrl: './client-form-modal.scss',
})
export class ClientFormModal implements OnInit, AfterViewInit, OnDestroy {
  private readonly translation = inject(TranslationService);

  readonly t = this.translation.t;

  @Input() client: Client | null = null;

  @Output() closed = new EventEmitter<void>();

  @Output() clientSaved = new EventEmitter<CreateClientInput>();

  @ViewChild('clientNameInput')
  private clientNameInput?: ElementRef<HTMLInputElement>;

  private previousBodyOverflow = '';

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),

    company: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    status: new FormControl<ClientStatus>('active', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    lastContact: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get isEditMode(): boolean {
    return this.client !== null;
  }

  ngOnInit(): void {
    this.lockBodyScroll();

    if (this.client) {
      this.form.setValue({
        name: this.client.name,
        company: this.client.company,
        email: this.client.email,
        status: this.client.status,
        lastContact: this.client.lastContact,
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.clientNameInput?.nativeElement.focus();
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

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.clientSaved.emit({
      name: value.name.trim(),
      company: value.company.trim(),
      email: value.email.trim(),
      status: value.status,
      lastContact: value.lastContact,
    });
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
