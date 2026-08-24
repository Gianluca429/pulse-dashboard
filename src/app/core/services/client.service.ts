import { Injectable, signal } from '@angular/core';

import { CLIENTS } from '../../data/clients.data';

import { Client, CreateClientInput } from '../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly storageKey = 'pulse-clients';

  readonly clients = signal<Client[]>(this.loadClients());

  createClient(input: CreateClientInput): Client {
    const nextId = Math.max(0, ...this.clients().map((client) => client.id)) + 1;

    const newClient: Client = {
      id: nextId,
      name: input.name,
      company: input.company,
      email: input.email,
      status: input.status,
      projectsCount: 0,
      totalValue: 0,
      lastContact: input.lastContact,
    };

    this.clients.update((clients) => [newClient, ...clients]);

    this.saveClients();

    return newClient;
  }

  updateClient(id: number, input: CreateClientInput): void {
    this.clients.update((clients) =>
      clients.map((client) =>
        client.id === id
          ? {
              ...client,
              name: input.name,
              company: input.company,
              email: input.email,
              status: input.status,
              lastContact: input.lastContact,
            }
          : client,
      ),
    );

    this.saveClients();
  }

  deleteClient(id: number): void {
    this.clients.update((clients) => clients.filter((client) => client.id !== id));

    this.saveClients();
  }

  private loadClients(): Client[] {
    if (typeof localStorage === 'undefined') {
      return CLIENTS;
    }

    const storedClients = localStorage.getItem(this.storageKey);

    if (!storedClients) {
      return CLIENTS;
    }

    try {
      const parsedClients = JSON.parse(storedClients) as Client[];

      return Array.isArray(parsedClients) ? parsedClients : CLIENTS;
    } catch {
      return CLIENTS;
    }
  }

  private saveClients(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.clients()));
  }
}
