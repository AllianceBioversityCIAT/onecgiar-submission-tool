import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipatoryDesignProcessRoutingModule } from './participatory-design-process-routing.module';
import { ParticipatoryDesignProcessComponent } from './participatory-design-process.component';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { MaterialModule } from "../../../../../../../material.module";
import { CompactInformationTableViewModule } from '../../../../../../../shared/components/compact-information-table-view/compact-information-table-view.module';
import { CollapsibleContainerModule } from '../../../../../../../shared/components/collapsible-container/collapsible-container.module';
import { AddButtonModule } from '../../../../../../../shared/components/add-button/add-button.module';
import { ButtonEditOrDeleteModule } from '../../../../shared/components/button-edit-or-delete/button-edit-or-delete.module';

@NgModule({
  declarations: [ParticipatoryDesignProcessComponent],
  imports: [
    CommonModule,
    ParticipatoryDesignProcessRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TableModule,
    InputTextareaModule,
    MaterialModule,
    CompactInformationTableViewModule,
    CollapsibleContainerModule,
    AddButtonModule,
    ButtonEditOrDeleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParticipatoryDesignProcessModule { }
