import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSteperComponent } from './custom-steper.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CustomSteperComponent],
  exports: [CustomSteperComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CustomSteperModule { }
