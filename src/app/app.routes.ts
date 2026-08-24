import { Routes } from '@angular/router';
import { AppShell } from './layout/app-shell/app-shell';
import { Dashboard } from './pages/dashboard/dashboard';
import { Projects } from './pages/projects/projects';
import { Clients } from './pages/clients/clients';
import { Invoices } from './pages/invoices/invoices';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: Dashboard,
        title: 'Dashboard | Pulse',
      },
      {
        path: 'projects',
        component: Projects,
        title: 'Projects | Pulse',
      },
      {
        path: 'clients',
        component: Clients,
        title: 'Clients | Pulse',
      },
      {
        path: 'invoices',
        component: Invoices,
        title: 'Invoices | Pulse',
      },
      {
        path: 'settings',
        component: Settings,
        title: 'Settings | Pulse',
      },
    ],
  },
];
