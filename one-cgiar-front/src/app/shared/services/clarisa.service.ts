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

  // // Query to get Institutions
  // getInstitutions(): Observable<any> {
  //   return this.http.get<any>(`${environment.apiClarisa}/institutions`,{ responseType: 'json' });
  // }

  // // Query to get regions
  // getRegions(): Observable<any> {
  //   return this.http.get<any>(`${environment.apiClarisa}/un-regions`,{ responseType: 'json' }).pipe(map(resp=>{
  //     // console.log('%cgetRegions','background: #222; color: #37ff73');
  //     resp.map(region=>{region.code = region.um49Code;})
  //     let res={response:{regions:resp}}
  //     return res;
  //   }));
  // }

  // // Query to get countries
  // getCountries(): Observable<any> {
  //   return this.http.get<any>(`${environment.apiClarisa}/countries`,{ responseType: 'json' }).pipe(map(resp=>{
  //     let res={response:{countries:resp}}
  //     return res;
  //   }));
  // }

  // Query to get Impact areas
  getImpactAreas(): Observable<any> {
    return this.http.get<any>(`/assets/DB/impact-areas.json`);
    // return this.http.get<any>(`${environment.apiClarisa}/impact-areas`);
  }

  // Query to get Institutions
  getImpactAreasIndicators(): Observable<any> {
    return this.http.get<any>(`/assets/DB/impact-areas-indicators.json`);
    // return this.http.get<any>(`${environment.apiClarisa}/impact-areas-indicators`);
  }

  test(){
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts');
  }

}
