import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonAddElementComponent } from './button-add-element.component';



@NgModule({
  declarations: [ButtonAddElementComponent],
  exports:[ButtonAddElementComponent],
  imports: [
    CommonModule
  ]
})
export class ButtonAddElementModule { }
