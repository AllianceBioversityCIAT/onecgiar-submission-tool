import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClarisaService {
  constructor(public http: HttpClient) {}

  // Query to get Institutions
  getInstitutions(): Observable<any> {
    return this.http.get<any>(`${environment.apiClarisa}/institutions`);
  }

  // Query to get regions
  getRegions(): Observable<any> {
    return this.http.get<any>(`${environment.apiClarisa}/un-regions`);
  }

  // Query to get countries
  getCountries(): Observable<any> {
    return this.http.get<any>(`${environment.apiClarisa}/countries`);
  }
}
