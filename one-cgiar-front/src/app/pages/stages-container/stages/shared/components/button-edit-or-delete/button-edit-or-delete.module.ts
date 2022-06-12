import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonEditOrDeleteComponent } from './button-edit-or-delete.component';



@NgModule({
  declarations: [ButtonEditOrDeleteComponent],
  exports:[ButtonEditOrDeleteComponent],
  imports: [
    CommonModule
  ]
})
export class ButtonEditOrDeleteModule { }
