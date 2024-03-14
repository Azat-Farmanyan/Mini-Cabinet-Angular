import { Injectable, inject, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { UsersDataService } from './users-data.service';
import { Store } from '@ngrx/store';
import {
  AuthState,
  login,
  logout,
  selectAuthState,
  setTickets,
  setUserProfile,
} from '../../reducers/state';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = signal(false);
  private store = inject(Store);

  router = inject(Router);
  usersDataService = inject(UsersDataService);
  localStorageService = inject(LocalStorageService);

  public loggedIn$ = this.store.select(selectAuthState);

  get isLoggedIn() {
    return this.loggedIn();
  }

  constructor() {
    // Initialize the authentication status from localStorage
    // !!this.loggedIn$.tap((authState: AuthState) => {
    //   authState.isAuthenticated;
    // })
    // this.loggedIn.set(!!localStorage.getItem('isAuth'));
    this.store.select(selectAuthState).pipe(
      tap((authState: AuthState) => {
        console.log(authState.isAuthenticated);
        this.loggedIn.set(!!authState.isAuthenticated);
      })
    );
  }

  login(username: string, password: string) {
    // Check if both username and password are 'admin'
    if (username === 'admin' && password === 'admin') {
      this.router.navigate(['']);
      this.loggedIn.set(true);

      // Save the authentication status in localStorage
      this.localStorageService.setItem('isAuth', 'true');
      this.localStorageService.setItem('userId', '1');

      this.usersDataService.setActiveUser(1);
      const userData = this.usersDataService.getUserById(1);

      this.store.dispatch(
        login({
          username: 'admin',
          password: 'admin',
        })
      );
      if (userData) {
        this.store.dispatch(
          setUserProfile({
            user: userData,
          })
        );
      }
      this.store.dispatch(
        setTickets({
          tickets: [
            { id: 1, title: 'Ticket 1', dateCreated: new Date() },
            { id: 2, title: 'Ticket 2', dateCreated: new Date() },
            { id: 3, title: 'Ticket 3', dateCreated: new Date() },
            { id: 4, title: 'Ticket 4', dateCreated: new Date() },
            { id: 5, title: 'Ticket 5', dateCreated: new Date() },
          ],
        })
      );
      // return of(userData);
    } else {
      this.loggedIn.set(false);

      this.localStorageService.removeItem('isAuth');
      this.localStorageService.removeItem('userId');
      this.router.navigate(['/login']);

      this.store.dispatch(
        setUserProfile({
          user: null,
        })
      );
      // return of(null);
    }
  }

  logout() {
    // Здесь можно добавить логику для выхода пользователя
    this.loggedIn.set(false);
    this.localStorageService.removeItem('isAuth');
    this.localStorageService.removeItem('userId');
    this.store.dispatch(logout());
  }
}
