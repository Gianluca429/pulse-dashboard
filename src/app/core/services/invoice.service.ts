import { Injectable, computed, signal } from '@angular/core';

import { CreateInvoiceInput, Invoice } from '../../models/invoice.model';

import { INVOICES } from '../../data/invoices.data';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly storageKey = 'pulse-invoices';

  private readonly invoicesState = signal<Invoice[]>(this.loadInvoices());

  readonly invoices = this.invoicesState.asReadonly();

  readonly totalInvoices = computed(() => this.invoicesState().length);

  readonly paidInvoices = computed(
    () => this.invoicesState().filter((invoice) => invoice.status === 'paid').length,
  );

  readonly pendingInvoices = computed(
    () =>
      this.invoicesState().filter(
        (invoice) => invoice.status === 'sent' || invoice.status === 'overdue',
      ).length,
  );

  readonly totalRevenue = computed(() =>
    this.invoicesState()
      .filter((invoice) => invoice.status === 'paid')
      .reduce((total, invoice) => total + invoice.amount, 0),
  );

  readonly outstandingAmount = computed(() =>
    this.invoicesState()
      .filter((invoice) => invoice.status === 'sent' || invoice.status === 'overdue')
      .reduce((total, invoice) => total + invoice.amount, 0),
  );

  createInvoice(input: CreateInvoiceInput): Invoice {
    const invoices = this.invoicesState();

    const invoice: Invoice = {
      id: this.generateId(invoices),
      number: this.generateInvoiceNumber(invoices),
      ...input,
    };

    const updatedInvoices = [invoice, ...invoices];

    this.updateState(updatedInvoices);

    return invoice;
  }

  updateInvoice(id: number, input: CreateInvoiceInput): void {
    const updatedInvoices = this.invoicesState().map((invoice) =>
      invoice.id === id
        ? {
            ...invoice,
            ...input,
          }
        : invoice,
    );

    this.updateState(updatedInvoices);
  }

  deleteInvoice(id: number): void {
    const updatedInvoices = this.invoicesState().filter((invoice) => invoice.id !== id);

    this.updateState(updatedInvoices);
  }

  private updateState(invoices: Invoice[]): void {
    this.invoicesState.set(invoices);
    this.saveInvoices(invoices);
  }

  private loadInvoices(): Invoice[] {
    if (typeof localStorage === 'undefined') {
      return INVOICES;
    }

    const storedInvoices = localStorage.getItem(this.storageKey);

    if (!storedInvoices) {
      return INVOICES;
    }

    try {
      return JSON.parse(storedInvoices) as Invoice[];
    } catch {
      return INVOICES;
    }
  }

  private saveInvoices(invoices: Invoice[]): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(invoices));
  }

  private generateId(invoices: Invoice[]): number {
    if (invoices.length === 0) {
      return 1;
    }

    return Math.max(...invoices.map((invoice) => invoice.id)) + 1;
  }

  private generateInvoiceNumber(invoices: Invoice[]): string {
    const year = new Date().getFullYear();

    const highestNumber = invoices.reduce((highest, invoice) => {
      const match = invoice.number.match(/INV-\d{4}-(\d+)/);

      if (!match) {
        return highest;
      }

      return Math.max(highest, Number(match[1]));
    }, 0);

    return `INV-${year}-${String(highestNumber + 1).padStart(3, '0')}`;
  }
}
