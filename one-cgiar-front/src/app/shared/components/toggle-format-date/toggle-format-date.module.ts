import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleFormatDateComponent } from './toggle-format-date.component';



@NgModule({
  declarations: [ToggleFormatDateComponent],
  exports: [ToggleFormatDateComponent],
  imports: [
    CommonModule
  ]
})
export class ToggleFormatDateModule { }
