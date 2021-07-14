import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningFpeAndIaRoutingModule } from './learning-fpe-and-ia-routing.module';
import { LearningFpeAndIaComponent } from './learning-fpe-and-ia.component';
import { UtilsModule } from '../../../utils/utils.module';
// import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LearningFpeAndIaComponent],
  imports: [
    CommonModule,
    LearningFpeAndIaRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LearningFpeAndIaModule { }
