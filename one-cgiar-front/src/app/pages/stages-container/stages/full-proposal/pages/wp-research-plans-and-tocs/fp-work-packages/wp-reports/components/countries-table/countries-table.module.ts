import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesTableComponent } from './countries-table.component';



@NgModule({
  declarations: [CountriesTableComponent],
  exports: [CountriesTableComponent],
  imports: [
    CommonModule
  ]
})
export class CountriesTableModule { }
