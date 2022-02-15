import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkPackageRoutingModule } from './work-package-routing.module';
import { GeneralInformationWorkPackageComponent } from './general-information-work-package/general-information-work-package.component';
import { GeographicScopeWorkPackageComponent } from './geographic-scope-work-package/geographic-scope-work-package.component';
import { CustomFormsModule } from '../../custom-forms/custom-forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
// import { ProjectionOfBenefitsWorkPackageComponent } from './projection-of-benefits-work-package/projection-of-benefits-work-package.component';
// import { PobContributionComponent } from './pob-contribution/pob-contribution.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';


@NgModule({
  declarations: [
    GeneralInformationWorkPackageComponent, 
    GeographicScopeWorkPackageComponent, 
    // ProjectionOfBenefitsWorkPackageComponent,
    // PobContributionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MaterialModule,
    WorkPackageRoutingModule,
    CustomFormsModule,
    ReactiveFormsModule,
    IbdAngularComponentsModule
  ],
  exports:[
    MaterialModule
  ]
})
export class WorkPackageModule { }
