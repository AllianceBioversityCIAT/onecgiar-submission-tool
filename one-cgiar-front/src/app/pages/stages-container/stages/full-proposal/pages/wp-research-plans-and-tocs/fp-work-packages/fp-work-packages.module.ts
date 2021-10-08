import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpWorkPackagesRoutingModule } from './fp-work-packages-routing.module';
import { FpWorkPackagesComponent } from './fp-work-packages.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [FpWorkPackagesComponent],
  imports: [
    CommonModule,
    FpWorkPackagesRoutingModule,
    UtilsModule,
    TableModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FpWorkPackagesModule { }
