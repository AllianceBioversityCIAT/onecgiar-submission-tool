import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsTableComponent } from './regions-table.component';
import { UtilsModule } from '../../../../../../../../../../shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [RegionsTableComponent],
  exports: [RegionsTableComponent],
  imports: [
    CommonModule,
    UtilsModule,
    TableModule,
    ButtonModule,
  ]
})
export class RegionsTableModule { }
