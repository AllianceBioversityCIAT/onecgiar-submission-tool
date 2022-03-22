import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServerResponse, User } from '../models/user.interface';
import { environment } from '../../../environments/environment';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<ServerResponse>(null);

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
          // console.log(srvRes);
          this.saveLocalStorage(srvRes);
          this.setLoggedUserTawkTo(srvRes.response)
          this.user.next(srvRes.response);
          return srvRes.response;
        }),
      );
  }

  logout(): void {
    // localStorage.removeItem('user');
    this.logOutTawtkTo();
    localStorage.clear()
    this.user.next(null);
    this.router.navigate(['/']);
  }

  logoutWithoutNavigate(): void {
    // localStorage.removeItem('user');
    this.logOutTawtkTo();
    localStorage.clear()
    this.user.next(null);
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
    } else {
      this.logout();
    }
  }

  private saveLocalStorage(response: ServerResponse): void {
    localStorage.setItem('user', JSON.stringify(response.response));
  }

  changePassword(body: any): Observable<ServerResponse> {
    return this.http.post<any>(`${environment.apiUrl}/auth/change-password`, body);
  }

  private setLoggedUserTawkTo(user) {
    // if (window.hasOwnProperty('Tawk_API')) {
    //   if (window['Tawk_API'].isVisitorEngaged()) window['Tawk_API'].endChat();
    //   console.log(user)

    setTimeout(() => {
      window['Tawk_API'].onLoad = function(){
        window['Tawk_API'].setAttributes({
            'name'  : 'Name',
            'email' : 'email@email.com'
        }, function(error){
          console.log("setAttributes error")
          console.log(error)
        });
    }
    }, 3000);





    //   // window['Tawk_API'].setAttributes({
    //   //   name: user.name,
    //   //   email: user.email
    //   // }, function(error) {
    //   //   console.log("setAttributes error")
    //   //   console.log(error)
    //   // });


    // } else {
    //   console.log('Tawk API DOES NOT EXISTS');
    //   setTimeout(
    //     () => {
    //       if (window.hasOwnProperty('Tawk_API')) {
    //         console.log('Tawk API EXISTS');
            
    //         if (window['Tawk_API'].isVisitorEngaged()) window['Tawk_API'].endChat();
            
    //         window['Tawk_API'].setAttributes({
    //           name: user.username,
    //           email: user.email
    //         }, function (error) {
    //           console.log(error)
    //         });
    //       }
    //     }
    //     ,10000)

    // }
  }
  
  private logOutTawtkTo() {
    // console.log(window.hasOwnProperty('Tawk_API'))
    if (window.hasOwnProperty('Tawk_API')) {
      try {
        window['Tawk_API'].endChat();
      } catch (error) {
        console.log(error)
      }
      // if (window['Tawk_API'].isChatMaximized()) {
      // }
      window['Tawk_API'].visitor = {
        name: null,
        email: null
      };
    }
  }


}
