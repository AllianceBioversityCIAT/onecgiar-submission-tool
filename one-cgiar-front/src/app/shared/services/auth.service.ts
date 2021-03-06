import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { ServerResponse, User } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<ServerResponse>(null);
  // generalInformationForm = new FormGroup({
  //   initiativeName: new FormControl('', Validators.required),
  //   leadContact: new FormControl('', Validators.email),
  //   actionArea: new FormControl('', Validators.required),
  //   globalBudget: new FormControl('', Validators.required),
  // });
  // narrativesForm = new FormGroup({
  //   challenge: new FormControl('', Validators.required),
  //   objectives: new FormControl('', Validators.required),
  //   results: new FormControl('', Validators.required),
  //   activities: new FormControl('', Validators.required),
  //   highlights: new FormControl('', Validators.required),
  // });

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }
  get user$(): Observable<ServerResponse> {
    return this.user.asObservable();
  }

  get userValue(): ServerResponse {
    return this.user.getValue();
  }
  login(authData: User): Observable<ServerResponse | void> {
    return this.http
      .post<ServerResponse>(`${environment.apiUrl}/auth/login`, authData)
      .pipe(
        map((srvRes: ServerResponse) => {
          this.saveLocalStorage(srvRes);
          this.user.next(srvRes.response);
          return srvRes.response;
        }),
      );
  }

  logout(): void {
    // localStorage.removeItem('user');
    localStorage.clear()
    this.user.next(null);
    this.router.navigate(['/']);
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    }else{
      this.logout();
    }
  }

  private saveLocalStorage(response: ServerResponse): void {
    localStorage.setItem('user', JSON.stringify(response.response));
  }
  
  changePassword(body: any): Observable<ServerResponse> {
    return this.http.post<any>(`${environment.apiUrl}/auth/change-password`, body);
  }

  // saveGeneralInformation(): void {
  //   console.log('formulario guardado', this.generalInformationForm);
  // }

  // submitForm(): void {
  //   console.log('formulario sometido', this.generalInformationForm);
  // }

}
