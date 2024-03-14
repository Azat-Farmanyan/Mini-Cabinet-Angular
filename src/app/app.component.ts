import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/shared/header/header.component';
import { AuthService } from './core/services/AuthService';
import { BreadcrumbsComponent } from './core/shared/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAuthState } from './reducers/state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, BreadcrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mini-cabinet-angular';
}
