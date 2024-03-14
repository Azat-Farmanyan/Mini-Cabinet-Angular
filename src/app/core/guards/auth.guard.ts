import { AuthState } from './../../reducers/state';
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { Store, select } from '@ngrx/store';
import { selectAuthState } from '../../reducers/state';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const loggedIn$ = store.select(selectAuthState);

  // return store.pipe(select(selectAuthState)), tap(isAuthenticated => {
  //   if (!isAuthenticated) {
  //     inject(Router).createUrlTree(['/login']);
  //   }
  // });

  // inject(AuthService).loggedIn$.pipe(
  //   tap((authState: AuthState) => {
  //     console.log(authState.isAuthenticated);
  //     if (authState.isAuthenticated) return true;
  //     else inject(Router).createUrlTree(['/login']);
  //     // ? true
  //     // : inject(Router).createUrlTree(['/login']);
  //   })
  // );

  // loggedIn$.pipe(
  //   tap((authState: AuthState) => {
  //     console.log(authState);
  //   })
  // );

  // export interface AuthState {
  //   isAuthenticated: boolean;
  //   user: User | null;
  // }
  // return this.store$
  //   .select((appState) => appState.auth.authUser)
  //   .pipe(
  //     map((authUser) => {
  //       if (!authUser) {
  //         this._router.navigate(['route-to-your-login-page']);
  //       }
  //       return authUser;
  //     })
  //   );

  return inject(AuthService).isLoggedIn
    ? true
    : inject(Router).createUrlTree(['/login']);
};
