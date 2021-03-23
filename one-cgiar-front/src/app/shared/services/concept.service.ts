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

  /**
   * 
   * @param id 
   * @returns general-informatio
   */
  getConcept(id) {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/concept/${id}/general-information`)
      .pipe(map(res => {
        this.generaInformation = res.response.generaInformation
        return res.response.generaInformation
      }));
  }


  /**
   * 
   * @param body : {} 
   * @returns general-informatio
   */
  upsertGeneralInformation(body: {}) {
    return this.http.patch<any>(`${environment.apiUrl}/${sectionPath}/concept/general-information`, body)
      .pipe(map(res => {
        this.generaInformation = res.response.generaInformation
        return res.response.generaInformation
      }));
  }


  /**
   * 
   * @param id 
   * @returns general-informatio
   */

  getConceptNarratives(id) {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/concept/${id}/narratives`)
      .pipe(map(res => {
        this.narratives = res.response.narratives
        return res.response.narratives
      }));
  }

  /**
   * 
   * @param body : {} 
   * @returns general-informatio
   */
  upsertNarratives(body: {}) {
    return this.http.patch<any>(`${environment.apiUrl}/${sectionPath}/concept/narratives`, body)
      .pipe(map(res => {
        console.log(res)
        this.narratives = res.response.narratives
        return res.response.narratives
      }));
  }


}
