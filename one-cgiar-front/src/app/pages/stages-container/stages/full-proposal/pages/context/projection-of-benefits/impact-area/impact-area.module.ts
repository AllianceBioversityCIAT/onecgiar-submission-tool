import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactAreaRoutingModule } from './impact-area-routing.module';
import { ImpactAreaComponent } from './impact-area.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [ImpactAreaComponent],
  imports: [
    CommonModule,
    ImpactAreaRoutingModule,
    UtilsModule,
    CheckboxModule,
    FormsModule,
    IbdAngularComponentsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ImpactAreaModule { }
