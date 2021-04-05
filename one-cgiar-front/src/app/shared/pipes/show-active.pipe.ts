import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showActive'
})
export class ShowActivePipe implements PipeTransform {

  transform(items: any[], property: string): unknown {
    console.log(items, property)
    if (!items || !property) {
      return items;
    }

    return items.filter(item => item[property] === true);
  }

}
