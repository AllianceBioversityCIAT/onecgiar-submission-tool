import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, sortBy: string, order?: string): any[] {
    console.log(array, sortBy, order)
    const sortOrder = order ? order : 'asc'; // setting default ascending order

    return orderBy(array, [sortBy], [sortOrder]);
  }
}