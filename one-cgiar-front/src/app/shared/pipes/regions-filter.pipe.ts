import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionsFilter'
})
export class RegionsFilterPipe implements PipeTransform {

  transform(value:any,arg:any): any {
    const array = [];
    for (const region of value) {
      if (arg == '') {
        return [];
      }
      if (region.name.toUpperCase().indexOf(arg?.toUpperCase())>-1) {
        array.push(region);
      }
      
    } 
    return array;
  }

}
