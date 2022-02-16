import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button.component';



@NgModule({
  declarations: [AddButtonComponent],
  exports: [AddButtonComponent],
  imports: [
    CommonModule
  ]
})
export class AddButtonModule { }
