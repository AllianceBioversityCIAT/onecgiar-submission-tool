import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StagesGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let finalUrl;
    // console.log(`${state.url}`)
    const currentStage = state.url.split("/").pop()
    if (currentStage == 'pre-concept') {
      finalUrl = 'notimplemetedyet'
    } else if (currentStage == 'concept') {
      finalUrl = 'general-information'
    } else if (currentStage == 'full-proposal') {
      finalUrl = 'notimplemetedyet'
    } else {
      return true;
    }
    // console.log(`${state.url}/${finalUrl}`)

    return this.router.parseUrl(`${state.url}/${finalUrl}`);
  }

}
