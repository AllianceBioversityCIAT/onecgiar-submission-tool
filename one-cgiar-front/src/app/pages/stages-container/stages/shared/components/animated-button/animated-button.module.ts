import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedButtonComponent } from './animated-button.component';



@NgModule({
  declarations: [AnimatedButtonComponent],
  exports: [AnimatedButtonComponent],
  imports: [
    CommonModule
  ]
})
export class AnimatedButtonModule { }
