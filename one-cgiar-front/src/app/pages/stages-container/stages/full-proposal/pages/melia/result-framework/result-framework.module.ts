import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultFrameworkRoutingModule } from './result-framework-routing.module';
import { ResultFrameworkComponent } from './result-framework.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';


@NgModule({
  declarations: [ResultFrameworkComponent],
  imports: [
    CommonModule,
    ResultFrameworkRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultFrameworkModule { }
