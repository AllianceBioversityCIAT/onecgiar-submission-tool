import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';

import { IsdcFeedbackResponsesRoutingModule } from './isdc-feedback-responses-routing.module';
import { IsdcFeedbackResponsesComponent } from './isdc-feedback-responses.component';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddButtonModule } from '../../../../../../shared/components/add-button/add-button.module';
import { ButtonEditOrDeleteModule } from '../../../shared/components/button-edit-or-delete/button-edit-or-delete.module';
import { CompactInformationTableViewModule } from '../../../../../../shared/components/compact-information-table-view/compact-information-table-view.module';
import { CollapsibleContainerModule } from '../../../../../../shared/components/collapsible-container/collapsible-container.module';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [IsdcFeedbackResponsesComponent],
  imports: [
    CommonModule,
    IsdcFeedbackResponsesRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AddButtonModule,
    ButtonEditOrDeleteModule,
    CompactInformationTableViewModule,
    CollapsibleContainerModule,
    ButtonModule
  ]
})
export class IsdcFeedbackResponsesModule { }
