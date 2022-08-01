import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyActives'
})
export class OnlyActivesPipe implements PipeTransform {


  transform(list:any,): any {
    const array = [];
    list.map(item=>{
      console.log(item)
      if (item.active !== false) array.push(item);
    })
    console.log(array)
    return array;
  }

}
