import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesTableComponent } from './countries-table.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [CountriesTableComponent],
  exports: [CountriesTableComponent],
  imports: [
    CommonModule,
    UtilsModule,
    TableModule,
    ButtonModule,
  ]
})
export class CountriesTableModule { }
