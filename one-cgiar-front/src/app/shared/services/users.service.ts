import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/users`);
  }

  getRoles(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/roles`);
  }

  getRolesById(description: string): Observable<any> {
    return this.http.get<any[]>('/roles').pipe(map((data: any) => {
      let result;
      data.data.forEach(element => {
        if (element.description == description) {
          result = element;
        }
      });
      console.log('action area encontrado', result);
      return result.description;
    }));
  }

  createUsers(body: any, description: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    body.roles = description;
    const headers = new HttpHeaders({
      'auth': token
    });
    return this.http.post<any[]>(`${environment.apiUrl}/users`, body, { headers });
  }
}
