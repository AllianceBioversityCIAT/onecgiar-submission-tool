import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAndFAIRDataAssetsRoutingModule } from './open-and-fair-data-assets-routing.module';
import { OpenAndFAIRDataAssetsComponent } from '../open-and-fair-data-assets/open-and-fair-data-assets.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OpenAndFAIRDataAssetsComponent],
  imports: [
    CommonModule,
    OpenAndFAIRDataAssetsRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OpenAndFAIRDataAssetsModule { }
