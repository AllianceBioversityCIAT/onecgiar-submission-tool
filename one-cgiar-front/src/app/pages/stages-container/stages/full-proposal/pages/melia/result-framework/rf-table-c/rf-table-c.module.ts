import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfTableCRoutingModule } from './rf-table-c-routing.module';
import { RfTableCComponent } from '../rf-table-c/rf-table-c.component';


@NgModule({
  declarations: [RfTableCComponent],
  imports: [
    CommonModule,
    RfTableCRoutingModule
  ]
})
export class RfTableCModule { }
