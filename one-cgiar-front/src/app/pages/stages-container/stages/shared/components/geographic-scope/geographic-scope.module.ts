import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeographicScopeComponent } from './geographic-scope.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { IbdAngularComponentsModule } from '../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { SkeletonsModule } from '../../../../../../shared/components/skeletons/skeletons.module';
import { CustomFormsModule } from '../../../../../../shared/components/custom-forms/custom-forms.module';
import { MaterialModule } from '../../../../../../material.module';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';





@NgModule({
  declarations: [GeographicScopeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    IbdAngularComponentsModule,
    SkeletonsModule,
    UtilsModule
  ],
  exports: [GeographicScopeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GeographicScopeModule { }
