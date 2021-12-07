import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDynamicListComponent } from './menu-dynamic-list.component';



@NgModule({
  declarations: [MenuDynamicListComponent],
  exports: [MenuDynamicListComponent],
  imports: [
    CommonModule
  ]
})
export class MenuDynamicListModule { }
