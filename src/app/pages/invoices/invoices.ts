import { InvoiceService } from './../../core/services/invoice.service';
import { Component, computed, inject, signal } from '@angular/core';

import { TranslationService } from '../../core/i18n/translation.service';

import { CreateInvoiceInput, Invoice, InvoiceStatus } from '../../models/invoice.model';

import { InvoiceFormModal } from '../../shared/components/invoice-form-modal/invoice-form-modal';

import { InvoiceDeleteModal } from '../../shared/components/invoice-delete-modal/invoice-delete-modal';

type InvoiceFilter = 'all' | InvoiceStatus;

@Component({
  selector: 'app-invoices',
  imports: [InvoiceFormModal, InvoiceDeleteModal],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {
  private readonly invoiceService = inject(InvoiceService);

  readonly translation = inject(TranslationService);

  readonly invoicesToDelete = signal<Invoice | null>(null);

  readonly t = this.translation.t;

  readonly invoices = this.invoiceService.invoices;

  readonly searchQuery = signal('');
  readonly activeFilter = signal<InvoiceFilter>('all');

  readonly isFormModalOpen = signal(false);

  readonly selectedInvoice = signal<Invoice | null>(null);

  readonly invoiceToDelete = signal<Invoice | null>(null);

  readonly totalInvoices = this.invoiceService.totalInvoices;

  readonly paidInvoices = this.invoiceService.paidInvoices;

  readonly pendingInvoices = this.invoiceService.pendingInvoices;

  readonly totalRevenue = this.invoiceService.totalRevenue;

  readonly outstandingAmount = this.invoiceService.outstandingAmount;

  readonly filteredInvoices = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    const filter = this.activeFilter();

    return this.invoices().filter((invoice) => {
      const matchesSearch =
        !query ||
        invoice.number.toLowerCase().includes(query) ||
        invoice.client.toLowerCase().includes(query);

      const matchesFilter = filter === 'all' || invoice.status === filter;

      return matchesSearch && matchesFilter;
    });
  });

  setSearchQuery(value: string): void {
    this.searchQuery.set(value);
  }

  setFilter(filter: InvoiceFilter): void {
    this.activeFilter.set(filter);
  }

  openCreateModal(): void {
    this.selectedInvoice.set(null);
    this.isFormModalOpen.set(true);
  }

  openEditModal(invoice: Invoice): void {
    this.selectedInvoice.set(invoice);
    this.isFormModalOpen.set(true);
  }

  closeFormModal(): void {
    this.isFormModalOpen.set(false);
    this.selectedInvoice.set(null);
  }

  saveInvoice(input: CreateInvoiceInput): void {
    const invoice = this.selectedInvoice();

    if (invoice) {
      this.invoiceService.updateInvoice(invoice.id, input);
    } else {
      this.invoiceService.createInvoice(input);
    }

    this.closeFormModal();
  }

  getStatusLabel(status: InvoiceStatus): string {
    return this.t().invoices.filters[status];
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat(this.translation.language() === 'it' ? 'it-IT' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat(this.translation.language() === 'it' ? 'it-IT' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));
  }

  openDeleteModal(invoice: Invoice): void {
    this.invoiceToDelete.set(invoice);
  }

  closeDeleteModal(): void {
    this.invoiceToDelete.set(null);
  }

  confirmDeleteInvoice(): void {
    const invoice = this.invoiceToDelete();

    if (!invoice) {
      return;
    }

    this.invoiceService.deleteInvoice(invoice.id);

    this.closeDeleteModal();
  }
}
