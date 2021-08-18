import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { observable, Observable } from 'rxjs';
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
    id:null,
    roleId:4,
    readonly: true,
    stageId:null
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
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/package/${id}`);

  }

    /**
   * @param initiativeId initiative id 
   * @param stageName stage NAme 
   * @returns general-information data
   */

  getGeneralInformation(initiativeId,stageName) {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/${stageName}/${initiativeId}/general-information`);
  }

  /**
   * @param initiativeId initiative id 
   * @param stageName stage NAme 
   * @param body body
   * @returns general-information data
   */
  patchGeneralInformation(initiativeId,stageName,body) {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/${stageName}/${initiativeId}/general-information`,body);
  }

   /**
   * @param id initiative id
   * @returns WP
   */
  // Query to get all the WorkPackages
  getAllIWorkPackages(id: number|string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/${id}`);
  }

  // Query to get Partnership By Initiative Id
  getPartnershipByInitiativeId(id: number | string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/${id}/partnership`);
  }

  // Query to get CLARISA Regions 
  getCLARISARegions(filterText:string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/regions?filter=${filterText}`);
  }

  // Query to get CLARISA Countries
  getCLARISACountries(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/countries`);
  }

  // Query to get CLARISA Countries By filter
  getCLARISAInstitutions(filterText: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/institutions?filter=${filterText}`).pipe(map(resp => {
      resp.response.regions.map(institution => {
        institution.acronym_name = `${institution.acronym ? institution.acronym + ' - ' : ''} ${institution.name}`;
      })
      return  resp.response.regions;
    }));;
  }
  

  getRegionsAndCountries(InitiativeId): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/geo-scope/${InitiativeId}`);
  }

  // Query to create an initiative (Only users with admin role can do this)
  createInitiative(body: any): Observable<any> {
    return this.postQuery('/initiatives', body);
  }

  /**
   * @params name,results,pathwayContent, id
   * @description Query to update a work package
  **/
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

      res.response.actionAreas.map((resp,index)=>{
        resp.index_name = `Action area ${index + 1} - ${resp.name}`;
      })
      // this.actionAreas[index].index_name = `Action area ${index + 1} - ${this.actionAreas[index].name}`;
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

  getSummary(initiativeId,stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/${initiativeId}/summary/${stageId}`);
  }

  getBudget (body:any,initiativeId,stageId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/initiatives/get-budget/${initiativeId}/${stageId}`, body);
  }


  saveBudget (body:any,initiativeId,stageId): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/initiatives/add-budget/${initiativeId}/${stageId}`, body);
  }



  // Query to get all the users by roles
  getUsersByRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/roles?roles=1&roles=2&roles=3`);
  }

  // Query to get all the users 
  getAllUsers(filterText:string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/search?filter=${filterText}`).pipe(map(resp=> {
      resp.response.users.map(user=>{
        user.firstN_lastN_email = user.first_name+' '+user.last_name+'  -  '+ user.email;
        user.is_active = true;
      })
      return resp;
    }));
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



  //Request projection of benefits
  // 
  getPOBenefits(WorkPackageID) {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/benefits/${WorkPackageID}`);
  }
  // 
  getPOBenefitsTimetimeframes(benefitId) {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/benefits/timeframes/${benefitId}`);
  }

  // 
  patchPOBenefits(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/concept/packages/benefits`, body);
  }

  // 
  patchPOBenefitsTimetimeframes(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/concept/packages/benefits/timeframes`, body);
  }


  getGreenCheckStatus(initiativeId){
    return this.http.get<any>(`${environment.apiUrl}/initiatives/stages-meta/${initiativeId}`);
  }

    // Query to create a work package
  createPartner(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/initiatives/institutions/institution-requests`, body);
  }

  getInstitutionsTypes(){
    return this.http.get<any>(`${environment.apiUrl}/initiatives/institutions/types`);
  }

  addLink(body,initiativeID,stageID){
    return this.http.patch<any>(`${environment.apiUrl}/initiatives/add-link/${initiativeID}/${stageID}`, body);
  }

  getMenu(initiativeId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/meta/menu/${initiativeId}`);
  }

  getLinks(body,initiativeID,stageID){
    return this.http.post<any>(`${environment.apiUrl}/initiatives/get-link/${initiativeID}/${stageID}`, body);
  }

  async addLinks(citationList,initiativeID,stageID){
    let promiseList=[];
    citationList.forEach(citation => {
      if (!citation?.citationId || citation?.edited)  promiseList.push( this.addLink(citation,initiativeID,stageID).toPromise());
    });

    await Promise.all(promiseList).then(values => {
      console.log(values);
    },
    err=>{
      console.log(err);
    });


  }


}
