import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from './section-title/section-title.component';
import { SectionSubTitleComponent } from './section-sub-title/section-sub-title.component';
import { UnderConstructionPageComponent } from '../utils/under-construction-page/under-construction-page.component';

const myModules = [
  SectionTitleComponent,
  SectionSubTitleComponent,
  UnderConstructionPageComponent
];

@NgModule({
  declarations: [...myModules],
  imports: [CommonModule],
  exports: [...myModules],
})
export class UtilsModule { }
