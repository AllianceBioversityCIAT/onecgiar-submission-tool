import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpWorkPackageRoutingModule } from './fp-work-package-routing.module';
import { FpWorkPackageComponent } from './fp-work-package.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [FpWorkPackageComponent],
  imports: [
    CommonModule,
    FpWorkPackageRoutingModule,
    UtilsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FpWorkPackageModule { }
