import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InitiativesService } from './initiatives.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const sectionPath = 'stages-control'
@Injectable({
  providedIn: 'root'
})
export class ConceptService {
  generaInformation: {};
  narratives: {};
  toc: number;

  constructor(public http: HttpClient) {
    // super(http);
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
        this.narratives = res.response.narratives
        return res.response.narratives
      }));
  }

  // Query to get theory of change information by ID
  getTheoryOfChange(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/tocs/${id}/files`).pipe(map(res => {
      // this.TOC = res.response.TOC;
      return res.response.TOC;
    }));
    // return this.getQuery(`/stages-control/concept/tocs/${id}/files`);
  }

  //upsert TOC
  upsertTheoryOfChange(fileToUpload: File[], body: any) {
    const formData: FormData = new FormData();
    formData.append('initvStgId', body.initvStgId);
    formData.append('narrative', body.narrative);
    // console.log('fileToUpload[0]', fileToUpload);
    fileToUpload.forEach((file) => {
      formData.append('files', file, file.name);
    });
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/concept/tocs`, formData);
  }
  updateTheoryOfChangeFile(data) {
    return this.http.put<any>(`${environment.apiUrl}/stages-control/concept/tocs/files/`, data);
  }


}
