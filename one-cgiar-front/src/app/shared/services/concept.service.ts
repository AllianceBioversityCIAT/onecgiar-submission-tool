import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InitiativesService } from './initiatives.service';


const sectionPath = 'stages-control'
@Injectable({
  providedIn: 'root'
})
export class ConceptService extends InitiativesService {
  generaInformation: {};
  narratives: {};
  toc: number;

  constructor(http: HttpClient) {
    super(http);
  }

  getConcept(id) {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/concept/${id}/general-information`)
      .pipe(map(res => {
        this.generaInformation = res.response.generaInformation
        return res.response.generaInformation
      }));
  }
  upsertGeneralInformation(body: {}) {
    return this.http.patch<any>(`${environment.apiUrl}/${sectionPath}/concept/general-information`, body)
      .pipe(map(res => {
        this.generaInformation = res.response.generaInformation
        return res.response.generaInformation
      }));
  }

  // // Query to create concept information (general information and narratives section)
  // createConcept(body: any, description: string): Observable<any> {
  //   body.action_area_description = description;
  //   console.log('description', description);
  //   console.log('createConcept', body);
  //   return this.postQuery('/stages-control/concept', body);
  // }

}
