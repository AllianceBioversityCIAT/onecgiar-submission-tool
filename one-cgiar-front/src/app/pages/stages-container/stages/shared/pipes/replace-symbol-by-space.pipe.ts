import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSymbolBySpace'
})
export class ReplaceSymbolBySpacePipe implements PipeTransform {

  transform(value: string, symbol:string): unknown {
    if (!symbol) symbol = '_'; 
    return value.split(symbol).join(' ');
  }

}
