import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInformationComponent } from './general-information.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from '../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { CustomFormsModule } from '../../../../../../shared/components/custom-forms/custom-forms.module';
import { MaterialModule } from '../../../../../../material.module';
import { GeographicScopeModule } from '../geographic-scope/geographic-scope.module';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';
import { SkeletonsModule } from '../../../../../../shared/components/skeletons/skeletons.module';


@NgModule({
  declarations: [GeneralInformationComponent],
  imports: [
    CommonModule,
    IbdAngularComponentsModule,
    NgxSpinnerModule,
    CustomFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GeographicScopeModule,
    UtilsModule,
    SkeletonsModule
  ],
  exports:[GeneralInformationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GeneralInformationModule { }
