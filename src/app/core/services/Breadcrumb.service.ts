import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbsSubject = new BehaviorSubject<string[]>(['home']);

  setBreadCrumb(path: string[]) {
    this.breadcrumbsSubject.next(path);
  }
}
