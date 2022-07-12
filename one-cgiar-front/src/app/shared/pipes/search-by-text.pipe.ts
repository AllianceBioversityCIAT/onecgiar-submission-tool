import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByText'
})
export class SearchByTextPipe implements PipeTransform {

  transform(list:any,word:string,attributeName:string): any {
    const array = [];
    if (word == '' ) return list;
    if (list) {
      for (const item of list) {
        if (item[attributeName].toUpperCase().indexOf(word?.toUpperCase())>-1) {
          array.push(item);
        }
        
      } 
    }

    return array;
  }

}
