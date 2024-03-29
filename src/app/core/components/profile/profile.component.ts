import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  type OnInit,
} from '@angular/core';

// Angular Material компоненты и модули
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../../services/AuthService';
import { UsersDataService } from '../../services/users-data.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/Breadcrumb.service';
import { AuthState, selectAuthState, User } from '../../../reducers/state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  userData: User;

  cities: string[] = ['Akhaltsikhe', 'Tbilisi', 'Moscow']; // список городов

  constructor() {}

  store = inject(Store);

  authService = inject(AuthService);
  usersDataService = inject(UsersDataService);
  localStorageService = inject(LocalStorageService);

  getUserSubs: Subscription;
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
    this.getUserData();
    this.breadcrumbService.setBreadCrumb(['Profile']);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUserData: User = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        birthDate: this.profileForm.value.birthDate,
        city: this.profileForm.value.city,
        id: 0,
      };

      const userId = this.localStorageService.getItem('userId');
      if (userId && updatedUserData) {
        this.usersDataService.updateUserById(+userId, {
          ...updatedUserData,
          id: +userId,
        });
      }
    }
  }

  patchFormValues() {
    if (this.userData) {
      this.profileForm.patchValue({
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        birthDate: this.userData.birthDate,
        city: this.userData.city,
      });
    }
  }

  getUserData() {
    this.getUserSubs = this.store
      .select(selectAuthState)
      .subscribe((authState: AuthState) => {
        if (authState.user !== null) {
          this.userData = authState.user;
          this.patchFormValues();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.getUserSubs) this.getUserSubs.unsubscribe();
  }
}
