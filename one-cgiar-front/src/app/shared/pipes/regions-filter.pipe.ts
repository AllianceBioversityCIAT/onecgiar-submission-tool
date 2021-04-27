import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionsFilter'
})
export class RegionsFilterPipe implements PipeTransform {

  transform(list:any,word:string,attributeName:string): any {
    const array = [];
    for (const region of list) {
      if (word == '') {
        return [];
      }
      if (region[attributeName].toUpperCase().indexOf(word?.toUpperCase())>-1) {
        array.push(region);
      }
      
    } 
    return array;
  }

}
