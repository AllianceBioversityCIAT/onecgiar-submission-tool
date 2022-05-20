import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FullProposalService {



  constructor(private http:HttpClient) { }

  /**
   * 
   * @param id 
   * @returns general-informatio
   */
  patchContext(stageId, initiativeId,body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/${stageId}/${initiativeId}/context`, body);
  }

  getContext(stageId, initiativeId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/${stageId}/${initiativeId}/context`);
  }




}
