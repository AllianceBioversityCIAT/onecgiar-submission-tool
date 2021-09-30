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

  fileSteps= '<strong style="margin-right: 25px;">Steps:</strong><ul style="margin-top: 7px;"><li>Download template</li><li>Choose File</li><li>Save</li></ul>'

  
  constructor() { }
}
