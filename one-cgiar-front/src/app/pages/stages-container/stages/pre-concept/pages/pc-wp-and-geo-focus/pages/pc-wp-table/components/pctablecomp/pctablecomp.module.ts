import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PctablecompComponent } from './pctablecomp.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [PctablecompComponent],
  exports: [PctablecompComponent],
  imports: [
    CommonModule,
    TableModule,
  ]
})
export class PctablecompModule { }
