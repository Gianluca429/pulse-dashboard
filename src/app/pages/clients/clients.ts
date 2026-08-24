import { Component, computed, inject, signal } from '@angular/core';

import { TranslationService } from '../../core/i18n/translation.service';
import { ClientService } from '../../core/services/client.service';

import { Client, ClientStatus, CreateClientInput } from '../../models/client.model';

import { ClientFormModal } from '../../shared/components/client-form-modal/client-form-modal';

type ClientFilter = 'all' | ClientStatus;

@Component({
  selector: 'app-clients',
  imports: [ClientFormModal],
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

  readonly isCreateModalOpen = signal(false);

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
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  createClient(input: CreateClientInput): void {
    this.clientService.createClient(input);

    this.activeFilter.set('all');
    this.searchTerm.set('');

    this.closeCreateModal();
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
