import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataValidatorsService {

  constructor() { }

  validateArray(currentArray,auxArray,sortBy){
    let oneDiference:boolean = false;

    currentArray.sort(function(a, b) {
      return a[sortBy] - b[sortBy];
    });

    auxArray.sort(function(a, b) {
      return a[sortBy] - b[sortBy];
    });

    let currentArrayKeys = Object.keys(currentArray[0]);
    let auxArrayKeys = Object.keys(auxArray[0]);

    console.log(currentArrayKeys);
    console.log(auxArrayKeys);

    console.log(currentArray);
    console.log(auxArray);
    for (let index = 0; index < currentArray.length; index++) {
      // const element = array[index];
    }


  }





}
