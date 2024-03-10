import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { UsersDataService } from './users-data.service';

export interface User {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = signal(false);

  router = inject(Router);
  usersDataService = inject(UsersDataService);
  localStorageService = inject(LocalStorageService);

  get isLoggedIn() {
    return this.loggedIn();
  }

  constructor() {
    // Initialize the authentication status from localStorage
    this.loggedIn.set(!!localStorage.getItem('isAuth'));
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
    } else {
      this.loggedIn.set(false);

      this.localStorageService.removeItem('isAuth');
      this.localStorageService.removeItem('userId');
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Здесь можно добавить логику для выхода пользователя
    this.loggedIn.set(false);
    this.localStorageService.removeItem('isAuth');
    this.localStorageService.removeItem('userId');
  }
}
