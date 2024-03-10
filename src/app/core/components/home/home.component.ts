import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { TicketsComponent } from '../tickets/tickets.component';
import { BreadcrumbService } from '../../services/Breadcrumb.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TicketsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.breadcrumbService.setBreadCrumb(['Home', 'Tickets']);
  }
  breadcrumbService = inject(BreadcrumbService);
}
