import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataControlService {
  //lists of services
  institutions:[]
  // data={
  //  concept:{
  //    key_partners:{
  //      institutions:[]
  //    }
  //  } 
  // }
  generalInfoChange$= new EventEmitter<any>();
  constructor() { }
}
