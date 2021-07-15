import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) { }

  intercept(request: HttpRequest<any>,  next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 406) {
          // refresh token
          this.authSrv.logout();
        } else {
          return throwError(error);
        }
      })
    );
  }
}
