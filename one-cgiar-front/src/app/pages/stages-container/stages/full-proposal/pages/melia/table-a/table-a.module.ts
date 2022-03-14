import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableARoutingModule } from './table-a-routing.module';
import { TableAComponent } from './table-a.component';


@NgModule({
  declarations: [TableAComponent],
  imports: [
    CommonModule,
    TableARoutingModule
  ]
})
export class TableAModule { }
