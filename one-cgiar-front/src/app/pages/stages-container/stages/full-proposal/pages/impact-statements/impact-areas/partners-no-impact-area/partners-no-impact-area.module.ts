import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersNoImpactAreaRoutingModule } from './partners-no-impact-area-routing.module';
import { PartnersNoImpactAreaComponent } from './partners-no-impact-area.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { GlobalPartnersRequestModule } from '../../../../../shared/components/global-partners-request/global-partners-request.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PartnersNoImpactAreaComponent],
  imports: [
    CommonModule,
    PartnersNoImpactAreaRoutingModule,
    UtilsModule,
    GlobalPartnersRequestModule,
    IbdAngularComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PartnersNoImpactAreaModule { }
