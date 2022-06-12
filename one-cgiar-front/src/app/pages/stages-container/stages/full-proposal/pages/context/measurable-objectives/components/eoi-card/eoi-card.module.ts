import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EoiCardComponent } from './eoi-card.component';



@NgModule({
  declarations: [EoiCardComponent],
  exports: [EoiCardComponent],
  imports: [
    CommonModule
  ]
})
export class EoiCardModule { }
