import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from './section-title/section-title.component';
import { SectionSubTitleComponent } from './section-sub-title/section-sub-title.component';

const myModules = [
  SectionTitleComponent,
  SectionSubTitleComponent,
];

@NgModule({
  declarations: [...myModules],
  imports: [CommonModule],
  exports: [...myModules],
})
export class UtilsModule { }
