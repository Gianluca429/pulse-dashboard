export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface Invoice {
  id: number;
  number: string;
  client: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}

export interface CreateInvoiceInput {
  client: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}
