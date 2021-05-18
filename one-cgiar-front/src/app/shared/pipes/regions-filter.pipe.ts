import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionsFilter'
})
export class RegionsFilterPipe implements PipeTransform {

  transform(list:any,word:string,attributeName:string): any {

    const array = [];
    if (word == '' || !attributeName ) {
      return list;
    }
    console.log('%cPipe','background: #222; color: #84c3fd');
    if (list) {
      for (const region of list) {
        if (region[attributeName].toUpperCase().indexOf(word?.toUpperCase())>-1) {
          array.push(region);
        }
        
      } 
    }

    return array;
  }

}
