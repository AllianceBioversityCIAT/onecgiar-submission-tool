import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpWorkPackagesRoutingModule } from './fp-work-packages-routing.module';
import { FpWorkPackagesComponent } from './fp-work-packages.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [FpWorkPackagesComponent],
  imports: [
    CommonModule,
    FpWorkPackagesRoutingModule,
    UtilsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FpWorkPackagesModule { }
