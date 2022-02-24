import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableBRoutingModule } from './table-b-routing.module';
import { TableBComponent } from './table-b.component';


@NgModule({
  declarations: [TableBComponent],
  imports: [
    CommonModule,
    TableBRoutingModule
  ]
})
export class TableBModule { }
