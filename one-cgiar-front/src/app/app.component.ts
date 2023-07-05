import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
// import { NgxHotjarService } from 'ngx-hotjar';
import { DataControlService } from './shared/services/data-control.service';
import { FooterService } from './shared/components/footer/footer.service';

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
    public _dataControlService: DataControlService,
    public footerSE: FooterService
  ) // public hjService:NgxHotjarService
  {}

  ngOnInit(): void {
    // console.log("get route");
    // this.hjService.virtualPageView('/test/example')

    this.isDevModeToShowTag = environment.production;
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));

    this.copyTokenToClipboard();
  }

  copyTokenToClipboard() {
    if (environment.production) return;
    document.onkeyup = function () {
      var e = e || window.event; // for IE to cover IEs window event-object
      if (e.altKey && e.which == 84) {
        navigator.clipboard.writeText(
          JSON.parse(localStorage.getItem('user'))?.token
        );
        alert('Token copied to clipboard');
        return false;
      }
    };
  }

  setModalStatus() {
    this.footerSE.displayContactUs = !this.footerSE.displayContactUs;
  }

  closeModal() {
    this.footerSE.displayContactUs = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
