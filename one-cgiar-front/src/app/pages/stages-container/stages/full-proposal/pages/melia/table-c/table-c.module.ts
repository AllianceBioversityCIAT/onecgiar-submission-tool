import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableCRoutingModule } from './table-c-routing.module';
import { TableCComponent } from './table-c.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { CollapsibleContainerModule } from '../../../../../../../shared/components/collapsible-container/collapsible-container.module';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EditTocButtonModule } from '../../../../../../../shared/components/edit-toc-button/edit-toc-button.module';


@NgModule({
  declarations: [TableCComponent],
  imports: [
    CommonModule,
    TableCRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    CollapsibleContainerModule,
    TableModule,
    ButtonModule,
    EditTocButtonModule
  ]
})
export class TableCModule { }
