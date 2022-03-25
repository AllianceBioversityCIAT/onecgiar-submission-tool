import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleContainerComponent } from './collapsible-container.component';



@NgModule({
  declarations: [CollapsibleContainerComponent],
  exports: [CollapsibleContainerComponent],
  imports: [
    CommonModule
  ]
})
export class CollapsibleContainerModule { }
