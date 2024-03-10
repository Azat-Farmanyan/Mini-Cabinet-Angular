import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  type OnInit,
} from '@angular/core';
import { BreadcrumbService } from '../../services/Breadcrumb.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: string[] = [];
  breadcrumbsSubs: Subscription;
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit(): void {
    this.breadcrumbsSubs = this.breadcrumbService.breadcrumbsSubject.subscribe(
      (breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      }
    );
  }
  isLast(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }

  ngOnDestroy(): void {
    if (this.breadcrumbsSubs) this.breadcrumbsSubs.unsubscribe();
  }
}
