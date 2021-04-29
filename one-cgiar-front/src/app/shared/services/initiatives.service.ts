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

  initvStgId: string;
  initvRoleId: number;
  initiative={
    roleId:4,
    readonly: true
  }

  actionAreas: [];
  stages: [];
  stagesMeta: [];
  TOC: {};

  allInitiatives: [];
  ownInitiatives: [];

  usersByInitiative: [];


  constructor(
    public http: HttpClient,
    ) { }

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


  // Query to geta work package by ID
  getWorkPackageById(id: number): Observable<any> {
    return this.getQuery(`${environment.apiUrl}/stages-control/concept/packages/${id}`)
      .pipe(map((data: any) => {
        console.log('getWorkPackageById', data);
        return data.data.find(resp => resp.initvStgId == id);
      }));
  }

    /**
   * 
   * @param id //initiative id
   * @returns general-informatio
   */

  // Query to get all the WorkPackages
  getAllIWorkPackages(id: number|string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/${id}`);
  }

  // Query to get Partnership By Initiative Id
  getPartnershipByInitiativeId(id: number | string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/${id}/partnership`);
  }

  // Query to get CLARISA Regions By Page
  getCLARISARegionsByPage(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/regions`);
  }

  // Query to get CLARISA Countries By Page
  getCLARISACountriesByPage(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/countries`);
  }

  // Query to get CLARISA Countries By Page
  getCLARISAInstitutions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/institutions`);
  }
  

  getRegionsAndCountries(InitiativeId): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/geo-scope/${InitiativeId}`);
  }

  // Query to create an initiative (Only users with admin role can do this)
  createInitiative(body: any): Observable<any> {
    return this.postQuery('/initiatives', body);
  }

  // Query to update a work package
  updateWorkPackage(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/concept/packages`, body);
  }

  // Query to create a work package
  createWorkPackage(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/stages-control/concept/packages`, body);
  }

  // Query to create a work package
  createPartnership(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/concept/partnership`, body);
  }

  // Query to create a region in work package
  createRegion(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/concept/packages/regions`, body);
  }

    
  // Query to create a countries in work package
  createCountrie(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/concept/packages/countries`, body);
  }

  // Query to create a user
  createUser(body: any): Observable<any> {
    console.log('%c'+`${environment.apiUrl}/users`,'background: #222; color: #ffff00');
    console.log(body);
    return this.http.post<any>(`${environment.apiUrl}/users`, body);
  }

  assignUserToInitiative(body: any,initiativeId:string|number): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/initiatives/${initiativeId}/users`, body);
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
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/own`).pipe(map(res => {
      this.ownInitiatives = res?.response.initiatives;
      return res?.response.initiatives
    }));
  }

  // Query to get all the users by initiative
  getUsersByInitiative(initvStgId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/${initvStgId}/users`);
  }

  // Query to get all the users 
  getAllRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/roles`);
  }

  // Query to get all the users by roles
  getUsersByRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/roles?roles=1&roles=2&roles=3`);
  }

  // Query to get all the users 
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users`);
  }

  // Query to get action areas by ID
  getActionAreaById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/areas`).pipe(map(res => {
      this.actionAreas = res.response.actionAreas;
      return res.response.actionAreas.find(area => area.id == id)
    }));
  }

  getRolefromInitiativeById(initiativeId){
    return this.http.get<any>(`${environment.apiUrl}/initiatives/${initiativeId}/roles`);
  }


  

 
}
