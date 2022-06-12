import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetter'
})
export class CapitalLetterPipe implements PipeTransform {

  transform(value: string): unknown {
    let valueList = value.split('');
    valueList[0] = valueList[0].toUpperCase();
    return valueList.join('');
  }

}
