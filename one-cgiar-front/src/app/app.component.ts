import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  opened = false;
  private destroy$ = new Subject<any>();
  isDevModeToShowTag = false;
  constructor(private utilsSvc: UtilsService, public router: Router) {}

  ngOnInit(): void {
    this.isDevModeToShowTag = environment.production;
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
