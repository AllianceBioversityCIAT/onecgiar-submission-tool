import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) { }

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

    return next.handle(request);
  }
  
}
