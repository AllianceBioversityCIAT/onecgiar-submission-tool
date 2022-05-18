import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableBRoutingModule } from './table-b-routing.module';
import { TableBComponent } from './table-b.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { EditTocButtonModule } from '../../../../../../../shared/components/edit-toc-button/edit-toc-button.module';
import { EoiCardModule } from '../../context/measurable-objectives/components/eoi-card/eoi-card.module';


@NgModule({
  declarations: [TableBComponent],
  imports: [
    CommonModule,
    TableBRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    EditTocButtonModule,
    EoiCardModule
  ]
})
export class TableBModule { }
