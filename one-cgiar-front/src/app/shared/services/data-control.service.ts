import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataControlService {
  //lists of services
  institutions:[];
  // regionsList:any[];
  // countriesList:any[];
  breadcrumbItemTwo = '';
  // data={
  //  concept:{
  //    key_partners:{
  //      institutions:[]
  //    }
  //  } 
  // }
  // Variables used in various sections
  clarisaIsDown = false;
  wpMaped = false;
  pobMaped = false;
  impactStatementsMaped = false;
  userMenu = [];
  WorkPackageID:number=null;
  showRegions=false;
  showCountries=false;

  // events to reload info in sections
  generalInfoChange$= new EventEmitter<any>();
  menuChange$= new EventEmitter<any>();
  validateMenu$= new EventEmitter<any>();
  countriesAndRegionsloaded$ = new EventEmitter<any>();
  loadMenu$= new EventEmitter<any>();
  reloadPob = false;
  minutesToRemeberSave = 10;
  fileSteps= '<strong style="margin-right: 25px;">Steps:</strong><ol style="margin-top: 7px;"><li>Download and Fill in the template below</li><li>Start the Uploading process, pressing the "choose file" button and selecting the filled file on step 1.</li><li>Finish the uploading process, pressing the "save" button.</li></ol>'
  fieldAsteriskInfo = 'The fields that are marked with a red asterisk (<strong class="alert_text_red">*</strong>) are mandatory';
  incompleteFieldsText = 'Please validate the fields marked with a red asterisk that are pending to be completed';
  provideDocumentText = 'Provide link to any additional support document(s)';
  constructor() { }

  getStageRouteByStageId(stageId): StageDescription {
    switch (stageId) {
      case 1:
        return { route: 'pre-concept', name: 'pre-concept', ownPath: 'pre-concept' }
      case 2:
        return { route: 'concept', name: 'concept', ownPath: 'concept' }
      case 3:
        return { route: 'full-proposal', name: 'full-proposal', ownPath: 'proposal' }
    }
  }

}

interface StageDescription{
  route:string,
  name:string,
  ownPath:string
}