import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
const sectionPath = 'initiatives'

@Injectable({
  providedIn: 'root'
})
export class InitiativesService {

  initvStgId: string;

  initvRoleId: number;
  initiative = {
    id: null,
    official_code: null,
    roleId: 4,
    readonly: true,
    stageId: null,
    stageName: null,
    exactStageName: null,
    name: null,
    users: [],
    status: null,
    submission: {},
    userRoleId: null,
    userRoleName: null
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
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}`).pipe(map(res => {
      const allInitiatives = res.response.initiatives;
      return allInitiatives.find(resp => resp.id == id);
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

  getGeneralInformation(initiativeId, stageName, stageId) {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/${stageName}/${stageId}/${initiativeId}/general-information`);
  }

  /**
   * @param initiativeId initiative id 
   * @param stageName stage NAme 
   * @param body body
   * @returns general-information data
   */
  patchGeneralInformation(initiativeId, stageName, body) {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/${stageName}/${initiativeId}/general-information`, body);
  }

  /**
  * @param id initiative id
  * @returns WP
  */
  // Query to get all the WorkPackages
  getAllIWorkPackages(id: number | string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/${id}`);
  }

  // Query to get Partnership By Initiative Id
  getPartnershipByInitiativeId(id: number | string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/${id}/partnership`);
  }

  //? Query to get CLARISA Regions 
  getCLARISARegions(filterText: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/regions-cgiar?filter=${filterText}`).pipe(map(resp => {
      resp.response.regions.map(region => {
        region.region_id = region.id;
      })
      return resp;
    }));;
  }

  //? Query to get CLARISA Countries
  getCLARISACountries(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/countries`).pipe(map(resp => {
      resp.response.countries.map(country => {
        country.country_id = country.code;
      })
      return resp;
    }));;
  }

  // Query to get CLARISA Countries By filter
  getCLARISAInstitutions(filterText: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/institutions?filter=${filterText}`).pipe(map(resp => {
      resp.response.institutions.map(institution => {
        institution.acronym_name = `(Id: ${institution.code ? institution.code : ' '})   ${institution.acronym ? institution.acronym + ' - ' : ''} ${institution.name}`;
      })
      return resp.response.institutions;
    }));;
  }


  getRegionsAndCountries(InitiativeId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/geo-scope/${InitiativeId}`);
  }

  // Query to create an initiative (Only users with admin role can do this)
  createInitiative(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/stages-control/pre-concept/create-initiative`, body);  
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
    return this.http.post<any>(`${environment.apiUrl}/users`, body);
  }

  assignUserToInitiative(body: any, initiativeId: string | number): Observable<any> {
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

      res.response.actionAreas.map((resp, index) => {
        resp.index_name = `Action area ${index + 1} - ${resp.name}`;
      })
      // this.actionAreas[index].index_name = `Action area ${index + 1} - ${this.actionAreas[index].name}`;
      return res.response.actionAreas
    }));
  }


  // Query to get initiatves list
  getInitiativesList(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/list`).pipe(map(res => {
      res.response.initiatives.map(initiatives => {
        initiatives.initiativeId = initiatives.id;
        delete initiatives.id;
      })
      return res;
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
  getUsersByInitiative(initativeId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${sectionPath}/${initativeId}/users`);
  }

  // Query to get all the users 
  getAllRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/roles`);
  }

  getSummary(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/${this.initiative.id}/summary/${this.initiative.stageId}`);
  }

  patchSummary(body: any, initiativeId, stageId): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/initiatives/${initiativeId}/summary/${stageId}`, body);
  }

  getBudget(body: any, initiativeId, stageId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/initiatives/get-budget/${initiativeId}/${stageId}`, body);
  }


  saveBudget(body: any, initiativeId, stageId): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/initiatives/add-budget/${initiativeId}/${stageId}`, body);
  }

  saveMelia(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/melia/${this.initiative.id}`, body);
  }

  getMelia(section: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/melia/${this.initiative.id}/${section}`);
  }

  saveMeliaPlan(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/${this.initiative.stageName}/melia/plan/${this.initiative.stageId}/${this.initiative.id}`, body);
  }

  getMeliaPlan(section: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/${this.initiative.stageName}/melia/plan/${this.initiative.stageId}/${this.initiative.id}/${section}`);
  }

  saveManagePlan(body: any, location: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/manage-plan/${this.initiative.stageId}/${this.initiative.id}/${location}/`, body);
  }

  getRisksList(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/risks`);
  }

  getRisksTheme(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/risks-theme`);
  }

  getManagePlan(section: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/manage-plan/${this.initiative.stageId}/${this.initiative.id}/${section}`);
  }

  saveHumanResources(body: any, location: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/human-resources/${this.initiative.stageId}/${this.initiative.id}/${location}`, body);
  }

  getHumanResources(section: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/human-resources/${this.initiative.stageId}/${this.initiative.id}/${section}`);
  }

  saveFinancialResources(body: any, initiativeId, section: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/financial-resources/${this.initiative.stageId}/${initiativeId}/${section}`, body);
  }

  getFinancialResources(initiativeId, section: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/financial-resources/${this.initiative.stageId}/${initiativeId}/${section}`);
  }


  savePolicyCompliance(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/policy-compliance/${this.initiative.stageId}/${this.initiative.id}`, body);
  }

  getPolicyCompliance(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/policy-compliance/${this.initiative.stageId}/${this.initiative.id}`);
  }

  saveImpactStrategies(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/impact-strategies/${this.initiative.stageId}/${this.initiative.id}`, body);
  }

  // Query to get all the users 
  getInitvStgId(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/get-initvStgId/${initiativeId}/${stageId}`);
    // api/initiatives/get-initvStgId/2/3
  }

  getInnovationPackages(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/innovation-packages/${this.initiative.stageId}/${this.initiative.id}`);
  }

  saveInnovationPackages(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/innovation-packages/${this.initiative.stageId}/${this.initiative.id}`, body);
  }

  getProjectedBenefitLists(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/projected-benefits`);
  }

  getImpactStrategies(impactAreaId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/impact-strategies/${this.initiative.stageId}/${this.initiative.id}/${impactAreaId}`);
  }

  // Query to get all the users by roles
  getUsersByRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/roles?roles=1&roles=2&roles=3`);
  }

  // Query to get all the users 
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/search?filter=`).pipe(map(resp => {
      resp.response.users.map(user => {
        user.firstN_lastN_email = user.first_name + ' ' + user.last_name + '  -  ' + user.email;
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

  getRolefromInitiativeById(initiativeId) {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/${initiativeId}/roles`);
  }



  //Request projection of benefits
  // 
  getPOBenefits(WorkPackageID) {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/concept/packages/benefits/${WorkPackageID}`);
  }

  getPOBenefitsFp() {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/projection-benefits/${this.initiative.stageId}/${this.initiative.id}`);
  }

  getPOBenefitsFpByImpactArea(stageId, initiativeId, impactId) {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/projection-benefits/${stageId}/${initiativeId}/${impactId}`);
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

  getTocTxtDataByTocId(tocId) {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/toc/narrative/${tocId}`);
  }

  getSdgTargets() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/sdg-targets`);
  }

  getGlobalTargets() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/global-targets`);
  }

  getOutcomesIndicators() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/action-areas/outcomes-indicators`);
  }

  getGreenCheckStatus(initiativeId) {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/stages-meta/${initiativeId}`);
  }

  getSectionsValidation(initiativeId, stageId) {
    return this.http.get<any>(`${environment.apiUrl}/meta/validations/menu/${initiativeId}/${stageId}`);
  }
  // get all work packages by initiative with stage full proposal
  getWpsFpByInititative() {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/${this.initiative.stageName}/packages/${this.initiative.stageId}/${this.initiative.id}`);
  }

  // get one work package by id with stage full proposal
  getWpById(wpID) {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/${this.initiative.stageName}/package/${wpID}`);
  }

  // get one work package by id with stage full proposal
  getImpactAreas() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/impact-areas`);
  }

  // get getImpactAreasIndicators
  getImpactAreasIndicators() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/impact-areas/inidicators`);
  }

  // get getDepthDescription
  getDepthDescription(impactAreaIndicator) {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/depth-description/${impactAreaIndicator}`);
  }

  // get getDepthDescription
  getDepthScale(impactAreaIndicator) {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/depth-scale/${impactAreaIndicator}`);
  }

  //getMeliaStudyTypes
  getMeliaStudyTypes() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/melia/study-types`);
  }

  // 
  patchPOBenefitsFp(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/projection-benefits/${this.initiative.stageId}/${this.initiative.id}`, body);
  }

  // get getPobProbabilities
  getPobProbabilities() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/projected-probabilities`);
  }

  // get one work package by id with stage full proposal
  getProjectionOfBenefitsImpactAreas() {
    return this.http.get<any>(`/assets/DB/impact-areas.json`);
  }

  saveWpFp(body: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/${this.initiative.stageName}/packages/${this.initiative.stageId}/${this.initiative.id}`, body);
  }
  // Query to create a work package
  createPartner(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/initiatives/institutions/institution-requests`, body);
  }

  getInstitutionsTypes() {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/institutions/types`);
  }

  addLink(body, initiativeID, stageID) {
    return this.http.patch<any>(`${environment.apiUrl}/initiatives/add-link/${initiativeID}/${stageID}`, body);
  }

  getMenu(initiativeId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/meta/menu/${initiativeId}`);
  }

  //? previews

  getPreviewHumanResources(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/previews/human-resources/${initiativeId}/${stageId}`);
  }

  getPreviewPartnersData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/preview-partners`);
  }

  getPreviewGeographicScopeData(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/previews/geographic-scope/${initiativeId}/${stageId}`);
  }

  getPreviewPartners(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/previews/partners/${initiativeId}/${stageId}`);
  }

  getPreviewRiskAssessment(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/previews/risk-assessment/${initiativeId}/${stageId}`);
  }

  getPreviewProjectedBenefits(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/previews/projected-benefits/${initiativeId}/${stageId}`);
  }

  getLinks(body, initiativeID, stageID) {
    return this.http.post<any>(`${environment.apiUrl}/initiatives/get-link/${initiativeID}/${stageID}`, body);
  }

  async addLinks(citationList, initiativeID, stageID) {
    let promiseList = [];
    citationList.forEach(citation => {
      if (!citation?.citationId || citation?.edited) promiseList.push(this.addLink(citation, initiativeID, stageID).toPromise());
    });

    await Promise.all(promiseList).then(values => {
      console.log(values);
    },
      err => {
        console.log(err);
      });


  }


  /*** submitt initiative */

  submitInitiative(initiativeId, stageId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/initiatives/submit/${initiativeId}/${stageId}`, {});
  }

  authTocToken(userId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/toc/token`, {userId});
  }

  getAssesssmentStatuses(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/assessment/${initiativeId}/${stageId}/statuses`);
  }

  updateSubmissionStatus(initiativeId, stageId, body): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/initiatives/assessment/status/${initiativeId}/${stageId}`, body);
  }

  patchPcInitialToc(initiativeId, ubication, stageId, body){
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/pre-concept/initial-toc/${initiativeId}/${ubication}/${stageId}`, body);
  }

  patchInitiativeStatements(initiativeId, body){
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/pre-concept/initiative-statements/${initiativeId}`, body);
  }

  getInitiativeStatements(initiativeId){
    return this.http.get<any>(`${environment.apiUrl}/stages-control/pre-concept/initiative-statements/${initiativeId}`);
  }

  getPcInitialToc(initiativeId, sectionName){
    return this.http.get<any>(`${environment.apiUrl}/stages-control/pre-concept/initial-toc/${initiativeId}/${sectionName}`);
  }

  getSubmission(initiativeId, stageId): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/initiatives/submission/${initiativeId}/${stageId}`, {});
  }

  getMeliaResultFramework(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/melia/${this.initiative.id}/result_framework`, {});
  }

  getProposalTocByInitiativeId(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/toc/${this.initiative.stageId}/${this.initiative.id}`);
  }

  getmeliaStudActiByInitId(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/melia/studies-activities/${this.initiative.stageId}/${this.initiative.id}`);
  }

  patchmeliaStudActiByInitId(body): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/melia/studies-activities/${this.initiative.stageId}/${this.initiative.id}`, body);
  }

  getEndOfInitiativeOutcome(){
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/eoi/${this.initiative.stageId}/${this.initiative.id}`);
  }

  getRecommendationsByInitId(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/participatory-design/isdc-responses/${this.initiative.id}/${this.initiative.stageId}`);
  }

  patchRecommendationByInitId(body){
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/participatory-design/isdc-responses/${this.initiative.id}/${this.initiative.stageId}`, body);
  }

  patchTracksByInitiativeAndStageId(body){
    return this.http.patch<any>(`${environment.apiUrl}/stages-control/proposal/tracks/${this.initiative.stageId}/${this.initiative.id}`,body);
  }

  getTracksByInitiativeAndStageId(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/stages-control/proposal/tracks/${this.initiative.stageId}/${this.initiative.id}`);
  }

  
  /*** submitt initiative */
  postApproveInitiative(body){
    return this.http.post<any>(`${environment.apiUrl}/stages-control/proposal/approve-initiative`, body);
  }

  getYears(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/initiatives/years`);
  }


}
