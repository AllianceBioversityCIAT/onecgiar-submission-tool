import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultFrameworkRoutingModule } from './result-framework-routing.module';
import { ResultFrameworkComponent } from './result-framework.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ResultFrameworkComponent],
  imports: [
    CommonModule,
    ResultFrameworkRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultFrameworkModule { }
