import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataControlService {
  //lists of services
  institutions:[];
  regionsList:any[];
  countriesList:any[];
  // data={
  //  concept:{
  //    key_partners:{
  //      institutions:[]
  //    }
  //  } 
  // }
  // Variables used in various sections
  WorkPackageID:number=null;


  // events to reload info in sections
  generalInfoChange$= new EventEmitter<any>();
  menuChange$= new EventEmitter<any>();
  countriesAndRegionsloaded$ = new EventEmitter<any>();
  constructor() { }
}
