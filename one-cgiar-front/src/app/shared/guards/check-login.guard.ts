import { ServerResponse } from './../models/user.interface';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) { }

  canActivate(): Observable<any> {
    return this.authSvc.user$.pipe(
      take(1),
      map((user: ServerResponse) => {
        // user ? null : true
        if (user) {
          this.router.navigate(['/home']);
          return false
        } else {
          return true
        }

      })
    );
  }
}
