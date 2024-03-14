import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import {
  login,
  setUserProfile,
  setTickets,
  loadTickets,
} from '../app/reducers/state';
import { AuthService } from './core/services/AuthService';
import { TicketsService } from './core/services/tickets.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private ticketService: TicketsService
  ) {}

  // login$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(login),
  //       tap((res) => {
  //         console.log(res);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // login$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(login),
  //       switchMap(({ username, password }) =>
  //         this.authService.login(username, password).pipe(
  //           map((user) => {
  //             console.log(user);
  //             return setUserProfile({ user });
  //           }),
  //           catchError((error) =>
  //             of(/* Действие при ошибке авторизации, если нужно */)
  //           )
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // loadTickets$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadTickets),
  //     switchMap(() =>
  //       this.ticketService.getTickets().pipe(
  //         map((tickets) => setTickets({ tickets })),
  //         catchError((error) =>
  //           of(/* Действие при ошибке загрузки тикетов, если нужно */)
  //         )
  //       )
  //     )
  //   )
  // );
}
