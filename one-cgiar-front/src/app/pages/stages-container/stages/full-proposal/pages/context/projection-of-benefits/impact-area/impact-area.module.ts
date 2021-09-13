import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactAreaRoutingModule } from './impact-area-routing.module';
import { ImpactAreaComponent } from './impact-area.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import {ButtonModule} from 'primeng/button';

//7:00 pm


@NgModule({
  declarations: [ImpactAreaComponent],
  imports: [
    CommonModule,
    ImpactAreaRoutingModule,
    CheckboxModule,
    FormsModule,
    IbdAngularComponentsModule,
    UtilsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ImpactAreaModule { }
