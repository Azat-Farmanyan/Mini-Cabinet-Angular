import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Ticket {
  id: number;
  title: string;
  dateCreated: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor() {}

  private tickets = new BehaviorSubject<Ticket[]>([
    { id: 1, title: 'Ticket 1', dateCreated: new Date() },
    { id: 2, title: 'Ticket 2', dateCreated: new Date() },
    { id: 3, title: 'Ticket 3', dateCreated: new Date() },
    { id: 4, title: 'Ticket 4', dateCreated: new Date() },
    { id: 5, title: 'Ticket 5', dateCreated: new Date() },
  ]);

  getTickets() {
    return this.tickets.asObservable();
  }

  getTicketById(id: number) {
    const allTickets = this.tickets.getValue();
    return allTickets.find((ticket) => ticket.id === id);
  }
}
