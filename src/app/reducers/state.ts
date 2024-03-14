import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

// Действия для авторизации
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);
export const logout = createAction('[Auth] Logout');

// Действия для профиля пользователя
export const setUserProfile = createAction(
  '[Profile] Set User Profile',
  props<{ user: User | null }>()
);

// Действия для тикетов
export const loadTickets = createAction('[Tickets] Load Tickets');
export const setTickets = createAction(
  '[Tickets] Set Tickets',
  props<{ tickets: Ticket[] }>()
);
export const selectTicket = createAction(
  '[Tickets] Select Ticket',
  props<{ ticketId: number | null }>()
);

export interface User {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  id: number;
}

export interface Ticket {
  id: number;
  title: string;
  dateCreated: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface TicketsState {
  tickets: Ticket[];
  selectedTicketId: number | null;
}

export interface AppState {
  auth: AuthState;
  tickets: TicketsState;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state, { username, password }) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  })),
  on(setUserProfile, (state, { user }) => ({
    ...state,
    user,
  }))
);

export const initialTicketsState: TicketsState = {
  tickets: [],
  selectedTicketId: null,
};

export const ticketsReducer = createReducer(
  initialTicketsState,
  on(setTickets, (state, { tickets }) => ({
    ...state,
    tickets,
  })),
  on(selectTicket, (state, { ticketId }) => ({
    ...state,
    selectedTicketId: ticketId,
  }))
);

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectTicketsState =
  createFeatureSelector<TicketsState>('tickets');
export const selectTickets = createSelector(
  selectTicketsState,
  (state) => state.tickets
);
export const selectSelectedTicketId = createSelector(
  selectTicketsState,
  (state) => state.selectedTicketId
);
export const selectSelectedTicket = createSelector(
  selectTickets,
  selectSelectedTicketId,
  (tickets, selectedTicketId) =>
    tickets.find((ticket) => ticket.id === selectedTicketId)
);
