import { ServerResponse } from './../../models/user.interface';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InteractionsService } from '../../services/interactions.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = null;
  isLogged = false;

  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private authSvc: AuthService,
    public _interactionsService:InteractionsService
    ) {}

  ngOnInit(): void {
    // console.log('isLogged', this.isLogged);
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: ServerResponse) => {
        this.isLogged = user ? true : false;
        // console.log('isLogged', this.isLogged, user);
        this.isAdmin = user?.role;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
  }
}
