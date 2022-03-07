import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableBRoutingModule } from './table-b-routing.module';
import { TableBComponent } from './table-b.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';


@NgModule({
  declarations: [TableBComponent],
  imports: [
    CommonModule,
    TableBRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule
  ]
})
export class TableBModule { }
