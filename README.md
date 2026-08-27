# Pulse Dashboard

Pulse Dashboard is a responsive SaaS-style dashboard built with Angular.

The project was created as a portfolio piece to simulate a modern workspace for managing projects, clients and invoices through a clean, responsive interface.

The application is fully client-side and uses localStorage to persist demo data and user preferences.

## Features

- Responsive dashboard layout
- Project management
- Client management
- Invoice management
- Create, edit and delete flows
- Search and status filters
- Persistent demo data with localStorage
- Dynamic revenue calculations
- Revenue chart based on paid invoices
- Upcoming deadlines derived from project data
- Notification system with persistent read state
- Settings drawer
- Compact interface preference
- English and Italian interface
- Responsive mobile navigation
- Desktop tables transformed into mobile cards
- Accessible modal interactions
- Keyboard support for ESC and focus management
- SPA routing with fallback handling

## Dashboard

The dashboard provides a high-level overview of the workspace.

It includes:

- total revenue from paid invoices
- active projects
- total clients
- project completion rate
- revenue for the last six months
- upcoming project deadlines
- recently created projects

All dashboard metrics are derived from the application data rather than static presentation values.

## Projects

Projects can be:

- created
- edited
- deleted
- searched
- filtered by status

Supported statuses:

- Planning
- In progress
- Review
- Completed

Project data includes:

- client
- description
- progress
- due date
- budget
- status

## Clients

The Clients section provides a workspace for managing customer information.

Each client includes:

- name
- company
- email
- status
- number of projects
- total project value
- last contact date

The desktop table automatically becomes a card-based layout on smaller screens.

## Invoices

Invoices can be created, edited and deleted.

Each invoice includes:

- invoice number
- client
- issue date
- due date
- amount
- status

Supported statuses:

- Draft
- Sent
- Paid
- Overdue

The invoice data is also used to calculate the revenue shown on the main dashboard.

## Notifications

Pulse includes an in-app notification system generated from project and invoice data.

Notifications can highlight:

- overdue invoices
- invoices approaching their due date
- upcoming project deadlines

Opened notifications are marked as read and their state is persisted locally.

## Settings

The global settings drawer allows the user to manage workspace preferences without leaving the current page.

Available preferences include:

- language
- notification preferences
- compact interface mode

Settings are persisted through localStorage.

## Internationalization

The interface supports:

- English
- Italian

The selected language is persisted and restored when the application is reopened.

The project uses a lightweight custom translation system based on Angular signals rather than an external i18n dependency.

## Responsive Design

Pulse was designed to work across desktop, tablet and mobile layouts.

Responsive behavior includes:

- full desktop sidebar
- compact tablet sidebar
- mobile navigation drawer
- responsive dashboard grids
- mobile project cards
- mobile client cards
- mobile invoice cards
- responsive settings drawer
- responsive notification popover

## Tech Stack

- Angular
- TypeScript
- SCSS
- Angular Signals
- Angular Reactive Forms
- Angular Router
- RxJS
- localStorage
- HTML5

No backend or external database is required.

## Architecture

The application is organized around reusable components, domain models and dedicated services.

```text
src/app/
├── core/
│   ├── i18n/
│   └── services/
├── data/
├── layout/
├── models/
├── pages/
│   ├── dashboard/
│   ├── projects/
│   ├── clients/
│   └── invoices/
└── shared/
    ├── components/
    └── ui/
```
