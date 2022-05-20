import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TawkToComponent } from './tawk-to.component';



@NgModule({
  declarations: [TawkToComponent],
  exports: [TawkToComponent],
  imports: [
    CommonModule
  ]
})
export class TawkToModule { }
