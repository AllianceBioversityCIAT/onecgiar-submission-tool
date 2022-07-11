import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
// import { NgxHotjarService } from 'ngx-hotjar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  opened = false;
  private destroy$ = new Subject<any>();
  isDevModeToShowTag = false;
  constructor(
    private utilsSvc: UtilsService, 
    public router: Router,
    // public hjService:NgxHotjarService
    ) {}

  ngOnInit(): void {
    // console.log("get route");
    // this.hjService.virtualPageView('/test/example')

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
