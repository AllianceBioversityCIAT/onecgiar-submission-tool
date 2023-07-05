import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  routes = [
    { path: '/home' },
    { path: '/bi', floating: true },
    { path: '/admin', floating: true },
    { path: '/initiatives/', floating: true },
    { path: '/sdsd', floatingFix: true },
  ];
  isFloating = false;
  isFloatingFix = false;
  isHover = false;
  license = environment.footerUrls.license;
  termsAndCondition = environment.footerUrls.termsAndCondition;
  constructor(private router: Router, public footerSE: FooterService) {}
  showIfRouteIsInList() {
    // console.log(this.router.url);
    this.isFloating = false;
    for (const route of this.routes) {
      if (this.router.url === '/') {
        this.isFloatingFix = true;
        return true;
      }
      if (this.router.url.includes(route?.path)) {
        this.isFloating = route.floating;
        this.isFloatingFix = route.floatingFix;
        return true;
      }
    }
    return false;
  }
}
