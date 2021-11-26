import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataValidatorsService {

  constructor() { }

  validateIfArrayHasActiveFalse(array:any){

    if (!array.length) {
      return false;
    }else{

      for (const item of array) {

          if (!item.hasOwnProperty('active')) {
            return true
          }else{
            if (item.active == true) {
              return true;
            }
          }

      }

      return false;

    }

  }

  countAtributeBooleanInArray(array:[],atribute:string){
    let cont = 0;
    array.map(item=>{
      if (item[atribute] === true) {
        cont++;
      }
    })

    return cont;

  }

  validateIfArrayHasActiveFalseEstrict(array:any,atribute){

    if (!array.length) {
      return false;
    }else{

      for (const item of array) {

        if (item[atribute]) {
          if (!item.hasOwnProperty('active')) {
            return true
          }else{
            if (item.active == true) {
              return true;
            }
          }
        }

      }

      return false;

    }

  }

  validateFilesArray(arrayTosave:any,arraySaved){
    // console.log("------------------");
    // console.log(arrayTosave);
    // console.log(arraySaved);
    let one = false;
    let two:boolean;
    if (arrayTosave.length) {
      one = true
    }else{
      one = false
    }


    if (!arraySaved.length) {
      two = false;
    }else{

      for (const item of arraySaved) {

          if (!item.hasOwnProperty('show')) {
            two =  true;
            break;
          }else{
            if (item.show == true) {
              two =  true;
              break;
            }
          }

      }

      if (two != true) {
        two =  false;
      }
     

    }
    // console.log(one);
    // console.log(two);

    return (one || two);

  }

  wordCounterIsCorrect(textTocount,maxWords) {
    let words = 0;
    if (textTocount) {
      let textReplaced = textTocount.replace(/(<(\/?p)>)/gi,' ').replace(/(<([^>]+)>)/gi,'');
      // console.log(textReplaced);
      if (textReplaced) {
        let textMatch = textReplaced.match(/\S+/g);
        if (textMatch) {
          words = textMatch.length;
        }else{
          return true;
        }
        
        if (words > maxWords) {
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }

    }else{
      return true;
    }

  }

    
// // no encuentra active true entonces solo false
// Return false


  // validateArray(currentArray,auxArray,sortBy){
  //   let oneDiference:boolean = false;

  //   currentArray.sort(function(a, b) {
  //     return a[sortBy] - b[sortBy];
  //   });

  //   auxArray.sort(function(a, b) {
  //     return a[sortBy] - b[sortBy];
  //   });

  //   let currentArrayKeys = Object.keys(currentArray[0]);
  //   let auxArrayKeys = Object.keys(auxArray[0]);

  //   console.log(currentArrayKeys);
  //   console.log(auxArrayKeys);

  //   console.log(currentArray);
  //   console.log(auxArray);
  //   for (let index = 0; index < currentArray.length; index++) {
  //     // const element = array[index];
  //   }


  // }





}
