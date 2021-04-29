import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkPackageRoutingModule } from './work-package-routing.module';
import { GeneralInformationWorkPackageComponent } from './general-information-work-package/general-information-work-package.component';
import { GeographicScopeWorkPackageComponent } from './geographic-scope-work-package/geographic-scope-work-package.component';
import { CustomFormsModule } from '../../custom-forms/custom-forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';


@NgModule({
  declarations: [GeneralInformationWorkPackageComponent, GeographicScopeWorkPackageComponent],
  imports: [
    CommonModule,
    WorkPackageRoutingModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class WorkPackageModule { }
