import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableCRoutingModule } from './table-c-routing.module';
import { TableCComponent } from './table-c.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';


@NgModule({
  declarations: [TableCComponent],
  imports: [
    CommonModule,
    TableCRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule
  ]
})
export class TableCModule { }
