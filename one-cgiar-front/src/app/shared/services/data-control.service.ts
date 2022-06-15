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
  x_position_login_animation = 0;
  clarisaIsDown = false;
  wpMaped = false;
  pobMaped = false;
  impactStatementsMaped = false;
  userMenu = [];
  WorkPackageID:number=null;
  // showRegions=false;
  // showCountries=false;
  impacAreas = [];

  // events to reload info in sections
  currentRequestMethod:string = '';
  jwtExpirationSubscription$= new EventEmitter<boolean>();
  generalInfoChange$= new EventEmitter<any>();
  menuChange$= new EventEmitter<any>();
  validateMenu$= new EventEmitter<any>();
  countriesAndRegionsloaded$ = new EventEmitter<any>();
  loadMenu$= new EventEmitter<any>();
  reloadPob = false;
  minutesToRemeberSave = 10;
  fileSteps= '<strong style="margin-right: 25px;">Steps:</strong><ol style="margin-top: 7px;"><li>Download and Fill in the template below</li><li>Start the Uploading process, pressing the "choose file" button and selecting the filled file on step 1.</li><li>Finish the uploading process, pressing the "save" button.</li></ol>'
  fieldAsteriskInfo = 'The fields that are marked with a red asterisk (<strong class="alert_text_red">*</strong>) are mandatory';
  incompleteFieldsText = 'Please make sure all required fields are completed accordingly';
  provideDocumentText = 'Provide link to any additional support document(s)';
  isdcFeedbackValidation = null;

  get isAdmin (){
    return JSON.parse(localStorage.getItem('user'))?.roles[0]?.id == 1 ? true : false
  }

  EOIcolors = [];

  initColors(){
    this.EOIcolors['WP'] = '#ed553b';
    this.EOIcolors[1] = '#a21942';
    this.EOIcolors[2] = '#27bde2';
    this.EOIcolors[3] = '#3caea3';
    this.EOIcolors[4] = '#173f5f';
    this.EOIcolors[5] = '#4d9f3b';
  }

  constructor() { 
    this.initColors();
  }

  getStageRouteByStageId(stageId): StageDescription {
    switch (stageId) {
      case 1:
        return { route: 'pre-concept', name: 'pre-concept', ownPath: 'pre-concept' }
      case 2:
        return { route: 'pre-concept', name: 'pre-concept', ownPath: 'pre-concept' }
      case 3:
        return { route: 'full-proposal', name: 'full-proposal', ownPath: 'proposal' }
      case 4:
        return { route: 'full-proposal-isdc-feedback', name: 'full-proposal-isdc-feedback', ownPath: 'proposal' }
    }
  }

}

interface StageDescription{
  route:string,
  name:string,
  ownPath:string
}