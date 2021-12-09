import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalLetterPipe } from './capital-letter.pipe';
import { ReplaceSymbolBySpacePipe } from './replace-symbol-by-space.pipe';

const pipes = [
  CapitalLetterPipe,
  ReplaceSymbolBySpacePipe
]

@NgModule({
  declarations: [...pipes],
  exports:[...pipes],
  imports: [
    CommonModule
  ]
})
export class StagesPipesModule { }
