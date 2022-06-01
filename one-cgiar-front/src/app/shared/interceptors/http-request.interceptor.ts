import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InteractionsService } from '../services/interactions.service';
import { environment } from '../../../environments/environment';
import { DataControlService } from '../services/data-control.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: AuthService,
    private _interactions: InteractionsService,
    private _dataControlService:DataControlService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.excludeLoginService(request);
    if (request.method == 'PATCH') {
      this._dataControlService.validateMenu$.emit();
      this._dataControlService.menuChange$.emit();
    }

    if (request.url.indexOf('/apiClarisa/') != -1 || request.url.indexOf('clarisa.cgiar.org') != -1){
      return next.handle(this.setHeadersClarisa(request));
    }else{
      return next.handle(this.setHeadersSubmission(request));
    }
  }

  excludeLoginService(request:HttpRequest<any>){

    if (request.url.search('/api/auth/login') >= 1 || request.url.search('/api/meta/validations/menu/') >= 1 || request.url.search(/\/api\/meta\/menu\/\d*/gi) >= 1) return;
    this._dataControlService.currentRequestMethod = request.method === 'POST' || request.method === 'PATCH' ? request.method : this._dataControlService.currentRequestMethod;
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
    // console.log(request.url);
    // console.log('/apiClarisa/');
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
