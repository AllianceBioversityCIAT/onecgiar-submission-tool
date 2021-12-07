import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSubSectionComponent } from './menu-sub-section.component';



@NgModule({
  declarations: [MenuSubSectionComponent],
  exports: [MenuSubSectionComponent],
  imports: [
    CommonModule
  ]
})
export class MenuSubSectionModule { }
