import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.apiUrl}/users`)
      .pipe(catchError(this.handlerError));
  }

  getById(userId: number): Observable<User> {
    return this.http
      .get<any>(`${environment.apiUrl}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  new(user): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/users`, user)
      .pipe(catchError(this.handlerError));
  }

  update(user: any): Observable<User> {
    return this.http
      .put<User>(`${environment.apiUrl}/users`, user)
      .pipe(catchError(this.handlerError));
  }

  delete(userId: number): Observable<{}> {
    return this.http
      .delete<User>(`${environment.apiUrl}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getRoles(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/roles`);
  }
}
