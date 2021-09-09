import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultFrameworkRoutingModule } from './result-framework-routing.module';
import { ResultFrameworkComponent } from './result-framework.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';



@NgModule({
  declarations: [ResultFrameworkComponent],
  imports: [
    CommonModule,
    ResultFrameworkRoutingModule,
    UtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultFrameworkModule { }
