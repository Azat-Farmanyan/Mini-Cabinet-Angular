import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket, TicketsService } from '../../services/tickets.service';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbService } from '../../services/Breadcrumb.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket;

  route = inject(ActivatedRoute);
  ticketsService = inject(TicketsService);
  breadcrumbService = inject(BreadcrumbService);

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    this.route.paramMap.subscribe((params) => {
      const id = params.get('ticketID');

      if (id) {
        // Fetch the ticket from the TicketsService based on 'id'
        const gotTicket = this.ticketsService.getTicketById(+id);
        if (gotTicket) this.ticket = gotTicket;
      }
    });

    const parentPath = this.breadcrumbService.breadcrumbsSubject.value;

    this.breadcrumbService.breadcrumbsSubject.next([
      ...parentPath,

      String(this.ticket.title),
    ]);
  }
}
