import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.get<any>(`${environment.apiClarisa}/un-regions`).pipe(map(resp=>{
      console.log('%cgetRegions','background: #222; color: #37ff73');
      resp.map(region=>{region.code = region.um49Code;})
      let res={response:{regions:resp}}
      return res;
    }));
  }

  // Query to get countries
  getCountries(): Observable<any> {
    return this.http.get<any>(`${environment.apiClarisa}/countries`);
  }
}
