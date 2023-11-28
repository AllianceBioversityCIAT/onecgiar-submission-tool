import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaVariablesService {
 
  constructor() { }

  allUsers=[];

  get orderBox(){
    return localStorage.getItem('orderBox') == 'true' ? true : false;
  }
  set orderBox(value){
    localStorage.setItem('orderBox', value.toString());
  }
}
