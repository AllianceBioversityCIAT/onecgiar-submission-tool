import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PobImpactAreaRoutingModule } from './pob-impact-area-routing.module';
import { PobImpactAreaComponent } from './pob-impact-area.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
// import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';

@NgModule({
  declarations: [PobImpactAreaComponent],
  imports: [
    CommonModule,
    PobImpactAreaRoutingModule,
    UtilsModule,
    CheckboxModule,
    FormsModule,
    IbdAngularComponentsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PobImpactAreaModule { }
