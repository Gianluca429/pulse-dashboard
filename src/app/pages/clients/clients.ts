import { Component, computed, inject, signal } from '@angular/core';

import { TranslationService } from '../../core/i18n/translation.service';
import { ClientService } from '../../core/services/client.service';

import { Client, ClientStatus, CreateClientInput } from '../../models/client.model';

import { ClientFormModal } from '../../shared/components/client-form-modal/client-form-modal';
import { ClientDeleteModal } from '../../shared/components/client-delete-modal/client-delete-modal';

type ClientFilter = 'all' | ClientStatus;

@Component({
  selector: 'app-clients',
  imports: [ClientFormModal, ClientDeleteModal],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  private readonly translation = inject(TranslationService);

  private readonly clientService = inject(ClientService);

  readonly t = this.translation.t;

  readonly clients = this.clientService.clients;

  readonly searchTerm = signal('');

  readonly activeFilter = signal<ClientFilter>('all');

  readonly isClientModalOpen = signal(false);

  readonly selectedClient = signal<Client | null>(null);

  readonly clientToDelete = signal<Client | null>(null);

  readonly filters: ClientFilter[] = ['all', 'active', 'inactive'];

  readonly filteredClients = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    const filter = this.activeFilter();

    return this.clients().filter((client) => {
      const matchesStatus = filter === 'all' || client.status === filter;

      const matchesSearch =
        !search ||
        client.name.toLowerCase().includes(search) ||
        client.company.toLowerCase().includes(search) ||
        client.email.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  });

  readonly clientCount = computed(() => this.filteredClients().length);

  readonly activeClientCount = computed(
    () => this.clients().filter((client) => client.status === 'active').length,
  );

  readonly totalValue = computed(() =>
    this.clients().reduce((total, client) => total + client.totalValue, 0),
  );

  openCreateModal(): void {
    this.selectedClient.set(null);
    this.isClientModalOpen.set(true);
  }

  openEditModal(client: Client): void {
    this.selectedClient.set(client);
    this.isClientModalOpen.set(true);
  }

  closeClientModal(): void {
    this.isClientModalOpen.set(false);
    this.selectedClient.set(null);
  }

  saveClient(input: CreateClientInput): void {
    const selectedClient = this.selectedClient();

    if (selectedClient) {
      this.clientService.updateClient(selectedClient.id, input);
    } else {
      this.clientService.createClient(input);

      this.searchTerm.set('');
      this.activeFilter.set('all');
    }

    this.closeClientModal();
  }

  openDeleteModal(client: Client): void {
    this.clientToDelete.set(client);
  }

  closeDeleteModal(): void {
    this.clientToDelete.set(null);
  }

  confirmDeleteClient(): void {
    const client = this.clientToDelete();

    if (!client) {
      return;
    }

    this.clientService.deleteClient(client.id);

    this.closeDeleteModal();
  }

  setSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchTerm.set(input.value);
  }

  setFilter(filter: ClientFilter): void {
    this.activeFilter.set(filter);
  }

  getFilterLabel(filter: ClientFilter): string {
    if (filter === 'all') {
      return this.t().clients.all;
    }

    return this.getStatusLabel(filter);
  }

  getStatusLabel(status: ClientStatus): string {
    return status === 'active' ? this.t().clients.active : this.t().clients.inactive;
  }

  getInitials(client: Client): string {
    return client.name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  formatCurrency(value: number): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  formatDate(date: string): string {
    const locale = this.translation.language() === 'it' ? 'it-IT' : 'en-US';

    const [year, month, day] = date.split('-').map(Number);

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(year, month - 1, day));
  }
}
