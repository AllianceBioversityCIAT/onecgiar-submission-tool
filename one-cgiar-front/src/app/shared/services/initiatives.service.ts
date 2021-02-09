import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AllInitiatives } from '../models/initiative.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InitiativesService {

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.API_URL + `${query}`;
    return this.http.get<any>(URL, { headers });
  }

  postQuery(query: string, body: any) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.API_URL + `${query}`;
    return this.http.post<any>(URL, body, { headers });
  }

  getAllInitiatives(): Observable<any> {
    return this.getQuery('/initiatives');
  }

  getInitiativesByUser(): Observable<any> {
    return this.getQuery('/initiatives/own');
  }

  getActionAreaById(id: number): Observable<any> {
    return this.getQuery('/initiatives/areas').pipe(map((data: any) => {
      let result;
      data.data.forEach(element => {
        if (element.id == id) {
          result = element;
        }
      });
      console.log('action area encontrado', result);
      return result.description;
    }));
  }

  postConcept(body: any, description: string): Observable<any> {
    body.action_area_description = description;
    console.log('description', description);
    return this.postQuery('/stages-control/concept', body);
  }

}
