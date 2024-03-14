import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { AuthState, TicketsState, authReducer, ticketsReducer } from './state';

export const AUTH_KEY = 'auth';
export const TICKETS_KEY = 'tickets';

export interface State {
  [AUTH_KEY]: AuthState;
  [TICKETS_KEY]: TicketsState;
}

export const reducers: ActionReducerMap<State> = {
  [AUTH_KEY]: authReducer,
  [TICKETS_KEY]: ticketsReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
