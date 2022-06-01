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
import { DataControlService } from '../services/data-control.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  countClarisaError = 0;
  constructor(
    private authSrv: AuthService,
    private _dataControlService:DataControlService,
    private router:Router
    ) { }

  intercept(request: HttpRequest<any>,  next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error?.status === 404) {
          if (error?.url?.indexOf('impact-areas')>-1) {
            this.countClarisaError++;
          }

          if (this.countClarisaError>=3) {
              console.log("************** CLARISA DOWN **  CLARISA DOWN **  CLARISA DOWN **   CLARISA DOWN **  CLARISA DOWN **  CLARISA DOWN **  CLARISA DOWN **");
              this._dataControlService.clarisaIsDown = true;
          }

          // impact-areas
          // refresh token
          // this.authSrv.logout();
        } 

        // console.log("**************************")
        // console.log('');console.log('');console.log('');console.log('');console.log('');console.log('');
        // console.log(         error?.error?.description           )
        // console.log(error)
        // console.log("********")
        if(error?.status === 400){
          // console.log(error);
          if (error?.error?.name === "JsonWebTokenError" || error?.error?.description === "invalid token" || error?.error?.description === "jwt expired" || error?.error?.description === "TokenExpiredError") {
            // console.log(error);
            // this.authSrv.logoutWithoutNavigate();
            // localStorage.clear()
            this._dataControlService.jwtExpirationSubscription$.emit(true);
           
            // this.router.navigate(['/']);
          }
          // console.log(error?.error?.name);
        }

        return throwError(error);
        
      })
    );
  }
}
