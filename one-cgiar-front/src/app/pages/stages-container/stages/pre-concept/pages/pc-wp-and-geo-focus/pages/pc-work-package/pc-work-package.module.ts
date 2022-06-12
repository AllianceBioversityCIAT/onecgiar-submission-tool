import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcWorkPackageRoutingModule } from './pc-work-package-routing.module';
import { PcWorkPackageComponent } from './pc-work-package.component';
import { PcCommonModulesModule } from '../../../pc-common-modules.module';
import { GeographicScopeModule } from './../../../../../shared/components/geographic-scope/geographic-scope.module';
import { ButtonEditOrDeleteModule } from '../../../../../shared/components/button-edit-or-delete/button-edit-or-delete.module';
import { GeographicScopeFieldsModule } from '../../../../../shared/components/geographic-scope-fields/geographic-scope-fields.module';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [PcWorkPackageComponent],
  imports: [
    CommonModule,
    PcWorkPackageRoutingModule,
    PcCommonModulesModule,
    ButtonEditOrDeleteModule,
    GeographicScopeFieldsModule ,
    UtilsModule
  ]
})
export class PcWorkPackageModule { }
