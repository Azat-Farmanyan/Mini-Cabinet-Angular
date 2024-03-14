import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  type OnInit,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { Subscription, tap } from 'rxjs';
import { UsersDataService } from '../../services/users-data.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../../../reducers/state';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  store = inject(Store);
  router = inject(Router);
  localStorageService = inject(LocalStorageService);

  userid = 0;
  public authState$ = this.store.select(selectAuthState);

  ngOnInit(): void {
    this.store.select(selectAuthState).pipe(
      tap((authState) => {
        console.log(authState);
      })
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
