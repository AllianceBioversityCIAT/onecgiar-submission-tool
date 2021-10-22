import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSteperComponent } from './custom-steper.component';



@NgModule({
  declarations: [CustomSteperComponent],
  exports: [CustomSteperComponent],
  imports: [
    CommonModule
  ]
})
export class CustomSteperModule { }
