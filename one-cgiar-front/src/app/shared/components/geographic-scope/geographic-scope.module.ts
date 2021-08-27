import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeographicScopeComponent } from './geographic-scope.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { SkeletonsModule } from '../skeletons/skeletons.module';




@NgModule({
  declarations: [GeographicScopeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    IbdAngularComponentsModule,
    SkeletonsModule
  ],
  exports: [GeographicScopeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GeographicScopeModule { }
