import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  input,
  OnDestroy,
  type OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/Breadcrumb.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent implements OnInit, OnDestroy {
  @Input({
    required: true,
  })
  pageTitle: string = 'Tickets';

  router = inject(Router);
  ticketsService = inject(TicketsService);
  breadcrumbService = inject(BreadcrumbService);

  ticketsSubs: Subscription;

  dataSource: MatTableDataSource<any>; // Источник данных для MatTable
  displayedColumns: string[] = ['id', 'title', 'dateCreated']; // Отображаемые колонки в таблице

  constructor() {
    // private ticketService: TicketService
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadTickets();
    this.breadcrumbService.setBreadCrumb(['Tickets']);
  }

  loadTickets(): void {
    this.ticketsSubs = this.ticketsService.getTickets().subscribe((tickets) => {
      this.dataSource.data = tickets;
    });
  }

  onClickTicket(id: number): void {
    this.router.navigate(['/ticket', id]);
    // Здесь вы можете выполнить действия при клике на тикет
  }

  ngOnDestroy(): void {
    if (this.ticketsSubs) this.ticketsSubs.unsubscribe();
  }
}
