import { ServerResponse } from './../models/user.interface';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckHomeGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) { }
  canActivate(): Observable<any> {
    return this.authSvc.user$.pipe(
      take(1),
      map((user: ServerResponse) => {
        if (user) {
          return true
        } else {
          this.router.navigate(['/']);
          return false
        }

      })
    );
  }
  
}
