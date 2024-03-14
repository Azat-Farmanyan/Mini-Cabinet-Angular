import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tickets',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'profile/:userID',
    loadComponent: () =>
      import('./core/components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'tickets',
    loadComponent: () =>
      import('./core/components/tickets/tickets.component').then(
        (m) => m.TicketsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'ticket/:ticketID',
    loadComponent: () =>
      import('./core/components/ticket-detail/ticket-detail.component').then(
        (m) => m.TicketDetailComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'tickets' },
];
