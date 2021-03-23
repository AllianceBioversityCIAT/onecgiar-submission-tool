import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AllInitiatives } from '../models/initiative.interface';
import { map } from 'rxjs/operators';
const sectionPath = 'initiatives'

@Injectable({
  providedIn: 'root'
})
export class InitiativesService {

  public initvStgId: string;
  actionAreas: [];
  stages: [];
  stagesMeta: [];

  allInitiatives: [];
  ownInitiatives: [];

  usersByInitiative: [];

  constructor(public http: HttpClient) { }

  // get initvStgId():string{
  //   return this.initvStgId;
  // }
  // set initvStgId(val: string){
  //   this.initvStgId = val;
  // }

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

  // Query to get an initiative by ID
  getInitiativeById(id: number): Observable<any> {
    console.log('numero de la funcion')
    return this.getQuery('/initiatives/own')
      .pipe(map((data: any) => {
        console.log('getInitiativeById', data);
        return data.data.find(resp => resp.initvStgId == id);
      }));
  }

  // Query to get theory of change information by ID
  getTheoryOfChange(id: number): Observable<any> {
    return this.getQuery(`/stages-control/concept/tocs/${id}/files`);
  }

  // Query to geta work package by ID
  getWorkPackageById(id: number): Observable<any> {
    return this.getQuery(`${environment.apiUrl}/stages-control/concept/packages/${id}`)
      .pipe(map((data: any) => {
        console.log('getWorkPackageById', data);
        return data.data.find(resp => resp.initvStgId == id);
      }));
  }

    // Query to get all the WorkPackages
  getAllIWorkPackages(id:number): Observable<any> {
    console.log('%c'+`${environment.apiUrl}/stages-control/concept/packages/${id}`,'background: #222; color: #ffff00');
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/${id}`);
  }

  // Query to create an initiative (Only users with admin role can do this)
  createInitiative(body: any): Observable<any> {
    console.log('initiative', body);
    return this.postQuery('/initiatives', body);
  }



  // Query to create theory of change (narrative and files)
  createTheoryOfChange(fileToUpload: File[], body: any): Observable<any> {
    const endpoint = `${environment.apiUrl}/stages-control/concept/tocs`;
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const formData: FormData = new FormData();
    formData.append('initvStgId', body.initvStgId);
    formData.append('narrative', body.narrative);
    console.log('fileToUpload[0]', fileToUpload);
    fileToUpload.forEach((file) => {
      formData.append('files', file, file.name);
    })
    // formData.append('files', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, { headers: new HttpHeaders({ 'auth': token }) });
  }

  // Query to create the files of the theory of change (Only files)
  createTOCFiles(fileToUpload: File[], body: any): Observable<any> {
    const endpoint = `${environment.apiUrl}/stages-control/concept/tocs/files`;
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const formData: FormData = new FormData();
    formData.append('tocId', body.tocId);
    console.log('fileToUpload[0]', fileToUpload);
    fileToUpload.forEach((file) => {
      formData.append('files', file, file.name);
    })
    return this.http.post(endpoint, formData, { headers: new HttpHeaders({ 'auth': token }) });
  }

  // Query to create a work package
  createWorkPackages(body: any): Observable<any> {
    return this.postQuery(`stages-control/concept/packages`, body);
  }

  // Query to update the narrative of a theory of change (Only narrative)
  updateTheoryOfChange(body: any, id: number): Observable<any> {
    let sample = {
      id: id,
      narrative: body
    }
    return this.updateQuery('/stages-control/concept/tocs', sample);
  }

  // Query to delete the files
  deleteTOCFiles(body: any): Observable<any> {
    return this.updateQuery(`/stages-control/concept/tocs/files`, body);
  }

  // get stages
  getStages() {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/stages`).pipe(map(res => {
      this.stages = res.response.stages;
      this.stagesMeta = res.response.stagesMeta;
      return { stages: res.response.stages, stagesMeta: res.response.stagesMeta }
    }));;
  }


  // Query to get the action areas
  getActionAreas() {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/areas`).pipe(map(res => {
      this.actionAreas = res.response.actionAreas;
      return res.response.actionAreas
    }));
  }

  // Query to get all the initiatives
  getAllInitiatives(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}`).pipe(map(res => {
      this.allInitiatives = res.response.initiatives;
      return res.response.initiatives
    }));
  }

  // Query to get all the initiatives by user
  getInitiativesByUser(): Observable<any> {
    return  this.http.get<any>(`${environment.apiUrl}/${sectionPath}/own`).pipe(map(res => {
      this.ownInitiatives = res?.response.initiatives;
      return res?.response.initiatives
    }));
  }

  // Query to get all the users by initiative
  getUsersByInitiative(initvStgId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/${initvStgId}/users`).pipe(map(res => {
      this.usersByInitiative = res.response.users;
      return res.response.users
    }));
  }


  // Query to get action areas by ID
  getActionAreaById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/areas`).pipe(map(res => {
      this.actionAreas = res.response.actionAreas;
      return res.response.actionAreas.find(area => area.id == id)
    }));

  }


}
