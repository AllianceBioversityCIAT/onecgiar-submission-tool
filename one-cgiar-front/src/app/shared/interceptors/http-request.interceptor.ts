import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { InteractionsService } from '../services/interactions.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: AuthService,
    private _interactions: InteractionsService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (request.url.indexOf('apiSubmissionTool') != -1) return next.handle(this.setHeadersSubmission(request));
    if (request.url.indexOf('apiClarisa') != -1) return next.handle(this.setHeadersClarisa(request));
  }


  setHeadersSubmission(request:HttpRequest<any>){
    let currentUser = this.authSvc.userValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          auth: `${currentUser.token}`
        }
      });
    }
    if (isDevMode()) {
      this._interactions.requests.push(request);
    }
    return request
  }

  setHeadersClarisa(request:HttpRequest<any>){
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        window.btoa(
          environment.userData.user + ":" + environment.userData.password
        ),
    });

    let reqClone = request.clone({
      headers,
    });
    return reqClone;
  }


  
}
