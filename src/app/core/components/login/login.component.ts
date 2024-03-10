import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../services/Breadcrumb.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loggedIn: boolean = false;

  loginForm: FormGroup;
  authService = inject(AuthService);
  locaStorageService = inject(LocalStorageService);
  router = inject(Router);
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit(): void {
    this.loggedIn = !!this.locaStorageService.getItem('isAuth');

    if (this.loggedIn) {
      this.router.navigate(['']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });

    this.breadcrumbService.setBreadCrumb([]);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.value.username.trim(),
        this.loginForm.value.password.trim()
      );
    }
  }
}
