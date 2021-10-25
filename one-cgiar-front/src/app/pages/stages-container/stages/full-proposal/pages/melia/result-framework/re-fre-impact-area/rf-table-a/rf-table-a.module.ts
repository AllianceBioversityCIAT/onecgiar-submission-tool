import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfTableARoutingModule } from './rf-table-a-routing.module';
import { RfTableAComponent } from '../rf-table-a/rf-table-a.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';


@NgModule({
  declarations: [RfTableAComponent],
  imports: [
    CommonModule,
    RfTableARoutingModule,
    IbdAngularComponentsModule
  ]
})
export class RfTableAModule { }
