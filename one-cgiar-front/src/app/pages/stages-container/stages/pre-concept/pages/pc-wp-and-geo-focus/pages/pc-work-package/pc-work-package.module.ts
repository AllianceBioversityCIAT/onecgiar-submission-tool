import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcWorkPackageRoutingModule } from './pc-work-package-routing.module';
import { PcWorkPackageComponent } from './pc-work-package.component';
import { PcCommonModulesModule } from '../../../pc-common-modules.module';
import { GeographicScopeModule } from './../../../../../shared/components/geographic-scope/geographic-scope.module';


@NgModule({
  declarations: [PcWorkPackageComponent],
  imports: [
    CommonModule,
    PcWorkPackageRoutingModule,
    PcCommonModulesModule,
    GeographicScopeModule 
  ]
})
export class PcWorkPackageModule { }
