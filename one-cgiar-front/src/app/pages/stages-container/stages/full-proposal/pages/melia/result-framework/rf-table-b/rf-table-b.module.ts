import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfTableBRoutingModule } from './rf-table-b-routing.module';
import { RfTableBComponent } from '../rf-table-b/rf-table-b.component';


@NgModule({
  declarations: [RfTableBComponent],
  imports: [
    CommonModule,
    RfTableBRoutingModule
  ]
})
export class RfTableBModule { }
