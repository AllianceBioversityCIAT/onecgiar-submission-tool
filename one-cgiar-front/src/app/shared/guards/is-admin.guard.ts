import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataControlService } from '../services/data-control.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private router:Router,
    private _dataControlService:DataControlService
    ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this._dataControlService.isAdmin) {
        this.router.navigate(['/home'])
        return false;
      }

      return true;
   
    
  }
  
}
