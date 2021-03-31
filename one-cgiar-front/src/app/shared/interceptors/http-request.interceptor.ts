import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { InteractionsService } from '../services/interactions.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: AuthService,
    private _interactions: InteractionsService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authSvc.userValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          auth: `${currentUser.token}`
        }
      });
    }
    console.log(request);
    if (isDevMode()) {
      this._interactions.requests.push(request);
    }
    return next.handle(request);
  }
  
}
