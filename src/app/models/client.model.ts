export type ClientStatus = 'active' | 'inactive';

export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  status: ClientStatus;
  projectsCount: number;
  totalValue: number;
  lastContact: string;
}

export interface CreateClientInput {
  name: string;
  company: string;
  email: string;
  status: ClientStatus;
  lastContact: string;
}
