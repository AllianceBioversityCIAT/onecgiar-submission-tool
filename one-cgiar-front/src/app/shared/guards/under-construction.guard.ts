import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnderConstructionGuard implements CanActivate {

  sectionsUnderConstruction = ['key-partners'];

  constructor(
    private router: Router
  ){}
  canActivate(currentSection):boolean {
    for (let index = 0; index < this.sectionsUnderConstruction.length; index++) {
      if ( this.sectionsUnderConstruction[index] == currentSection.data.section) {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }
  
}
