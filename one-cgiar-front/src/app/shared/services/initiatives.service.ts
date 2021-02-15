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

  public initvStgId: string;

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.apiUrl + `${query}`;
    return this.http.get<any>(URL, { headers });
  }

  postQuery(query: string, body: any) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.apiUrl + `${query}`;
    return this.http.post<any>(URL, body, { headers });
  }

  updateQuery(query: string, body: any) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.apiUrl + `${query}`;
    return this.http.patch<any>(URL, body, { headers });
  }

  getInitiativeById(id: number): Observable<any> {
    console.log('numero de la funcion')
    return this.getQuery('/initiatives/own')
    .pipe(map((data: any) => {
      console.log('getInitiativeById', data);
      return data.data.find(resp => resp.initvStgId == id);
    }));
  }

  getAllInitiatives(): Observable<any> {
    return this.getQuery('/initiatives');
  }

  getInitiativesByUser(): Observable<any> {
    return this.getQuery('/initiatives/own');
  }

  getConcept(id): Observable<any> {
    return this.getQuery(`/stages-control/concept/${id}`);
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

  createInitiative(body:any): Observable<any> {
    console.log('initiative', body);
    return this.postQuery('/initiatives', body);
  }

  postConcept(body: any, description: string): Observable<any> {
    body.action_area_description = description;
    console.log('description', description);
    console.log('postConcept', body);
    return this.postQuery('/stages-control/concept', body);
  }

  updateConcept(body: any, description: string, id:any): Observable<any> {
    body.action_area_description = description;
    body.id = id;
    console.log('body', body);
    console.log('description', description);
    return this.updateQuery('/stages-control/concept', body);
  }

}
