import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpWorkPackageRoutingModule } from './fp-work-package-routing.module';
import { FpWorkPackageComponent } from './fp-work-package.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { GeographicScopeModule } from '../../../../shared/components/geographic-scope/geographic-scope.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';

@NgModule({
  declarations: [FpWorkPackageComponent],
  imports: [
    CommonModule,
    FpWorkPackageRoutingModule,
    UtilsModule,
    GeographicScopeModule,
    IbdAngularComponentsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FpWorkPackageModule { }
