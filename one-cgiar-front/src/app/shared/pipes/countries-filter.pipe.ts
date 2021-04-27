import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countriesFilter'
})
export class CountriesFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
